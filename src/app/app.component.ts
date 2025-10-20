import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
// import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { ChatSectionComponent } from './components/chat-section/chat-section.component';
import { MapSectionComponent } from './components/map-section/map-section.component';
import { FooterComponent } from './components/footer/footer.component';
// import { ChatboxComponent } from './components/chatbox/chatbox.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    // WhatsappButtonComponent,
    ChatSectionComponent,
    MapSectionComponent,
    FooterComponent,
    // ChatboxComponent
  ],
  template: `
    <div class="app-container">
      <app-hero />
      <app-chat-section />
      <app-map-section />
      <app-footer />
      <!-- <app-whatsapp-button /> -->
      <!-- <app-chatbox /> -->
    </div>
  `,
  styles: [`
    .app-container {
      width: 100%;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {}
