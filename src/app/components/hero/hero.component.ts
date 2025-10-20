import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="animated-bg">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="hero-content">
        <div class="logo-container">
          <img src="/assets/images/logo.svg" alt="Logo Automotora Garin" class="logo-image" />
        </div>
        <h3 class="hero-question">
          <span class="highlight">¿Necesitas</span> un nuevo auto?
        </h3>
        <p class="hero-subtitle">
          Encuentra el vehículo perfecto para ti
        </p>
        <div class="cta-container">
          <div class="feature-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Stock Actualizado</span>
          </div>
          <div class="feature-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Atención 24/7</span>
          </div>
        </div>
        <button class="scroll-indicator" (click)="scrollToChat()" aria-label="Ir a consulta de stock">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M19 12l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      background: linear-gradient(135deg, #294393 0%, #1a2d5f 100%);
      background-image: url('/assets/images/hero-background.jpg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(41, 67, 147, 0.9) 0%, rgba(26, 45, 95, 0.85) 100%);
      z-index: 1;
    }

    .animated-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 2;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      animation: float-shapes 20s ease-in-out infinite;
    }

    .shape-1 {
      width: 400px;
      height: 400px;
      background: rgba(237, 167, 83, 0.15);
      top: -100px;
      right: -100px;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 300px;
      height: 300px;
      background: rgba(255, 255, 255, 0.08);
      bottom: -50px;
      left: -50px;
      animation-delay: 5s;
    }

    .shape-3 {
      width: 350px;
      height: 350px;
      background: rgba(237, 167, 83, 0.1);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: 10s;
    }

    @keyframes float-shapes {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(30px, -30px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
    }

    .hero-content {
      position: relative;
      z-index: 3;
      text-align: center;
      color: white;
      padding: 2rem;
      max-width: 900px;
      animation: fadeInUp 1s ease-out;
    }

    .logo-container {
      margin-bottom: 3rem;
      animation: fadeIn 1.2s ease-out;
    }

    .logo-image {
      max-width: 280px;
      height: auto;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
    }

    @keyframes logoFloat {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .hero-question {
      font-size: 3.5rem;
      font-weight: 700;
      margin: 2rem 0 1.5rem;
      color: #ffffff;
      animation: fadeInUp 1.4s ease-out;
      line-height: 1.2;
      text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
    }

    .hero-question .highlight {
      color: #eda753;
      display: inline-block;
      position: relative;
      animation: glow 2s ease-in-out infinite;
    }

    @keyframes glow {
      0%, 100% {
        text-shadow: 0 0 20px rgba(237, 167, 83, 0.5);
      }
      50% {
        text-shadow: 0 0 30px rgba(237, 167, 83, 0.8);
      }
    }

    .hero-subtitle {
      font-size: 1.5rem;
      font-weight: 400;
      color: #ffffff;
      margin: 0 0 3rem 0;
      animation: fadeInUp 1.6s ease-out;
      text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .cta-container {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 3rem;
      animation: fadeInUp 1.8s ease-out;
    }

    .feature-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.5rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50px;
      font-weight: 600;
      font-size: 1rem;
      color: white;
      transition: all 0.3s ease;
      cursor: default;
    }

    .feature-badge:hover {
      background: rgba(237, 167, 83, 0.25);
      border-color: rgba(237, 167, 83, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .feature-badge svg {
      flex-shrink: 0;
    }

    .scroll-indicator {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      animation: scrollBounce 2s ease-in-out infinite;
      background: rgba(237, 167, 83, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
      backdrop-filter: blur(10px);
    }

    .scroll-indicator:hover {
      background: rgba(237, 167, 83, 0.4);
      border-color: #eda753;
      transform: translateX(-50%) scale(1.1);
      animation: none;
      box-shadow: 0 8px 20px rgba(237, 167, 83, 0.3);
    }

    .scroll-indicator:active {
      transform: translateX(-50%) scale(1.05);
    }

    @keyframes scrollBounce {
      0%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      50% {
        transform: translateX(-50%) translateY(10px);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .logo-image {
        max-width: 200px;
      }

      .hero-question {
        font-size: 2.2rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
      }

      .cta-container {
        flex-direction: column;
        gap: 1rem;
      }

      .feature-badge {
        padding: 0.75rem 1.25rem;
        font-size: 0.9rem;
      }

      .shape {
        filter: blur(40px);
      }

      .shape-1, .shape-2, .shape-3 {
        width: 250px;
        height: 250px;
      }
    }
  `]
})
export class HeroComponent {
  scrollToChat() {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
