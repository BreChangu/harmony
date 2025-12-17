import { Component, inject, signal,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  
  // 1. Inyectamos el servicio para abrir el panel de reservas
  ui = inject(UiService);

  //Detectar scroll en ventana 
 isScrolled = false;
  isMenuOpen = false; // Para versión móvil
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si bajamos más de 50px, activamos el fondo oscuro
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 2. SEÑALES PARA EL CURSOR (Esto es lo que te falta)
  cursorX = signal(0);
  cursorY = signal(0);
  isHovering = signal(false);

  // 3. MÉTODOS QUE FALTABAN

  // Actualiza las coordenadas cada vez que mueves el mouse por la pantalla
  // Importante: Tipamos 'e' como MouseEvent para evitar el error "Object is unknown"
  onMouseMove(e: MouseEvent) {
    this.cursorX.set(e.clientX);
    this.cursorY.set(e.clientY);
  }

  // Activa/Desactiva el modo "Hover" (círculo grande)
  setHover(state: boolean) {
    this.isHovering.set(state);
  }
}