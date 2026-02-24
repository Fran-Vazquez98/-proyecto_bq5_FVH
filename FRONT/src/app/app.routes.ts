import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { CatalogoComponent } from './pages/catalogo/catalogo';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'inicio', component: Inicio },
  { path: 'catalogo', component: CatalogoComponent },
  { path: '**', redirectTo: 'inicio' }
];