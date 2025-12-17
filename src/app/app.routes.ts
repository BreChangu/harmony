import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BookingComponent } from './components/booking/booking';
import { NavbarComponent } from './components/navbar/navbar';

export const routes: Routes = [
  // RUTA RAÍZ (El Home)
  { 
    path: '', 
    component: HomeComponent, 
    title: 'Harmony Bliss | Inicio' 
  },

];
