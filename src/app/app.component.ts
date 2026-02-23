//Funcionalidad de la aplicación

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  constructor(private alertController: AlertController) {}

  // Método genérico para mostrar avisos de "Próximamente"
  async presentAlert(platform: string) {
    const alert = await this.alertController.create({
      header: 'Registro',
      subHeader: `Autenticación con ${platform}`,
      message: 'La integración técnica se realizará en la siguiente fase.',
      buttons: ['Entendido'],
    });

    await alert.present();
  }

  handleEmailAuth() {
    console.log('Iniciando registro por Email...');
    this.presentAlert('Email');
  }

  handleGoogleAuth() {
    console.log('Iniciando flujo de Google...');
    this.presentAlert('Google');
  }

  handleFacebookAuth() {
    console.log('Iniciando flujo de Facebook...');
    this.presentAlert('Facebook');
  }
}