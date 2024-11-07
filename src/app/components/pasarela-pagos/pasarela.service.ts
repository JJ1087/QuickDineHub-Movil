import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';



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
  
  
}