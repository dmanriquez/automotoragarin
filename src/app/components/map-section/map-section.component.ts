import { Component } from '@angular/core';

@Component({
  selector: 'app-map-section',
  standalone: true,
  template: `
    <section class="map-section">
      <div class="map-container">
        <div class="map-header">
          <h2>Visítanos</h2>
          <p>Estamos ubicados en el corazón de la ciudad</p>
        </div>
        <div class="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.123456789!2d-70.5814!3d-33.4989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI5JzU2LjAiUyA3MMKwMzQnNTMuMCJX!5e0!3m2!1ses!2scl!4v1234567890123!5m2!1ses!2scl"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div class="map-info">
          <div class="info-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div>
              <h4>Dirección</h4>
              <p>Av. Departamental 4500, 7820830 Macul, Región Metropolitana</p>
            </div>
          </div>
          <div class="info-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <div>
              <h4>Horario</h4>
              <p>Lun - Vie: 9:00 - 19:00<br>Sáb: 10:00 - 14:00</p>
            </div>
          </div>
          <div class="info-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <div>
              <h4>Teléfono</h4>
              <p>+56 9 1234 5678</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .map-section {
      width: 100%;
      padding: 4rem 0;
      background: linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%);
    }

    .map-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .map-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .map-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #294393;
      margin: 0 0 0.5rem 0;
    }

    .map-header p {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }

    .map-wrapper {
      width: 100%;
      height: 450px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .map-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .info-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(41, 67, 147, 0.15);
    }

    .info-card svg {
      color: #eda753;
      flex-shrink: 0;
      margin-top: 0.25rem;
    }

    .info-card h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #294393;
      margin: 0 0 0.5rem 0;
    }

    .info-card p {
      font-size: 0.95rem;
      color: #666;
      margin: 0;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .map-section {
        padding: 3rem 0;
      }

      .map-container {
        padding: 0 1rem;
      }

      .map-header h2 {
        font-size: 2rem;
      }

      .map-wrapper {
        height: 350px;
      }

      .map-info {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MapSectionComponent {}
