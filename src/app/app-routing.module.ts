import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    // IMPORTANTE: Verifica que el archivo se llame exactamente register.module.ts
    loadChildren: () => import('./register.module').then(m => m.RegisterPageModule)
  },
  // Ruta comodín para evitar el error de "no match"
  {
    path: '**',
    redirectTo: 'register'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }