import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs'; 
import { map, switchMap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

interface LoginResponse {
  token: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 1. CORRECCIÓN: Cambiado de 8080 a 3000 para coincidir con server.js
  private apiUrl = 'http://10.0.2.2:3000/api/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      // 2. MEJORA: Aseguramos que el flujo de RxJS no se rompa al guardar en Preferences
      switchMap(response => {
        return from(Preferences.set({ 
          key: this.tokenKey, 
          value: response.token 
        })).pipe(
          map(() => response) // Devolvemos la respuesta original después de guardar
        );
      })
    );
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.tokenKey });
    return value;
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: this.tokenKey });
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}