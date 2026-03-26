import { Component, OnInit } from '@angular/core';
import { PhotoService, Photo } from './photo.service';
import { ToastController, ModalController } from '@ionic/angular';
import { CartModalComponent } from './cart-modal.component'; // Asegúrate de crear este componente

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: false,
})
export class GalleryPage implements OnInit {
  
  public cartItems: Photo[] = [];
  public cartCount: number = 0;

  constructor(
    public photoService: PhotoService,
    private toastController: ToastController,
    private modalController: ModalController // Inyectado para el resumen
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  /**
   * Añade una foto (producto de maquillaje) al carrito
   */
 async addToCart(photo: Photo) {
  this.cartItems.push(photo);
  this.cartCount = this.cartItems.length;

  const toast = await this.toastController.create({
    message: '¡Añadido a la selección de Glam Spirit!',
    duration: 1500,
    position: 'bottom',
    // Clase personalizada para el diseño
    cssClass: 'custom-toast-success', 
    buttons: [
      {
        text: 'OK',
        role: 'cancel'
      }
    ]
  });
  
  await toast.present();
}

  /**
   * Abre el Modal con el resumen de productos seleccionados de Glam Spirit
   */
  async openCart() {
    console.log('--- DEBUG: Botón de carrito presionado ---');
    console.log('--- DEBUG: Cantidad de items en el carrito:', this.cartCount);

    // 1. Validación de seguridad
    if (this.cartCount === 0) {
      console.warn('--- DEBUG: Carrito vacío, mostrando Toast ---');
      this.presentSimpleToast('Tu selección Glam está vacía aún.', 'warning');
      return;
    }

    try {
      // 2. Creación del Modal
      console.log('--- DEBUG: Intentando crear el modal con los items seleccionados...');
      const modal = await this.modalController.create({
        component: CartModalComponent,
        componentProps: {
          items: this.cartItems // Inyectamos la lista de fotos al componente standalone
        },
        cssClass: 'cart-modal-style' // Opcional: Para estilos específicos si los necesitas
      });

      // 3. Presentación del Modal
      await modal.present();
      console.log('--- DEBUG: Modal presentado con éxito en Android ---');

      // 4. Lógica tras el cierre (Promesa de cierre)
      const { data } = await modal.onWillDismiss();
      console.log('--- DEBUG: Modal cerrado. Datos recibidos:', data);
      
      if (data?.processed) {
        // Si el usuario finalizó la compra en el Modal
        this.cartItems = [];
        this.cartCount = 0;
        this.presentSimpleToast('¡Gracias por tu compra en Glam Spirit!', 'success');
        console.log('--- DEBUG: Carrito vaciado tras compra exitosa ---');
      } else {
        // Si solo cerró el modal, actualizamos el contador por si eliminó algún item
        this.cartCount = this.cartItems.length;
        console.log('--- DEBUG: Retorno a galería. Items restantes:', this.cartCount);
      }

    } catch (error) {
      console.error('--- ERROR CRÍTICO: No se pudo abrir el modal:', error);
      this.presentSimpleToast('Error al abrir el carrito.', 'danger');
    }
  }

  private async presentSimpleToast(msg: string, color: string = 'warning') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}