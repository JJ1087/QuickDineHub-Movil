import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class feedbackService {
  private apiUrl = 'https://quickdinehub-back1.onrender.com'; // Reemplaza con tu URL de backend

  constructor(private http: HttpClient) {}

  enviarFeedback(idCliente: string, respuestaUno: number, respuestaDos: number, respuestaTres: number): Observable<any> {
    const payload = {
      idCliente,
      respuestaUno,
      respuestaDos,
      respuestaTres
    };
    return this.http.post<any>(`${this.apiUrl}/feedback`, payload);
  }

}
