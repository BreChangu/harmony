import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingComponent } from './components/booking/booking';
import { NavbarComponent } from "./components/navbar/navbar";
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookingComponent, NavbarComponent,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('harmony');


  isBookingOpen = signal(false);

  toggleBooking() {
    this.isBookingOpen.update(v => !v);
    
    // Opcional: Bloquear el scroll del cuerpo cuando abres el modal
    if (this.isBookingOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
