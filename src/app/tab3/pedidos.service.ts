
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly apiUrl = 'https://quickdinehub-back1.onrender.com'; // Reemplaza con tu URL del servidor

  constructor(private http: HttpClient) {}

  async obtenerOrdenes(): Promise<Observable<any[]>> {
    const { value: userId } = await Preferences.get({ key: 'userId' });
    const { value: authToken } = await Preferences.get({ key: 'authToken' });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    console.log("ID PAYASO:", userId)

    return this.http.get<any[]>(`${this.apiUrl}/obtener-ordenes/${userId}`, { headers });
  }

  async obtenerDetalleOrdenes(): Promise<Observable<any[]>> {
    const { value: authToken } = await Preferences.get({ key: 'authToken' });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.get<any[]>(`${this.apiUrl}/info-detalleOrden`, { headers });
  }

  obtenerInfoDeOrdenPorId(ordenId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    });
    return this.http.get<any>(`${this.apiUrl}/info-ordenId/${ordenId}`, { headers });
  }

  obtenerRestaurante(restauranteId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    });
    return this.http.get<any>(`${this.apiUrl}/info-restauranteId/${restauranteId}`, { headers });
  }

  // Método optimizado para obtener múltiples productos
  obtenerInfoDeProductosPorIds(idsProductos: string[]): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    });
    return this.http.post<any[]>(`${this.apiUrl}/info-productosIds`, { ids: idsProductos }, { headers });
  }


}


