import { Component, signal, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="chat-section" class="chat-section">
      <div class="chat-section-container">
        <div class="chat-section-header">
          <h2>Consulta de Stock</h2>
          <p>Pregunta por nuestros vehículos disponibles</p>
        </div>

        <div class="chat-box-wrapper">
          <div class="chat-messages" #messagesContainer>
            <div *ngFor="let message of messages(); trackBy: trackByIndex"
                 class="message"
                 [class.user-message]="message.isUser"
                 [class.bot-message]="!message.isUser">
              <div class="message-content">
                <p>{{ message.text }}</p>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
            </div>
            <div *ngIf="isLoading()" class="message bot-message">
              <div class="message-content">
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <form class="chat-input-container" (submit)="sendMessage($event)">
            <input
              type="text"
              [(ngModel)]="inputMessage"
              name="message"
              placeholder="Pregunta por nuestros vehículos disponibles..."
              class="chat-input"
              [disabled]="isLoading()"
            />
            <button type="submit" class="send-button" [disabled]="!inputMessage.trim() || isLoading()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .chat-section {
      width: 100%;
      padding: 4rem 0;
      background: linear-gradient(180deg, #f5c563 0%, #f0b844 100%);
      position: relative;
    }

    .chat-section-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .chat-section-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .chat-section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a2d5f;
      margin: 0 0 0.5rem 0;
    }

    .chat-section-header p {
      font-size: 1.1rem;
      color: #294393;
      margin: 0;
    }

    .chat-box-wrapper {
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 600px;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
      background: #f5f7fa;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      display: flex;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .user-message {
      justify-content: flex-end;
    }

    .bot-message {
      justify-content: flex-start;
    }

    .message-content {
      max-width: 75%;
      padding: 1rem 1.25rem;
      border-radius: 16px;
      position: relative;
    }

    .user-message .message-content {
      background: linear-gradient(135deg, #294393 0%, #1a2d5f 100%);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .bot-message .message-content {
      background: white;
      color: #333;
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .message-content p {
      margin: 0 0 0.25rem 0;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 0.95rem;
    }

    .message-time {
      font-size: 0.7rem;
      opacity: 0.7;
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 0.5rem 0;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      background: #294393;
      border-radius: 50%;
      animation: typing 1.4s infinite;
    }

    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.7;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }

    .chat-input-container {
      display: flex;
      padding: 1.5rem;
      background: white;
      border-top: 1px solid #e5e7eb;
      gap: 0.75rem;
    }

    .chat-input {
      flex: 1;
      padding: 1rem 1.25rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 1rem;
      outline: none;
      transition: all 0.2s;
      font-family: inherit;
    }

    .chat-input:focus {
      border-color: #294393;
      box-shadow: 0 0 0 3px rgba(41, 67, 147, 0.1);
    }

    .chat-input:disabled {
      background: #f5f7fa;
      cursor: not-allowed;
    }

    .send-button {
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, #eda753 0%, #d88f3c 100%);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 60px;
    }

    .send-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(237, 167, 83, 0.4);
    }

    .send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .send-button:active:not(:disabled) {
      transform: translateY(0);
    }

    /* Custom scrollbar */
    .chat-messages::-webkit-scrollbar {
      width: 8px;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: #e5e7eb;
      border-radius: 4px;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: #294393;
      border-radius: 4px;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: #1a2d5f;
    }

    @media (max-width: 768px) {
      .chat-section {
        padding: 3rem 0;
      }

      .chat-section-container {
        padding: 0 1rem;
      }

      .chat-section-header h2 {
        font-size: 2rem;
      }

      .chat-section-header p {
        font-size: 1rem;
      }

      .chat-box-wrapper {
        height: 500px;
        border-radius: 16px;
      }

      .chat-messages {
        padding: 1.5rem;
      }

      .message-content {
        max-width: 85%;
        padding: 0.875rem 1rem;
      }

      .chat-input-container {
        padding: 1rem;
      }

      .chat-input {
        padding: 0.875rem 1rem;
        font-size: 0.95rem;
      }

      .send-button {
        padding: 0.875rem 1.25rem;
        min-width: 50px;
      }
    }
  `]
})
export class ChatSectionComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  isLoading = signal(false);
  inputMessage = '';
  messages = signal<Message[]>([
    {
      text: '¡Hola! Soy el asistente de Automotora Garin. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  private shouldScroll = false;

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) {
      console.error('Error scrolling:', err);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  async sendMessage(event: Event) {
    event.preventDefault();

    if (!this.inputMessage.trim() || this.isLoading()) {
      return;
    }

    const userMessage: Message = {
      text: this.inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, userMessage]);
    const question = this.inputMessage;
    this.inputMessage = '';
    this.isLoading.set(true);
    this.shouldScroll = true;

    try {
      const response = await this.chatService.sendMessage(question);

      const botMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      this.messages.update(msgs => [...msgs, botMessage]);
      this.shouldScroll = true;
    } catch (error) {
      const errorMessage: Message = {
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente.',
        isUser: false,
        timestamp: new Date()
      };
      this.messages.update(msgs => [...msgs, errorMessage]);
      this.shouldScroll = true;
    } finally {
      this.isLoading.set(false);
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  }
}
