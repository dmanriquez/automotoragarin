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
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbox-container" [class.open]="isOpen()">
      <button class="chat-toggle" (click)="toggleChat()" [class.has-notification]="!isOpen() && hasNewMessage()">
        <img *ngIf="!isOpen()" src="/assets/images/chat-icon.svg" alt="Chat" class="chat-icon" />
        <svg *ngIf="isOpen()" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span class="chat-pulse"></span>
      </button>

      <div class="chatbox" *ngIf="isOpen()">
        <div class="chat-header">
          <h3>Consulta de Stock</h3>
          <p>Pregunta por nuestros vehículos disponibles</p>
        </div>

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
            placeholder="Pregunta por un vehículo..."
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
  `,
  styles: [`
    .chatbox-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
    }

    .chat-toggle {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: linear-gradient(135deg, #eda753 0%, #d88f3c 100%);
      border: 4px solid white;
      color: white;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(237, 167, 83, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      position: relative;
      animation: float 3s ease-in-out infinite;
    }

    .chat-icon {
      width: 64px;
      height: 64px;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    .chat-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 3px solid #eda753;
      animation: pulse 2s ease-out infinite;
      pointer-events: none;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1.4);
        opacity: 0;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .chat-toggle:hover {
      transform: scale(1.15) rotate(5deg);
      box-shadow: 0 12px 32px rgba(237, 167, 83, 0.6), 0 6px 16px rgba(0, 0, 0, 0.3);
      animation: none;
    }

    .chat-toggle:active {
      transform: scale(1.05);
    }

    .chat-toggle.has-notification::after {
      content: '';
      position: absolute;
      top: 4px;
      right: 4px;
      width: 20px;
      height: 20px;
      background: #ff4757;
      border-radius: 50%;
      border: 3px solid white;
      animation: blink 1s ease-in-out infinite;
    }

    @keyframes blink {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.1);
      }
    }

    .chatbox {
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      width: 400px;
      height: 550px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chat-header {
      background: linear-gradient(135deg, #294393 0%, #1a2d5f 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 16px 16px 0 0;
    }

    .chat-header h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .chat-header p {
      margin: 0;
      font-size: 0.85rem;
      opacity: 0.9;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
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
      padding: 0.75rem 1rem;
      border-radius: 12px;
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .message-content p {
      margin: 0 0 0.25rem 0;
      line-height: 1.5;
      white-space: pre-wrap;
      word-wrap: break-word;
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
      padding: 1rem;
      background: white;
      border-top: 1px solid #e5e7eb;
      gap: 0.5rem;
    }

    .chat-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
    }

    .chat-input:focus {
      border-color: #294393;
    }

    .chat-input:disabled {
      background: #f5f7fa;
      cursor: not-allowed;
    }

    .send-button {
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #eda753 0%, #d88f3c 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .send-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(237, 167, 83, 0.3);
    }

    .send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 768px) {
      .chatbox {
        width: calc(100vw - 2rem);
        height: calc(100vh - 10rem);
        right: 1rem;
        bottom: 6rem;
      }

      .chatbox-container {
        right: 1rem;
      }

      .chat-toggle {
        width: 80px;
        height: 80px;
      }

      .chat-icon {
        width: 56px;
        height: 56px;
      }
    }
  `]
})
export class ChatboxComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  isOpen = signal(false);
  isLoading = signal(false);
  hasNewMessage = signal(false);
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

  toggleChat() {
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
      this.hasNewMessage.set(false);
      this.shouldScroll = true;
    }
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

      if (!this.isOpen()) {
        this.hasNewMessage.set(true);
      }
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
