import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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
export class CatalogoService {
    private apiUrl = 'https://quickdinehub-back1.onrender.com'; //URL de API

  constructor(private http: HttpClient) {}

  // Método para obtener la información de los productos
  obtenerProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/info-producto1`);
  }

  // Método para actualizar el carrito en la base de datos
  async actualizarCarritoBD(
    carrito: { productId: string; idRestaurante: string; cantidad: number; especificacion: string }[]
  ): Promise<Observable<any>> {
    // Obtener el userId y authToken del almacenamiento local
    const { value: userId } = await Preferences.get({ key: 'userId' });
    const { value: authToken } = await Preferences.get({ key: 'authToken' });

    // Configurar los headers con el token de autenticación
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    // Enviar la solicitud POST con el carrito y headers de autorización
    return this.http.post<any>(`${this.apiUrl}/guardar-carrito/${userId}`, { carrito }, { headers });
  }

   // Método para obtener el carrito del comensal desde la base de datos
   async obtenerDatoComensal(): Promise<Observable<any>> {
    const { value: comensalId } = await Preferences.get({ key: 'userId' }); // Recupera el userId del storage
    if (!comensalId) {
      throw new Error('No se encontró el ID del usuario en el almacenamiento.');
    }
    return this.http.get<any>(`${this.apiUrl}/info-comensalId/${comensalId}`);
  }

}
