import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { Producto } from './producto.interface';


@Injectable({
  providedIn: 'root'
})
export class PasarelaService {
  private apiUrl = 'https://quickdinehub-back1.onrender.com'; // Cambia esto a tu URL de API

  constructor(private http: HttpClient) {}

  // Modificación del servicio para obtener el ID del comensal
  async obtenerDirecciones(): Promise<Observable<any>> {
    // Obtener el comensalId almacenado en Preferences
    const { value: comensalId } = await Preferences.get({ key: 'userId' });

    // Obtener el token de autenticación
    const { value: authToken } = await Preferences.get({ key: 'authToken' });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    // Realizar la solicitud GET a la API para obtener las direcciones del comensal
    return this.http.get<any>(`${this.apiUrl}/obtener-direcciones/${comensalId}`, { headers });
  }

  //Creacion de ordenes
  crearOrden(ordenData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-orden`, ordenData);
  }

  obtenerInfoDeProductoPorId(productId: string): Observable<any> {
    return this.http.get<Producto>(`${this.apiUrl}/info-producto/${productId}`);
  }

  crearDetalleOrden(ordenDetalleData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-detalleOrden`, ordenDetalleData);
  }
  
  actualizarCantidadProductos(noProductos1: number, orderId: string) {
    console.log('Enviando solicitud de actualización de cantidad de producto:', noProductos1, 'y idComensal:', orderId);
    const url = `${this.apiUrl}/comensales/${orderId}/noProductos`; // Ruta modificada
    return this.http.put(url, {noProductos1: noProductos1 }); // Enviar productId y nuevaCantidad en el cuerpo
  }

  eliminarOrden(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar-orden/${orderId}`);
  }

  actualizarCarrito(carrito: any[], comensalId: string): Observable<any> {
    const body = {
      comensalId: comensalId,
      carrito: carrito
    };
    return this.http.put(`${this.apiUrl}/actualizar-carrito`, body);
    }
}