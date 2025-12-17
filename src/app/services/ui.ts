import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  
  // Esta señal controla si el Booking está visible o no
  isBookingOpen = signal(false);

  toggleBooking() {
    this.isBookingOpen.update(v => !v);
    
    // Bloqueo de scroll para que el fondo no se mueva al abrir el panel
    if (this.isBookingOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}