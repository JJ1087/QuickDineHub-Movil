import { Component, OnInit, ViewChild } from '@angular/core';
import { CarritoService } from './carrito.service';
import { ToastController, LoadingController } from '@ionic/angular'; // Para mostrar mensajes emergentes
import { PasarelaPagosComponent } from '../components/pasarela-pagos/pasarela-pagos.component';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild('quickview') quickview!: PasarelaPagosComponent;

  productosCarrito: any [] = [];
  //isLoading = false; // Variable inicial de la animacion de carga
  subtotalCompra: number = 0;
  totalCompra: number = 0;
  

  constructor(
    private carritoService: CarritoService,
    private toastController: ToastController,
    private loadingController: LoadingController // Inyectar el controlador de Loading
    
  ) {}

  //-----------Mensajes emergentes--------------------
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando productos...',
      spinner: 'circles', // Puedes elegir entre varios estilos de spinner
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  //------Carga inicial----------------------------

  ngOnInit() {
    //this.cargarProductosCarrito();
  }
  
  ionViewWillEnter() {
    // Este método se ejecuta cada vez que el usuario entra a este tab
    this.cargarProductosCarrito();
  }

  async cargarProductosCarrito() {

    this.presentLoading();
    try {
      (await this.carritoService.ObtenerProductosCarrito()).subscribe((data) => {
        this.dismissLoading();
        this.productosCarrito = data.carrito;
        this.calcularSubtotal();
        
      });
    } catch (error) {
      this.dismissLoading();
      this.presentToast('Problema de conexión a la red...');
      console.error('Error al cargar los productos del carrito', error);
    }
  }

  // Método para generar la URL completa de las imagenes
  getImageUrl(relativePath: string): string {
    return `https://quickdinehub-back1.onrender.com/${relativePath}`;
  }

  //-------Eliminar producto----------------------------------------------
  async eliminarDeCarrito(productId: string) {
    try {
      // Llamar al servicio para eliminar el producto del carrito
      const response = await this.carritoService.eliminarDeCarrito(productId);      
      // Volver a cargar los productos del carrito
      this.cargarProductosCarrito();
    } catch (error) {
      this.presentToast('Problema de red. No se ha podido eliminar producto del carrito...');
      console.error('Error al eliminar producto del carrito:', error);
    }
  }

  //---------------Actualizar cantidades------------------------------------
  // Método para actualizar la cantidad de productos en el carrito
  async actualizarCantidad(operacion: string, productId: string, cantidadActual: number) {
    let nuevaCantidad = cantidadActual;

    if (operacion === '+') {
      nuevaCantidad++;
    } else if (operacion === '-') {
      nuevaCantidad--;
    }

    if (nuevaCantidad >= 1) {
      try {
        await this.carritoService.actualizarCantidadEnBD(productId, nuevaCantidad);
        // Actualizar el carrito después de modificar la cantidad
        this.cargarProductosCarrito();
      } catch (error) {
        console.error('Error al actualizar la cantidad del producto:', error);
      }
    } else {
      this.presentToast('No puedes continuar restando...');
      console.log("No puedes continuar restando...");
    }
  }

  //----Funciones del componente resumende compra-----------
  calcularSubtotal(): void {
    this.subtotalCompra = this.productosCarrito.reduce((acc, producto) => acc + producto.subtotal, 0);
    this.totalCompra = this.subtotalCompra + 30;
  }


 
}
