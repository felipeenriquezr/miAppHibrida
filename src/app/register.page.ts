import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular'; 
import { PhotoService } from './photo.service';
import { AuthService } from './auth.service'; 
import { ProfileService, UserProfile } from './profile.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  userEmail: string = '';
  userPass: string = '';
  userProfile?: UserProfile;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    public photoService: PhotoService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  async handleEmailAuth() {
    const loading = await this.loadingController.create({
      message: 'Autenticando en Glam Spirit...',
    });
    await loading.present();

    const credentials = {
      email: this.userEmail,
      password: this.userPass
    };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        loading.dismiss();
        console.log('Token recibido y guardado');
        // Importante: No llamamos a loadUserData aquí si vamos a navegar de inmediato, 
        // o lo llamamos y luego mostramos la alerta.
        this.presentAlert('Email');
      },
      error: (err: any) => {
        loading.dismiss();
        this.errorAlert('Error de acceso', 'Credenciales inválidas o servidor no disponible.');
      }
    });
  }

  loadUserData() {
    this.profileService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        console.log('Datos de usuario obtenidos con JWT:', this.userProfile);
      },
      error: (err) => {
        console.error('El interceptor no pudo validar el token:', err);
      }
    });
  }

  // --- Cambios aquí: Manejo del botón "Excelente" ---

  async presentAlert(platform: string) {
    const alert = await this.alertController.create({
      header: '¡Portal Glam Spirit!',
      subHeader: `Sesión iniciada vía ${platform}`,
      message: 'Acceso validado. Ya puedes gestionar tu galería de looks.',
      backdropDismiss: false, // Evita que se cierre haciendo clic afuera
      buttons: [
        {
          text: '¡Excelente!',
          handler: () => {
            // AQUÍ ocurre la magia: al presionar el botón, navega
            this.router.navigate(['/gallery']);
          }
        }
      ],
    });
    await alert.present();
  }

  async errorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Reintentar'],
    });
    await alert.present();
  }

  handleGoogleAuth() { this.presentAlert('Google'); }
  handleFacebookAuth() { this.presentAlert('Facebook'); }
}