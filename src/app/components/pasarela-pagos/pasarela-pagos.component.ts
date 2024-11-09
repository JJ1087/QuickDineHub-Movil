import { Component, OnInit, Input } from '@angular/core';
import { PasarelaService } from './pasarela.service';

import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { first, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pasarela-pagos',
  templateUrl: './pasarela-pagos.component.html',
  styleUrls: ['./pasarela-pagos.component.scss'],
})
export class PasarelaPagosComponent  implements OnInit {
  @Input() totalCompra: number = 0;
  isVisible = false;

  direcciones: any[] = [];
  coloniaSeleccionada: string = '';
  colonia: string = "";
  idDireccion: string = "";

  data: any = {};

  constructor(
    private pasarelaService: PasarelaService,
    private http: HttpClient
  ) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
    
   }


//Logia de apertura y cierre del modal--------------------------

  openModal() {//Recibimos el id
    this.isVisible = true;
  }
  
  closeModal() {
    this.isVisible = false;
  }

  //Carga inicial------------------------------------------------

  ngOnInit(){
    this.obtenerDirecciones();

    this.data = {
      name: 'Jeziel',
      email: '20200776@uthh.edu.mx',
      amount: 1000000,
      currency: 'mxn',
    };
  }

  //Obtencion de direcciones---------------------------------
  async obtenerDirecciones() {
    try {
      // Esperar a que el método obtenerDirecciones del servicio devuelva el Observable
      const direccionesObservable = await this.pasarelaService.obtenerDirecciones();
      
      // Suscribirnos al Observable una vez resuelto
      direccionesObservable.subscribe(
        (data) => {
          this.direcciones = data;
          console.log('Direcciones recibidas:', this.direcciones);
        },
        (error) => {
          console.error('Error al obtener las direcciones:', error);
        }
      );
    } catch (error) {
      console.error('Error al ejecutar obtenerDirecciones:', error);
    }
  }

  seleccionarDireccion() {
    const selectedOption: any = this.coloniaSeleccionada;
    this.colonia = selectedOption.colonia;
    this.idDireccion = selectedOption.idDireccion;
    // Realizamos acciones con los valores obtenidos
    console.log('Colonia seleccionada:', this.colonia);
    console.log('idDireccion:', this.idDireccion);
    console.log('Colonia Seleccionada:', this.coloniaSeleccionada);

    
  }


  
//Funcion de metodo de PAGO stripe-----------------------------------
  httpPost(body) {
    return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }


//----------------------------------
  async googlePay() {
    const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
    if (isAvailable === undefined) {
      return;
    }
  
    Stripe.addListener(GooglePayEventsEnum.Completed, () => {
      console.log('GooglePayEventsEnum.Completed');
    });
    
    const data$ = this.httpPost(this.data);

    const { paymentIntent } = await lastValueFrom(data$);

    await Stripe.createGooglePay({
      paymentIntentClientSecret: paymentIntent,

      paymentSummaryItems: [{
        label: 'Esau',
        amount: 1099.00
      }],
      merchantIdentifier: 'Esau',
      countryCode: 'MX',
      currency: 'MXN',
    });

    const result = await Stripe.presentGooglePay();
    if (result.paymentResult === GooglePayEventsEnum.Completed) {
      this.splitAndJoin(paymentIntent);
    }
  }

 splitAndJoin(paymentIntent) {
   const result = paymentIntent.split('').slice(0, 2).join('');
   console.log(result);
   return result;
 }
 
  
 async paymentSheet() {
  if (!this.data.amount) {
    console.error('Error: datos de pago incompletos');
    return;
  }

  try {
    Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      console.log('PaymentSheetEventsEnum.Completed');
    });

    const data$ = this.httpPost(this.data);
    console.log(data$)
    const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

    const response = await lastValueFrom(data$);
    console.log('Backend response:', response);
    console.log(paymentIntent, 'ephemeral', ephemeralKey, 'customer',customer)
    if (!paymentIntent || !ephemeralKey || !customer) {
      console.error('Faltan datos de pago:', { paymentIntent, ephemeralKey, customer });
      return;
    }
    try {
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'QuickDH',
      });
    } catch (error) {
      console.error('Error en createPaymentSheet:', error);
      return; // Termina la función si hay un error
    }
    
    

    
    const result = await Stripe.presentPaymentSheet();
    if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
      this.splitAndJoin(paymentIntent);
     
    }
  } catch (e) {
    console.log(e);
  }
}

}
