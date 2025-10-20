# 🚗 Automotora Garin

Sitio web moderno para automotora con asistente de chat impulsado por IA.

## ✨ Características

- **Hero Section Moderna**: Diseño atractivo con animaciones y efectos visuales
- **Chatbot IA**: Asistente inteligente para consultas de stock de vehículos
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Integración con Supabase**: Backend robusto con edge functions
- **Mapa Interactivo**: Ubicación y datos de contacto
- **Animaciones Fluidas**: Experiencia de usuario mejorada

## 🛠️ Tecnologías

- **Frontend**: Angular 19 (Standalone Components)
- **Backend**: Supabase Edge Functions
- **Estilos**: CSS moderno con gradientes y animaciones
- **TypeScript**: Type-safe code

## 📂 Estructura del Proyecto

```
automotora/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── chatbox/          # Componente del chat
│   │   │   ├── hero/              # Hero section principal
│   │   │   ├── map-section/       # Mapa y ubicación
│   │   │   ├── footer/            # Pie de página
│   │   │   └── whatsapp-button/   # Botón WhatsApp (comentado)
│   │   ├── services/
│   │   │   └── chat.service.ts    # Servicio del chatbot
│   │   └── config/
│   │       └── environment.ts     # Configuración
│   ├── assets/
│   │   └── images/                # Imágenes y recursos
│   └── global_styles.css          # Estilos globales
└── supabase/
    └── functions/
        └── chat-agent/            # Edge function del chatbot
```

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   cd automotora
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Actualizar `src/app/config/environment.ts` con tus credenciales de Supabase

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## 🎨 Componentes Principales

### Chatbox Component
- Botón flotante con icono personalizado
- Animaciones de pulso y flotación
- Scroll automático en mensajes
- Indicador de escritura
- Manejo robusto de errores

### Hero Component
- Diseño moderno con gradientes animados
- Efectos de parallax
- Badges informativos
- Indicador de scroll
- Totalmente responsivo

### Chat Service
- Timeout de 30 segundos
- Manejo de errores mejorado
- Validación de mensajes
- Integración con Supabase

## 📱 Características de UX

- **Animaciones suaves**: Transiciones fluidas en toda la aplicación
- **Feedback visual**: Indicadores de carga y estado
- **Accesibilidad**: Focus visible y reducción de movimiento
- **Performance**: Lazy loading y optimizaciones

## 🔧 Configuración del Chatbot

El chatbot está conectado a una Supabase Edge Function. Para configurarlo:

1. Desplegar la función en Supabase
2. Actualizar las credenciales en `environment.ts`
3. Configurar el modelo de IA según necesidades

## 📝 Notas de Desarrollo

### Componentes Deshabilitados
- **WhatsApp Button**: Actualmente comentado en `app.component.ts`
  - Para reactivar, descomentar las líneas correspondientes

### Optimizaciones Implementadas
- TrackBy en listas para mejor performance
- Scroll automático mejorado con AfterViewChecked
- Validación de entrada en servicios
- CSS optimizado con animaciones condicionales

## 🎯 Próximas Mejoras

- [ ] Integración con sistema de inventario real
- [ ] Panel de administración
- [ ] Múltiples idiomas
- [ ] Sistema de reservas
- [ ] Analytics y tracking

## 📄 Licencia

© 2025 Automotora Garin. Todos los derechos reservados.

## 👥 Contacto

- **Dirección**: Av. Principal 1234, Santiago, Chile
- **Teléfono**: +56 9 1234 5678
- **Email**: contacto@automotoragarin.cl

---

Desarrollado con ❤️ usando Angular y Supabase
