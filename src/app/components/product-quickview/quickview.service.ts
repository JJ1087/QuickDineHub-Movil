import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
