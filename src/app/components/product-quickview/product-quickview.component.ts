/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { quickviewService  } from './quickview.service';

@Component({
  selector: 'app-product-quickview',
  templateUrl: './product-quickview.component.html',
  styleUrls: ['./product-quickview.component.scss'],
})
export class ProductQuickviewComponent  implements OnInit {
  isVisible = false;
  product: any;
  idRestaurante: string | undefined;
  costoEnvio: number | undefined;
  nombreProducto: string | undefined;
  descripcionProducto: string | undefined;
  costoUnidad: number | undefined;
  imagenUrl: string | undefined;

  constructor(private authService: quickviewService) { }

  //Carga de inicio-----------------------------------------------------

  ngOnInit() {}



  openModal(productId: string) {//Recibimos el id
    this.isVisible = true;
    this.loadProduct(productId);
  }
  
  closeModal() {
    this.isVisible = false;
  }

  private loadProduct(productId: string) {
    this.authService.obtenerInfoDeProductoPorId(productId).subscribe(
      (data) => {
        this.product = data;
        this.idRestaurante = data.idRestaurante;
        this.costoEnvio = data.costoEnvio;
        this.nombreProducto = data.nombre;
        this.descripcionProducto = data.descripcion;
        this.costoUnidad = Number(data.precio.$numberDecimal);
        this.imagenUrl = this.getImageUrl(data.imagen[0]);
      },
      (error) => console.error('Error al obtener la información del producto:', error)
    );
  }

   // Método para generar la URL completa de la imagen
   getImageUrl(relativePath: string): string {
    return `https://quickdinehub-back1.onrender.com/${relativePath}`;
  }

}
