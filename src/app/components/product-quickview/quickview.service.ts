import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

export interface Product {
  _id: string;
  imagen: string[];
  nombre: string;
  descripcion: string;
  precio: { $numberDecimal: string };
  etiquetas: string[];
  idRestaurante: string;
}

@Injectable({
  providedIn: 'root',
})
export class quickviewService {
  private AUTH_SERVER = 'https://quickdinehub-back1.onrender.com'; // Reemplaza con tu URL de backend

  constructor(private httpClient: HttpClient) {}

  obtenerInfoDeProductoPorId(productId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/info-producto/${productId}`);
  }

}
