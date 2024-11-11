import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductQuickviewComponent } from '../components/product-quickview/product-quickview.component';
import { CatalogoService, Product } from './catalogo.service';
import { Preferences } from '@capacitor/preferences';

import {ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild('quickview') quickview!: ProductQuickviewComponent;

  productos: Product[] = [];
  filteredProductos: Product[] = []; // productos filtrados
  searchTerm: string = ''; //almacenar el término de búsqueda
  selectedFilter: string = 'Todo'; //Filtro por defecto
  isLoading = false; // Variable inicial de la animacion de carga
  userName: string = '';
  

  constructor(
    private catalogoService: CatalogoService,
    private loadingController: LoadingController, // Inyectar el controlador de Loading
    private toastController: ToastController, // Inyectar el controlador de Toast
    private router: Router
  ) {}


//-------Mensajes de carga y error---------------------------------------
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

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    await toast.present();
  }
//-----Carga inicial---------------------------------------------
  ngOnInit(): void {
    this.cargarNombreUsuario();
    this.cargarProductos();
    this.cargarCarritoComensal();
  }

  ionViewWillEnter() {
    // Este método se ejecuta cada vez que el usuario entra a este tab
    this.cargarCarritoComensal();
  }

  //Elementos de perfil de usuario---------------------------------------
  
  async cargarNombreUsuario(): Promise<void> {
    const { value } = await Preferences.get({ key: 'userName' });
    if (value) {
      this.userName = value;
    }
  }

  irAPerfilUsuario() {
    this.router.navigate(['/perfil-usuario']);
  }
  
  //--------------------Obtencion de los productos--------------------
  cargarProductos(): void {
    //this.presentLoading();
    this.catalogoService.obtenerProductos().subscribe(
      (productos: Product[]) => {
        this.dismissLoading();
        this.productos = productos;
        this.filteredProductos = productos; // Inicialmente, mostrar todos los productos
      },
      (error) => {
        this.dismissLoading();
        this.presentToast('Error de conexion a la red', 'danger');
        console.error('Error al obtener los productos:', error);
      }
    );
  }

   // Método para generar la URL completa de las imagenes
   getImageUrl(relativePath: string): string {
    return `https://quickdinehub-back1.onrender.com/${relativePath}`;
  }

  //---------Funcion de barra de busqueda de productos---------------------

  filterProducts(): void {
    this.aplicarFiltro(this.selectedFilter);
  }

  // ----------------Método para aplicar el filtro de categorías-------------------
  // Filtrar productos por texto y categoría
  aplicarFiltro(categoria: string): void {
    this.selectedFilter = categoria;

    // Convertir el término de búsqueda a minúsculas para comparación
    const searchLower = this.searchTerm.toLowerCase();

    this.filteredProductos = this.productos.filter((producto) => {
      const matchesText = producto.nombre.toLowerCase().includes(searchLower);
      const matchesCategory = categoria === 'Todo' || producto.etiquetas.includes(categoria);

      return matchesText && matchesCategory;
    });
  }

  //----Agregar productos al carrito-------------------------
  carrito: { productId: string, idRestaurante: string, cantidad: number, especificacion: string }[] = [];

  async agregarAlCarrito(product: Product) {
    console.log("Carrito",this.carrito)

    const itemExistente = this.carrito.find(
      (item) => item.productId === product._id && item.idRestaurante === product.idRestaurante
    );
  
    if (itemExistente) {
      this.presentToast('Este producto ya está en el carrito', 'warning');
    } else {
      const nuevoItem = {
        productId: product._id,
        idRestaurante: product.idRestaurante,
        cantidad: 1,
        especificacion: ''
      };
  
      this.carrito.push(nuevoItem);
  
      try {
        const observable = await this.catalogoService.actualizarCarritoBD(this.carrito); // Espera el Observable
        observable.subscribe(
          () => {
            this.presentToast('Producto agregado al carrito', 'success');
          },
          (error) => {
            console.error('Error al actualizar el carrito:', error);
            this.presentToast('Error al agregar producto al carrito', 'danger');
          }
        );
      } catch (error) {
        console.error('Error al ejecutar actualizarCarritoBD:', error);
        this.presentToast('Error al agregar producto al carrito', 'danger');
      }
    }
  }

  // Método para cargar el carrito del comensal desde la base de datos
  async cargarCarritoComensal() {
    try {
      const observable = await this.catalogoService.obtenerDatoComensal();
      observable.subscribe(
        (data) => {
          this.carrito = data.carrito || [];
          console.log('Carrito del comensal:', this.carrito);
        },
        (error) => {
          console.error('Error al obtener el carrito del comensal', error);
          this.presentToast('Error al obtener el carrito del comensal', 'danger');
        }
      );
    } catch (error) {
      console.error('Error al ejecutar obtenerDatoComensal:', error);
      this.presentToast('Error al obtener el carrito del comensal', 'danger');
    }
  }
  


  
}
