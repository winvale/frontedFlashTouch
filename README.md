# FlashTouch Frontend

**Bilingual Angular Frontend for Language Learning**

---

## Descripción / Description

FlashTouch es una plataforma de aprendizaje de idiomas que utiliza el poder del aprendizaje visual y la neurociencia para ayudarte a dominar vocabulario de manera rápida y divertida. Esta es la interfaz frontend desarrollada en Angular, con soporte bilingüe (Español/Inglés).

FlashTouch is a language learning platform leveraging visual learning and neuroscience to help you master vocabulary quickly and enjoyably. This is the Angular frontend with bilingual support (Spanish/English).

---

## Características Principales / Main Features

- 🌐 **Soporte Bilingüe:** Cambia entre español e inglés en toda la interfaz.
- 🖼️ **Aprendizaje Visual:** Secciones de ciencia y demo basadas en imágenes.
- 🚀 **Componentes Modulares:** Header, Hero, Science, Features, Demo, Pricing, Footer y Modal de Autenticación.
- 💡 **Gestión de Estado Local:** Cambio de idioma y simulación de autenticación.
- 📱 **Responsive:** Diseño moderno y adaptable a cualquier dispositivo.

---

## Estructura del Proyecto / Project Structure

```
frontedFlashTouch/
├── app/
│   └── src/
│       └── app/
│           ├── shared/
│           │   ├── header/
│           │   ├── hero/
│           │   ├── science/
│           │   ├── features/
│           │   ├── demo/
│           │   ├── pricing/
│           │   ├── footer/
│           │   └── language.service.ts
│           ├── app.component.ts
│           └── app.component.html
├── public/
│   └── logo.png
└── assets/
    └── [iconos, imágenes]
```

---

## Instalación / Installation

1. **Clona el repositorio / Clone the repo:**
   ```bash
   git clone https://github.com/winvale/frontedFlashTouch.git
   cd frontedFlashTouch/app
   ```
2. **Instala dependencias / Install dependencies:**
   ```bash
   npm install
   ```
3. **Ejecuta el servidor de desarrollo / Run the dev server:**
   ```bash
   npm start
   # o / or
   ng serve --port 4400 --hmr
   ```
4. **Abre en tu navegador / Open in your browser:**
   - http://localhost:4400

---

## Uso / Usage

- Cambia el idioma usando los botones en el header.
- Navega por las secciones: características, ciencia, demo interactiva y precios.
- El diseño es completamente responsivo.

---

## Personalización / Customization

- Modifica los textos en los componentes para agregar más idiomas o ajustar el contenido.
- Agrega tus propios assets en la carpeta `/assets`.
- Integra backend o APIs según tus necesidades.

---

## Créditos / Credits

Desarrollado por Edwin Valencia [winvale](https://github.com/winvale).

---

## Licencia / License

MIT
