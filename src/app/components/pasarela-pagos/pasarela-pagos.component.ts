import { Component, OnInit, Input } from '@angular/core';
import { PasarelaService } from './pasarela.service';

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

  constructor(private pasarelaService: PasarelaService) { }


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

}
