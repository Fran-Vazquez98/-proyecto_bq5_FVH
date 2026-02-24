import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Whisky } from '../models/whisky.model';

@Injectable({
  providedIn: 'root'
})
export class WhiskyService {
  // URL de la API Node 
  private apiUrl = 'https://localhost:3000/api/whiskies';

  constructor(private http: HttpClient) { }

  // Obtener todo el catálogo
  getWhiskies(): Observable<Whisky[]> {
    return this.http.get<Whisky[]>(this.apiUrl).pipe(
      retry(1), // Reintenta una vez antes de fallar
      catchError(this.handleError)
    );
  }

  // Buscar por nombre
  buscarPorNombre(nombre: string): Observable<Whisky[]> {
    return this.http.get<Whisky[]>(`${this.apiUrl}/nombre/${nombre}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un whisky por ID 
  getWhiskyById(id: number): Observable<Whisky> {
    return this.http.get<Whisky>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Filtrar por categoría
  getPorCategoria(tipo: string): Observable<Whisky[]> {
    return this.http.get<Whisky[]>(`${this.apiUrl}/categoria/${tipo}`).pipe(
      catchError(this.handleError)
    );
  }

  //GESTIÓN DE ERRORES 
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El servidor devolvió un código de respuesta fallido
      if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor. Revisa si el BACK está encendido y el certificado aceptado.';
      } else {
        errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}