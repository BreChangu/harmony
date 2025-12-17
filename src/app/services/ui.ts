import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  
  // Estado del panel de Booking
  isBookingOpen = signal(false);

  // Estado del panel de Servicios (si lo estás usando)
  isServicePanelOpen = signal(false);
  selectedService = signal<string | null>(null);

  constructor() { }

  toggleBooking() {
    this.isBookingOpen.update(v => !v);
    
    // Bloquear scroll cuando se abre
    if (this.isBookingOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // Métodos para servicios (opcionales si usas el panel de detalles)
  openServiceDetails(serviceName: string) {
    this.selectedService.set(serviceName);
    this.isServicePanelOpen.set(true);
  }

  closeServiceDetails() {
    this.isServicePanelOpen.set(false);
    this.selectedService.set(null);
  }
}