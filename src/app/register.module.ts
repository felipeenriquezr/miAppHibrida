import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router'; // Importamos RouterModule directamente

import { RegisterPage } from './register.page';

// Definimos la ruta aquí mismo
const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // Configuramos la ruta para que esta página sepa que debe mostrar RegisterPage
    RouterModule.forChild(routes) 
  ],
  declarations: [ RegisterPage ]
})
export class RegisterPageModule { }