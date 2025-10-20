import { Injectable } from '@angular/core';
import { environment } from '../config/environment';

interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly apiUrl = `${environment.supabaseUrl}/functions/v1/chat-agent`;
  private readonly requestTimeout = 30000; // 30 segundos

  async sendMessage(message: string): Promise<string> {
    if (!message || !message.trim()) {
      throw new Error('El mensaje no puede estar vacío');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.supabaseAnonKey}`
        },
        body: JSON.stringify({ message: message.trim() }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Error desconocido');
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
      }

      const data: ChatResponse = await response.json();
      
      if (!data.response) {
        throw new Error('Respuesta inválida del servidor');
      }

      return data.response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La solicitud ha tardado demasiado. Por favor, intenta nuevamente.');
        }
        console.error('Error en ChatService:', error);
        throw error;
      }
      
      throw new Error('Error inesperado al enviar el mensaje');
    }
  }
}
