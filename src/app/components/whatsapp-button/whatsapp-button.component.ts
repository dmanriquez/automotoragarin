import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <a href="https://wa.me/56912345678?text=Hola,%20estoy%20interesado%20en%20conocer%20más%20sobre%20los%20vehículos%20disponibles"
       target="_blank"
       rel="noopener noreferrer"
       class="whatsapp-button"
       title="Contactar por WhatsApp">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.822.742 5.595 2.147 8.041L0 32l8.212-2.108A15.928 15.928 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0z" fill="currentColor"/>
        <path d="M25.36 22.547c-.424 1.192-2.104 2.184-3.444 2.472-.908.189-2.096.341-6.084-1.308-5.108-2.116-8.404-7.288-8.66-7.62-.244-.332-2.012-2.676-2.012-5.104s1.272-3.62 1.724-4.116c.452-.496 0.984-.62 1.312-.62.328 0 .656.004.944.016.304.012.712-.116 1.112.848.412 1.012 1.408 3.44 1.532 3.688.124.248.208.536.042.868-.164.332-.248.54-.492.832-.244.292-.512.652-.732.876-.244.248-.496.516-.212.992.284.476 1.264 2.084 2.712 3.376 1.864 1.664 3.432 2.184 3.916 2.432.484.248.768.208 1.052-.124.284-.332 1.22-1.424 1.548-1.916.328-.492.656-.412 1.108-.248.452.164 2.876 1.356 3.368 1.604.492.248.82.372.944.576.124.204.124 1.176-.3 2.368z" fill="#294393"/>
      </svg>
      <span>Contactar Vendedor</span>
    </a>
  `,
  styles: [`
    .whatsapp-button {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%);
      color: white;
      padding: 0.875rem 1.5rem;
      border-radius: 50px;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
      font-weight: 600;
      font-size: 1rem;
      z-index: 999;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .whatsapp-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
    }

    .whatsapp-button svg {
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .whatsapp-button {
        left: 1rem;
        bottom: 8rem;
        padding: 0.75rem 1.25rem;
        font-size: 0.9rem;
      }

      .whatsapp-button span {
        display: none;
      }

      .whatsapp-button {
        width: 60px;
        height: 60px;
        padding: 0;
        justify-content: center;
        border-radius: 50%;
      }
    }
  `]
})
export class WhatsappButtonComponent {}
