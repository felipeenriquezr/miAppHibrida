import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { GalleryPage } from './gallery.page';
// Importamos el componente del modal para registrarlo
import { CartModalComponent } from './cart-modal.component'; 

const routes: Routes = [
  {
    path: '',
    component: GalleryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    // Al ser un componente Standalone, se importa aquí para que GalleryPage pueda usarlo
    CartModalComponent 
  ],
  declarations: [GalleryPage]
})
export class GalleryPageModule {}