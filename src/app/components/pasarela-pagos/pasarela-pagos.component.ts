import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core';
import { PasarelaService } from './pasarela.service';
import { GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { first, lastValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import {ToastController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-pasarela-pagos',
  templateUrl: './pasarela-pagos.component.html',
  styleUrls: ['./pasarela-pagos.component.scss'],
})
export class PasarelaPagosComponent  implements OnInit {
  
  @Input() totalCompra: number = 0;
  @Input() carritoConsulta: any[] = [];
  @Output() carritoVaciado = new EventEmitter<void>(); // Emisor de evento
  @Output() abrirFeedback = new EventEmitter<void>();
  idCliente: string = '';
  isVisible = false;
  data: any ={};

  direcciones: any[] = [];
  coloniaSeleccionada: string = '';
  colonia: string = "";
  idDireccion: string = "";
  botonesDeshabilitados: boolean = true;

  constructor(
    private pasarelaService: PasarelaService, 
    private http: HttpClient, 
    private toastController: ToastController,
    private loadingController: LoadingController) {
    
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

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Creando Orden...',
      spinner: 'circles', // Puedes elegir entre varios estilos de spinner
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  //Carga inicial------------------------------------------------

  ngOnInit(){
    this.cargarUsuario();
    this.obtenerDirecciones();
    this.botonesDeshabilitados = true;
    
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
          this.presentToast('Error de conexion a la red. Error al obtener las direcciones', 'danger');
        }
      );
    } catch (error) {
      console.error('Error al ejecutar obtenerDirecciones', error);
      this.presentToast('Error de conexion a la red. Error al ejecutar obtenerDirecciones', 'danger');
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
    console.log("totalCompra: ", this.totalCompra);
    console.log("carrito2: ", this.carritoConsulta);

    this.data = {
      name: 'QuickDH', //UserData
      email: 'QuickDH@gmail.com', //email de ser
      amount: this.totalCompra * 100,//toatal de compra * 100
      currency: 'mxn',
    };

    this.botonesDeshabilitados = false;
    
  }

  async cargarUsuario(): Promise<void> {
    const { value } = await Preferences.get({ key: 'userId' });
    if (value) {
      this.idCliente = value;
    }
  }

 //---Funciones de compra----------------------------------- 

  httpPost(body) {
    return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }

  splitAndJoin(paymentIntent) {
    const result = paymentIntent.split('').slice(0, 2).join('');
    console.log(result);
    return result;
  }

  async paymentSheet() {
    console.log('Se toma el id de usuario?:', this.idCliente);
    if (!this.data.amount) {
      console.error('Error: datos de pago incompletos');
      return;
    }

    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed Fase 1');
        
      });

      const data$ = this.httpPost(this.data);
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);
      console.log('Fase 2');

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'QuickDineHub',//
      });

      console.log('Fase 3');
      const result = await Stripe.presentPaymentSheet();
      console.log('Fase 4');
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        console.log('Fase 5');

        this.splitAndJoin(paymentIntent);
        //console.log(this.userData.idUsuario, this.carrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID)
        //this.pedidosS.crearPedidos(this.userData.idUsuario, this.carrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID);
        console.log('Fase 7');
        // Lógica para realizar la compra
        await this.realizarCompra();

        console.log('Fase 8');

      }
    } catch (e) {
      console.log(e);
    }
  }

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
        label: 'QuickDH',
        amount: this.totalCompra //Actualizar con moto total de cobro
      }],
      merchantIdentifier: 'QuickDH',
      countryCode: 'MX',
      currency: 'MXN',
    });

    const result = await Stripe.presentGooglePay();
    if (result.paymentResult === GooglePayEventsEnum.Completed) {
      this.splitAndJoin(paymentIntent);
      this.realizarCompra();
    }
  }

  async paymentFlow() {
    /* 
    With PaymentFlow, you can make payments in two steps flow. 
    When the user presses the submit button, 
    the system only gets the card information, 
    and puts it in a pending state. 
    After that, when the program executes the confirmation method, 
    the payment is executed. In most cases, 
    it is used in a flow that is interrupted by a final confirmation screen.
    */
    // be able to get event of PaymentFlow
    Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
      console.log('PaymentFlowEventsEnum.Completed');
    });
    
    // const data = new HttpParams({
    //   fromObject: this.data
    // });
  
    // Connect to your backend endpoint, and get every key.
    // const data$ = this.http.post<{
    //   paymentIntent: string;
    //   ephemeralKey: string;
    //   customer: string;
    // }>(environment.api + 'payment-sheet', data).pipe(first());

    const data$ = this.httpPost(this.data);

    const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$);

    // Prepare PaymentFlow with CreatePaymentFlowOption.
    await Stripe.createPaymentFlow({
      paymentIntentClientSecret: paymentIntent,
      // setupIntentClientSecret: setupIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      merchantDisplayName: 'Jeziel'
    });

    // Present PaymentFlow. **Not completed yet.**
    const presentResult = await Stripe.presentPaymentFlow();
    console.log('presentResult: ', presentResult); // { cardNumber: "●●●● ●●●● ●●●● ****" }

    // Confirm PaymentFlow. Completed.
    const confirmResult = await Stripe.confirmPaymentFlow();
    console.log('confirmResult: ', confirmResult);
    if (confirmResult.paymentResult === PaymentFlowEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
    }
  }

  //Metodo de creacion de ordenes ---------------------------------------

  Inicio() {
    this.realizarCompra();
  }

  realizarCompra() {
    this.presentLoading();
    // Agrupar productos por restaurante
    const productosPorRestaurante = this.agruparProductosPorRestaurante();

    // Para cada grupo de productos del mismo restaurante, crear una orden de pedido
    for (const restauranteId in productosPorRestaurante) {

      if (productosPorRestaurante.hasOwnProperty(restauranteId)) {
        const productos = productosPorRestaurante[restauranteId];
        console.log("verificaciond e restuarante ID 2: ", productos);

        this.crearOrdenParaRestaurante(productos);
        console.log("crearOrdenParaRestaurante LLamado");
      }
    }

  }

  agruparProductosPorRestaurante(): { [restauranteId: string]: any[] } {
    const productosPorRestaurante: { [restauranteId: string]: any[] } = {};
    // Agrupar productos por restaurante
    for (const producto of this.carritoConsulta) {

      if (!productosPorRestaurante[producto.idRestaurante]) {
        productosPorRestaurante[producto.idRestaurante] = [];
      }
      productosPorRestaurante[producto.idRestaurante].push(producto);
    }

    return productosPorRestaurante;
  }

  crearOrdenParaRestaurante(productos: any[]): void {
    
    // Verificamos que haya al menos un producto en el array
    if (productos.length > 0) {
      // Obtenemos el idRestaurante del primer producto
      const idRestaurante = productos[0].idRestaurante;

      // Luego, puedes utilizar idRestaurante en la lógica para crear la orden
      // Aquí estoy llamando a la función crearOrden y pasando idRestaurante
      this.crearOrden(idRestaurante, productos);
    }
  }
  
    idRepartidor: string = '000000000000000000000000';
    precioEnvio1: number = 30;
    idCuentaBanco: string = "661eca01ef4332700659bb16";
  
    // Modificamos crearOrden para que reciba idRestaurante como parámetro
    crearOrden(idRestaurante: string, productos: any[]): void {
      const nuevaOrden = {
        idCliente: this.idCliente,
        idRestaurante: idRestaurante, // Utilizamos el idRestaurante pasado como parámetro
        idRepartidor: this.idRepartidor,
        idDireccion: this.idDireccion,
        idCuentaBanco: this.idCuentaBanco,
        costoEnvio: this.precioEnvio1,
        precioTotal: this.totalCompra
      };
      console.log('DATOS DE LA NUEVA ORDEN :', nuevaOrden);
      // Llama al servicio para enviar la nueva orden al backend
      this.pasarelaService.crearOrden(nuevaOrden).subscribe(
        (response) => {
          // Maneja la respuesta del backend según sea necesario
          console.log('Orden creada exitosamente:', response);
          // Restablece los valores de las propiedades para la próxima orden
          const orderId = response._id; // Obtiene el ID de la orden creada desde la respuesta del backend
          console.log('Id de la nueva orden:', orderId);
          this.crearDetallesOrden(orderId, productos);// Llama a la función para crear los detalles de la orden, pasando el ID de la orden creada
          //this.logDeTransacciones(orderId, this.idCliente, "Pedido realizado");
          // Registra la transacción "Pedido realizado"
          //this.logDeTransacciones(orderId);
  
  
        },
        (error) => {
          console.error('Error al crear la orden:', error);
          //this.mostrarMensajeEmergente('Lo siento, no se pudo realizar la compra, intente de nuevo en unos minutos.', '');
          this.presentToast('Error al crear la orden', 'danger');
        }
      );
    }
  
    noProductos1: number = 1;
    crearDetallesOrden(orderId: string, productos: any[]): void {
      console.log('Detalle de orden llegando a funcion:', productos);
      // Verificar si se va a crear más de un detalle de orden
      if (productos.length > 1) {
        //console.log("Antes del if: ", this.noProductos1);
        this.noProductos1 = 2; // Cambiar el valor de noProductos1 si hay más de un producto
        //console.log("Despues del if: ", this.noProductos1);
      }
      //console.log("Cantidad fuera del if: ", this.noProductos1);
  
      productos.forEach(producto => {
        this.pasarelaService.obtenerInfoDeProductoPorId(producto.productId).subscribe(
          (data) => {
  
            // Extraer el costo unitario del producto
            const costoUnidad = Number(data.precio.$numberDecimal);
  
            console.log('DATA:', producto);
            // Calcular el subtotal
            const subtotal = costoUnidad * producto.cantidad;
  
            const detalle = {
              idOrden: orderId,
              idProducto: producto.productId,
              nombreProducto: data.nombre,
              descripcionProducto: data.descripcion,
              cantidadProducto: producto.cantidad,
              costoUnidad: data.precio,
              subtotal: subtotal,
              especificacion: producto.especificacion,
            };
            console.log('Detalle de orden creado exitosamente:', detalle);
            // Llama al servicio para enviar el nuevo detalle de la orden al backend
            // this.authService.crearDetalleOrden(detalle).subscribe(...);
  
            // Llama al servicio para enviar el nuevo detalle de la orden al backend
            this.pasarelaService.crearDetalleOrden(detalle).subscribe(
              (response) => {
                // Maneja la respuesta del backend según sea necesario
                console.log('Detalle de orden creado exitosamente:', response);
                // setTimeout(() => {
                //   //this.resetearValores();
                //   this.mostrarCompraExitosa = true;
                //   this.compraRealizada = true;
                // }, 1000);
  
                if (this.noProductos1 === 2) {
                  this.actualizarCantidadProductos(orderId);
                }

                this.vaciarCarrito();
              },
              (error) => {
                console.error('Error al crear el detalle de orden:', error);
  
                // Muestra un mensaje de error al usuario si es necesario
                //this.mostrarMensajeEmergente('Lo siento, no se pudo realizar la compra, intente de nuevo en unos minutos2.', '');
                this.eliminarOrdenCreada(orderId);
                this.presentToast('Error al crear el detalle de orden', 'danger');
              }
            );
          },
          (error) => {
            console.error('Error al obtener la información del producto:', error);
            this.presentToast('Error al obtener la información del producto', 'danger');
            
          }
        );
  
  
      });
    }

    actualizarCantidadProductos(orderId: string) {
      this.pasarelaService.actualizarCantidadProductos(this.noProductos1, orderId)
        .subscribe(
          (response) => {
            console.log('Numero productos actualizado en la base de datos:', response);
            this.noProductos1 = 1;
          },
          (error) => {
            console.error('Error al actualizar la cantidad en la base de datos Beto:', error);
            this.noProductos1 = 1;
            // Maneja el error según sea necesario
          }
        );
    }

    eliminarOrdenCreada(orderId: string): void {
      console.log('Id que se quiere eliminar: ', orderId);
      // Llama al servicio para eliminar la orden utilizando el ID orderId
      this.pasarelaService.eliminarOrden(orderId).subscribe(
  
        (response) => {
          console.log('Orden eliminada exitosamente:', response);
        },
        (error) => {
          console.error('Error al eliminar la orden:', error);
          // Muestra un mensaje de error al usuario si es necesario
        }
      );
    }

    vaciarCarrito(): void {
      // Define un arreglo vacío para el carrito
      const carritoVacio: any[] = [];
  
      // Utiliza el servicio para reemplazar el carrito actual con el carrito vacío en la base de datos
      console.log("Carrito:", this.idCliente);
      this.pasarelaService.actualizarCarrito(carritoVacio, this.idCliente).subscribe(
        (response) => {
          // Si la actualización se realiza correctamente, redirige al usuario a la página de inicio del cliente
          //this.router.navigateByUrl('/inicio-cliente');
          this.dismissLoading();
          this.isVisible = false;
          this.botonesDeshabilitados = true;
          this.presentToast('Compra exitosa', 'success');
          this.carritoVaciado.emit(); // Emitir evento

          // Verificar si el cliente ya tiene feedback registrado
          this.pasarelaService.verificarFeedbackCliente(this.idCliente).subscribe(
            (feedbackExiste) => {
              
              if (!feedbackExiste) {
                // Mostrar modal de feedback si no existe un feedback previo
                this.abrirFeedback.emit();
              }
            },
            (error) => {
              console.error('Error al verificar feedback:', error);
            }
          );
          
        },
        (error) => {
          // Maneja el error si la actualización del carrito falla
          console.error('Error al vaciar el carrito:', error);
          // Redirige al usuario a la página de inicio del cliente independientemente del error
          //this.router.navigateByUrl('/inicio-cliente');
        }
      );
    }

}
