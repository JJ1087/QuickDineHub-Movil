import { Component, OnInit } from '@angular/core';
import { PedidosService } from './pedidos.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  ordenes1: any[] = [];
  detalleOrdenes: any[] = [];
  ordenes: { [key: string]: any[] } = {};

  constructor(private pedidosService: PedidosService) {}

  async ngOnInit() {
    
  }

  async ionViewWillEnter() {
   
    try {
      // Cargar órdenes del usuario
      const ordenes$ = await this.pedidosService.obtenerOrdenes();
      ordenes$.subscribe(
        (ordenes) => {
          this.ordenes1 = ordenes;
          console.log('Órdenes obtenidas:', this.ordenes1);

          // Cargar detalles de las órdenes y filtrarlos
          this.cargarDetallesOrdenes();
        },
        (error) => {
          console.error('Error al obtener las órdenes:', error);
        }
      );
    } catch (error) {
      console.error('Error en la carga inicial:', error);
    }
    
  }

  private async cargarDetallesOrdenes() {
    try {
      const detalleOrdenes$ = await this.pedidosService.obtenerDetalleOrdenes();
      detalleOrdenes$.subscribe(
        (detalles) => {
          this.detalleOrdenes = detalles.filter(detalle =>
            this.ordenes1.some(orden => orden._id === detalle.idOrden)
          );
          this.organizarDetallesPorOrden();
          this.obtenerEstadosOrdenes();
          this.obtenerDetallesProducto();
        },
        (error) => {
          console.error('Error al obtener los detalles de las órdenes:', error);
        }
      );
    } catch (error) {
      console.error('Error al cargar detalles de órdenes:', error);
    }
  }

  private organizarDetallesPorOrden() {
    this.ordenes = {};
    this.detalleOrdenes.forEach(detalle => {
      if (!this.ordenes[detalle.idOrden]) {
        this.ordenes[detalle.idOrden] = [];
      }
      this.ordenes[detalle.idOrden].push(detalle);
    });

    // Ordenar cada grupo de detalles en orden descendente
    Object.keys(this.ordenes).forEach(key => {
      this.ordenes[key] = this.ordenes[key].reverse();
    });

    console.log('Detalles de órdenes organizados por orden:', this.ordenes);
  }

  private obtenerEstadosOrdenes() {
    const idsOrdenes = Object.keys(this.ordenes);
    idsOrdenes.forEach(ordenId => {
      this.pedidosService.obtenerInfoDeOrdenPorId(ordenId).subscribe(
        (orden: any) => {
          this.ordenes[ordenId].forEach(detalle => {
            detalle.estadoOrden = orden.estadoOrden;
            detalle.fechaPedido = orden.createdAt;
            detalle.idRestaurante = orden.idRestaurante;
            this.obtenerInformacionRestaurante(detalle);
          });
        },
        (error) => {
          console.error(`Error al obtener la información de la orden con ID ${ordenId}:`, error);
        }
      );
    });
  }

  private obtenerInformacionRestaurante(detalle: any) {
    const idRestaurante = detalle.idRestaurante;
    console.log('Restaurante ID:', idRestaurante);
    this.pedidosService.obtenerRestaurante(idRestaurante).subscribe(
      (restaurante: any) => {
        detalle.nombreRestaurante = restaurante.nombreRestaurante;
      },
      (error) => {
        console.error('Error al obtener la información del restaurante:', error);
      }
    );
  }
  
  private async obtenerDetallesProducto() {
    const idsProductos = this.detalleOrdenes.map(detalle => detalle.idProducto);

    this.pedidosService.obtenerInfoDeProductosPorIds(idsProductos).subscribe(
        (productos: any[]) => {
            productos.forEach(producto => {
                // Actualizar todos los detalles de orden que coincidan con el idProducto del producto
                this.detalleOrdenes.forEach(detalle => {
                    if (detalle.idProducto === producto._id) {
                        detalle.producto = producto;
                    }
                });
            });
            console.log('Detalles de órdenes con información de productos:', this.detalleOrdenes);
        },
        (error) => {
            console.error('Error al obtener la información de los productos:', error);
        }
    );
  }

  // Método para generar la URL completa de las imagenes
  getImageUrl(relativePath: string): string {
    return `https://quickdinehub-back1.onrender.com/${relativePath}`;
  }

  // Método para obtener el significado de 'estadoOrden'
  obtenerEstado(estadoOrden: number): string {
    switch (estadoOrden) {
      case 0: return 'En espera de ser aceptado';
      case 1: return 'Orden rechazada';
      case 2: return '¿Desea continuar con la compra?';
      case 3: return 'En espera de ser aceptado';
      case 4: return 'En preparación';
      case 5: return 'Esperando repartidor';
      case 6: return 'Salió de cocina, en camino';
      case 7: return 'Confirmar entrega';
      case 8: return 'Pedido cancelado';
      case 9: return 'Entregado';
      default: return 'Cargando estado';
    }
  }

}
