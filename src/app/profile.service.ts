import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos qué datos esperamos recibir del servidor
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // CORRECCIÓN: Apuntar a tu servidor local de Node.js
  // Si usas el navegador: localhost. Si usas Android: la IP de tu PC.
private apiUrl = 'http://10.0.2.2:8080/api/user/profile';

  constructor(private http: HttpClient) { }

  // Al llamar a esta función, el JwtInterceptor pondrá el Token automáticamente
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl);
  }
}