import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { feedbackService } from './feedback.service';
import { LoadingController } from '@ionic/angular'; 

@Component({
  selector: 'app-feedback-formulario',
  templateUrl: './feedback-formulario.component.html',
  styleUrls: ['./feedback-formulario.component.scss'],
})
export class FeedbackFormularioComponent  implements OnInit {
  isVisible = false;
  botonesDeshabilitados: boolean = true;
  idCliente: string = '';

  claridadCompraSeleccionada = false;
  disenoAgradableSeleccionado = false;
  usoConvenienteSeleccionado = false;

  respuestaUno: number | null = null;
  respuestaDos: number | null = null;
  respuestaTres: number | null = null;


  constructor(private FDService: feedbackService, private loadingController: LoadingController) { }

  //Manejor del modal y mensajes-----------------
  openModal() {//Recibimos el id
    this.isVisible = true;
    
  }
  
  closeModal() {
    this.isVisible = false;
  }

  async cargarUsuario(): Promise<void> {
    const { value } = await Preferences.get({ key: 'userId' });
    if (value) {
      this.idCliente = value;
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Guardando respuestas...',
      spinner: 'circles', // Puedes elegir entre varios estilos de spinner
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
  //Carga inicial------------------------------------------
  ngOnInit() { 
    
  }


  // Función que se ejecuta cuando el usuario selecciona una respuesta
  selectAnswer(pregunta: string, valor: number) {
    this.cargarUsuario();

    switch (pregunta) {
      case 'claridadCompra':
        this.claridadCompraSeleccionada = true;
        this.respuestaUno = valor;
        break;
      case 'disenoAgradable':
        this.disenoAgradableSeleccionado = true;
        this.respuestaDos = valor;
        break;
      case 'usoConveniente':
        this.usoConvenienteSeleccionado = true;
        this.respuestaTres = valor;
        break;
    }
    this.checkAllSelected();
  }

  checkAllSelected() {
    this.botonesDeshabilitados = !(
      this.claridadCompraSeleccionada &&
      this.disenoAgradableSeleccionado &&
      this.usoConvenienteSeleccionado
    );
  }

  Evaluar() {
    this.presentLoading();
    if (this.idCliente && this.respuestaUno !== null && this.respuestaDos !== null && this.respuestaTres !== null) {
      console.log("FeedBack: ", this.idCliente, this.respuestaUno, this.respuestaDos, this.respuestaTres);

      this.FDService.enviarFeedback(this.idCliente, this.respuestaUno, this.respuestaDos, this.respuestaTres)
        .subscribe({
          next: () => {
            console.log("Feedback enviado correctamente");
            this.resetForm();
          },
          
          error: (error) => {
            console.error("Error al enviar feedback", error);
            this.dismissLoading();
        }
          
        });
    }
  }

  resetForm() {
    this.dismissLoading();
    this.botonesDeshabilitados = true;
    this.claridadCompraSeleccionada = false;
    this.disenoAgradableSeleccionado = false;
    this.usoConvenienteSeleccionado = false;
    this.respuestaUno = null;
    this.respuestaDos = null;
    this.respuestaTres = null;
    this.isVisible = false;
  }

}
