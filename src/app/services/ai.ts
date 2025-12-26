import { Injectable, signal } from '@angular/core';

export interface Message {
  text: string;
  isUser: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  
  // 1. TU URL DE N8N
  // Pega aquí la "Test URL" que copiaste de tu nodo Webhook en n8n.
  // Debe terminar en /chat-harmony
  private n8nWebhookUrl = 'http://localhost:5678/webhook/chat-harmony';

  // 2. ID DE SESIÓN ÚNICO
  // Generamos un ID aleatorio cada vez que alguien entra a la página.
  // Esto sirve para que n8n sepa que "María" es diferente a "Juan".
  private sessionId = Math.random().toString(36).substring(7);

  // Historial del chat
  messages = signal<Message[]>([
    { text: 'Hola, soy Aura, tu consultora Harmony. ✨ ¿Buscas un look natural o algo para un evento especial?', isUser: false }
  ]);

  isLoading = signal(false);

  async sendMessage(userText: string) {
    // A. Agregar mensaje del usuario a la pantalla inmediatamente
    this.messages.update(msgs => [...msgs, { text: userText, isUser: true }]);
    this.isLoading.set(true);

    try {
      // B. ENVIAR A N8N (Conexión Real)
      const response = await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          text: userText,         // Lo que escribió el usuario
          sessionId: this.sessionId // Para que Aura tenga memoria
        })
      });

      if (!response.ok) throw new Error('Error conectando con n8n');

      const data = await response.json();

      // C. RECIBIR RESPUESTA DE AURA
      // Esperamos que n8n nos devuelva un JSON así: { "reply": "Texto de la IA..." }
      const aiResponse = data.reply || "Lo siento, hubo una interferencia mágica. ¿Podrías repetirlo?";

      this.messages.update(msgs => [...msgs, { text: aiResponse, isUser: false }]);

    } catch (error) {
      console.error('Error con Aura AI:', error);
      // Mensaje de error elegante si n8n está apagado
      this.messages.update(msgs => [...msgs, { text: 'Aura está recargando energía (Error de conexión). 🌙 Por favor intenta en unos momentos.', isUser: false }]);
    } finally {
      this.isLoading.set(false);
    }
  }
}