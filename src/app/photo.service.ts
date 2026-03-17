import { Injectable } from '@angular/core';

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor() { }

  async addNewToGallery() {
    // Implementación para agregar fotos desde la cámara
    console.log('Agregando nueva foto a la galería');
    // Aquí irá la lógica de la cámara
  }

  async loadSaved() {
    // Implementación para cargar fotos guardadas
    console.log('Cargando fotos guardadas');
  }
}