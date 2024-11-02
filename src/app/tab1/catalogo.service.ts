import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
export class CatalogoService {
    private apiUrl = 'https://quickdinehub-back1.onrender.com'; //URL de API

  constructor(private http: HttpClient) {}

  // Método para obtener la información de los productos
  obtenerProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/info-producto1`);
  }

}
