// src/app/services/api.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs'; // <-- IMPORTA 'retry' Y 'catchError'

// Es una buena práctica definir la "forma" de la respuesta que esperamos del backend.
// Esto nos ayuda a evitar errores y a que el autocompletado funcione.
export interface ProtectedApiResponse {
  message: string;
  email: string;
  username: string;
}

// <-- NUEVA INTERFAZ para la ruta /api/status -->
export interface StatusApiResponse {
  status: string;
  uploadedFiles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Dirección de tu backend Express.js
  private backendUrl = ' https://pmid-omaha-manual-objective.trycloudflare.com  ';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene datos protegidos desde la API.
   * Incluye reintento automático en caso de fallos temporales.
   */
  public getProtectedData(): Observable<ProtectedApiResponse> {
    return this.http.get<ProtectedApiResponse>(`${this.backendUrl}/api/protegida`).pipe(
      retry(2), // Reintenta 2 veces si la conexión falla
      catchError(this.handleError)
    );
  }

  /**
   * Envía los documentos seleccionados al backend.
   * No se reintenta para evitar duplicados en caso de error.
   */
  public uploadDocuments(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/api/upload`, formData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Consulta el estado actual de los documentos subidos.
   * Muestra la lista de archivos existentes del usuario.
   */
  public getUploadStatus(): Observable<StatusApiResponse> {
    return this.http.get<StatusApiResponse>(`${this.backendUrl}/api/status`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Manejo centralizado de errores HTTP.
   */
  private handleError(error: any) {
    console.error('Ocurrió un error en la petición HTTP:', error);
    return throwError(() => new Error('Algo salió mal; por favor, inténtalo de nuevo más tarde.'));
  }
}
