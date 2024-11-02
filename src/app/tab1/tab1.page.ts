import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductQuickviewComponent } from '../components/product-quickview/product-quickview.component';
import { CatalogoService, Product } from './catalogo.service';

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

  constructor(private catalogoService: CatalogoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  //--------------------Obtencion de los productos--------------------
  cargarProductos(): void {
    this.catalogoService.obtenerProductos().subscribe(
      (productos: Product[]) => {
        this.productos = productos;
        this.filteredProductos = productos; // Inicialmente, mostrar todos los productos
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

   // Método para generar la URL completa de las imagenes
   getImageUrl(relativePath: string): string {
    return `https://quickdinehub-back1.onrender.com/${relativePath}`;
  }

  //---------Funcion de busqueda de productos---------------------

  filterProducts(): void {
    this.aplicarFiltro(this.selectedFilter);
  }

  // ----------------Método para aplicar el filtro de categoría-------------------
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

  
}
