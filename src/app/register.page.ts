import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  // 1. Variables vinculadas al formulario mediante [(ngModel)]
  userEmail: string = '';
  userPass: string = '';

  constructor(
    private alertController: AlertController,
    public photoService: PhotoService 
  ) {}

  // 2. Acción principal del botón REGISTRARSE
  handleEmailAuth() {
    console.log('Intento de registro con:', this.userEmail);
    // Aquí podrías añadir lógica para validar que sea un email real si quisieras
    this.presentAlert('Email');
  }

  // 3. Acciones de redes sociales (Simuladas)
  handleGoogleAuth() {
    this.presentAlert('Google');
  }

  handleFacebookAuth() {
    this.presentAlert('Facebook');
  }

  // 4. Alerta genérica para feedback del usuario
  async presentAlert(platform: string) {
    const alert = await this.alertController.create({
      header: '¡Portal Glam Spirit!',
      subHeader: `Autenticación vía ${platform}`,
      message: 'Acceso validado. Desliza hacia abajo para ver tu galería de looks.',
      buttons: ['Entendido'],
    });
    await alert.present();
  }
}