import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor() { }

  async addNewToGallery() {
    try {
      // Solicitar permiso para acceder a la cámara
      await this.requestCameraPermission();

      // Capturar foto desde la cámara (usar Base64 para compatibilidad con Android)
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 90
      });

      // Procesar la foto capturada
      if (capturedPhoto.base64String) {
        const savedImageFile = await this.savePicture(capturedPhoto.base64String);
        this.photos.unshift(savedImageFile);

        // Guardar la lista de fotos en preferencias
        await Preferences.set({
          key: this.PHOTO_STORAGE,
          value: JSON.stringify(this.photos),
        });

        console.log('Foto guardada exitosamente:', savedImageFile.filepath);
      }
    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }

  private async requestCameraPermission() {
    try {
      const status = await Camera.requestPermissions();
      console.log('Estado de permisos de cámara:', status);
    } catch (error) {
      console.error('Error al solicitar permiso de cámara:', error);
      throw new Error('Permiso de cámara denegado');
    }
  }

  private async savePicture(base64Data: string): Promise<Photo> {
    // Crear nombre único para el archivo
    const fileName = 'photo_' + new Date().getTime() + '.jpeg';

    try {
      // Guardar en el directorio de la aplicación
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
        recursive: true,
      });

      console.log('Archivo guardado en:', savedFile.uri);

      // Convertir URI para que sea accesible por WebView
      const webviewPath = Capacitor.convertFileSrc(savedFile.uri);

      return {
        filepath: savedFile.uri,
        webviewPath: webviewPath,
      };
    } catch (error) {
      console.error('Error guardando archivo:', error);
      throw error;
    }
  }

  async loadSaved() {
    // Cargar fotos guardadas desde preferencias
    try {
      const photoList = await Preferences.get({ key: this.PHOTO_STORAGE });

      if (photoList && photoList.value) {
        this.photos = JSON.parse(photoList.value) || [];
        console.log('Fotos cargadas:', this.photos.length);
      }
    } catch (error) {
      console.error('Error al cargar fotos guardadas:', error);
    }
  }
}