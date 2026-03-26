import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Photo } from './photo.service';

// Extendemos la interfaz Photo para manejar la lógica del carrito
interface CartItem extends Photo {
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CartModalComponent implements OnInit {
  // Recibimos los items y los tratamos como CartItem
  @Input() items: any[] = []; 
  
  public total: number = 0;
  public readonly UNIT_PRICE = 5000;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Al iniciar, nos aseguramos que cada foto tenga cantidad 1 y el precio de 5k
    this.items = this.items.map(item => ({
      ...item,
      quantity: item.quantity || 1,
      price: this.UNIT_PRICE
    }));
    this.calculateTotal();
  }

  /**
   * Calcula el total de la compra multiplicando precio por cantidad
   */
  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  /**
   * Incrementa la cantidad de un item específico
   */
  addQuantity(index: number) {
    this.items[index].quantity += 1;
    this.calculateTotal();
  }

  /**
   * Reduce la cantidad. Si llega a 0, elimina el producto.
   */
  removeQuantity(index: number) {
    if (this.items[index].quantity > 1) {
      this.items[index].quantity -= 1;
    } else {
      this.removeItem(index);
    }
    this.calculateTotal();
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.calculateTotal();
    // Si borramos todo, cerramos el modal automáticamente
    if (this.items.length === 0) {
      this.dismiss();
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  checkout() {
    // Enviamos el total procesado como feedback (opcional)
    this.modalCtrl.dismiss({ 
      processed: true,
      finalAmount: this.total 
    });
  }
}