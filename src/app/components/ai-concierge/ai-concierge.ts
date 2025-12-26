import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai';

@Component({
  selector: 'app-ai-concierge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-concierge.html',
  styleUrls: ['./ai-concierge.css']
})
export class AiConciergeComponent implements AfterViewChecked {
  
  public ai = inject(AiService);
  
  isOpen = signal(false);
  userInput = '';

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  send() {
    if (!this.userInput.trim()) return;
    
    this.ai.sendMessage(this.userInput);
    this.userInput = ''; // Limpiar input
  }

  // Auto-scroll hacia abajo cuando llega un mensaje
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}