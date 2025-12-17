import { Component, HostListener, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiService } from '../../services/ui';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  
  // Inyección moderna (Angular 14+)
  public ui = inject(UiService);
  private scroller = inject(ViewportScroller);

  isScrolled = false;
  isMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detectamos scroll para el efecto Glassmorphism
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  // Función helper para navegar y cerrar menú en móvil
  scrollToSection(id: string) {
    this.isMenuOpen = false;
    this.scroller.scrollToAnchor(id);
  }
}