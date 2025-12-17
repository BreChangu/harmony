import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{ UiService } from '../../services/ui';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './booking.html', // Asegúrate que se llame booking.component.html
  styleUrls: ['./booking.css']   // Asegúrate que se llame booking.component.css
})
export class BookingComponent {
  
  // --- 1. LÓGICA DE VISIBILIDAD (NUEVO) ---
  // Esto controla si el panel lateral está abierto o cerrado
  isOpen = signal(false);

  toggleBooking() {
    this.isOpen.update(v => !v);
    
    // Bloqueamos el scroll del cuerpo para que no se mueva la página de fondo
    if (this.isOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // --- 2. LÓGICA DEL WIZARD (Lo que ya tenías) ---
  currentStep = signal(1);
  
  // Datos de la selección
  selection = {
    category: '',
    serviceName: '',
    duration: 0,
    price: 0,
    date: '',
    time: '',
    name: ''
  };

  // Catálogo de Servicios
  services = [
    {
      id: 'lashes',
      name: 'Lashes',
      icon: '👁️',
      items: [
        { name: 'Clásicas (1x1)', duration: 90, price: 800 },
        { name: 'Híbridas', duration: 120, price: 950 },
        { name: 'Volumen Ruso', duration: 150, price: 1200 },
        { name: 'Lifting de Pestañas', duration: 60, price: 450 }
      ]
    },
    {
      id: 'nails',
      name: 'Nails',
      icon: '💅',
      items: [
        { name: 'Gelish Manos', duration: 45, price: 250 },
        { name: 'Esculturales', duration: 120, price: 650 },
        { name: 'Retoque', duration: 90, price: 450 }
      ]
    },
    {
      id: 'hair',
      name: 'Hair',
      icon: '💇‍♀️',
      items: [
        { name: 'Corte & Estilo', duration: 60, price: 500 },
        { name: 'Tinte Completo', duration: 120, price: 1500 },
        { name: 'Tratamiento Hidratante', duration: 45, price: 600 }
      ]
    }
  ];

  // Horarios Disponibles
  timeSlots: string[] = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  // Getter inteligente
  get currentServiceList() {
    return this.services.find(s => s.name === this.selection.category)?.items || [];
  }

  // --- MÉTODOS DE SELECCIÓN ---

  selectCategory(catName: string) {
    this.selection.category = catName;
    this.nextStep();
  }

  selectService(item: any) {
    this.selection.serviceName = item.name;
    this.selection.duration = item.duration;
    this.selection.price = item.price;
    this.nextStep();
  }

  selectTime(slot: string) {
    this.selection.time = slot;
  }

  // --- NAVEGACIÓN ---

  nextStep() {
    this.currentStep.update(v => v + 1);
  }

  prevStep() {
    this.currentStep.update(v => Math.max(v - 1, 1));
  }

  // --- CIERRE (WhatsApp) ---
  finalizeBooking() {
    const phone = '525512345678'; // ¡Recuerda poner el número real aquí!
    
    const text = `Hola Harmony Bliss ✨, quiero solicitar una cita:
    
    💅 Servicio: ${this.selection.category} - ${this.selection.serviceName}
    ⏱️ Duración: ${this.selection.duration} min
    💰 Precio Estimado: $${this.selection.price}
    
    📅 Fecha: ${this.selection.date}
    ⏰ Hora: ${this.selection.time}
    
    👤 Cliente: ${this.selection.name}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    
    // Opcional: Cerrar el modal después de enviar
    // this.toggleBooking(); 
  }
}