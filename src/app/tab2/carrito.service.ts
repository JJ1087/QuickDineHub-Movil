import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://quickdinehub-back1.onrender.com'; // Cambia esto a tu URL de API

  constructor(private http: HttpClient) {}

  async ObtenerProductosCarrito(): Promise<Observable<any>> {
    // Obtener el userId almacenado en Preferences
    const { value: userId } = await Preferences.get({ key: 'userId' });

    // Configurar el encabezado con el token de autenticación
    const { value: authToken } = await Preferences.get({ key: 'authToken' });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    // Realizar la solicitud GET a la API para obtener los productos del carrito
    return this.http.get(`${this.apiUrl}/carrito/${userId}`, { headers });
  }

  async eliminarDeCarrito(productId: string): Promise<any> {
    const { value: userId } = await Preferences.get({ key: 'userId' });
    const { value: authToken } = await Preferences.get({ key: 'authToken' });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.delete(`${this.apiUrl}/eliminar-de-carrito/${userId}/${productId}`, { headers }).toPromise();
  }
  
  async actualizarCantidadEnBD(productId: string, cantidad: number): Promise<any> {
    const { value: userId } = await Preferences.get({ key: 'userId' });
    const { value: authToken } = await Preferences.get({ key: 'authToken' });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(`${this.apiUrl}/comensales/${userId}/carrito/cantidad`, { productId, cantidad }, { headers }).toPromise();
  }

  obtenerDatoComensal(comensalId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/info-comensalId/${comensalId}`);
  }
  
}
