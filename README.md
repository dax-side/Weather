# Modern Weather App

A stunning, futuristic weather application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features breathtaking animations, advanced glassmorphism design, and real-time weather data that will make you go "WOW!"

## Features

- **Stunning Single Theme** - A gorgeous cosmic gradient theme with floating orbs and particle effects
- **Advanced Glassmorphism UI** - Beautiful translucent design with multi-layer backdrop blur effects
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Real-time Weather Data** - Comprehensive weather information with beautiful data visualization
- **Smart Search** - Search any city worldwide with smooth animations
- **Local Storage** - Remembers your last searched city and preferences
- **Cinematic Animations** - Powered by Framer Motion for movie-like visual effects
- **Secure API** - Weather API key hidden on server-side routes for maximum security
- **Floating Particles** - Dynamic particle system creates an immersive atmosphere
- **Interactive Elements** - Hover effects and micro-interactions throughout the app

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Weather API:** OpenWeatherMap
- **State Management:** React Context + useReducer
- **Design System:** Custom CSS variables with modern color palette

## Quick Start

```bash
# Clone the repository
git clone https://github.com/dax-side/Weather.git
cd Weather/modern-weather

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to experience the magic.

## Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variable: `OPENWEATHER_API_KEY=your_api_key`
5. Deploy and witness the magic!

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add your API key in Vercel dashboard

## Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

## Project Structure

```
modern-weather/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes (weather, forecast)
│   │   ├── globals.css     # Global styles with cosmic theme
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components
│   │   ├── weather/       # Weather-specific components
│   │   └── weather-app.tsx # Main app component
│   ├── contexts/          # React contexts
│   │   └── WeatherContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useGeolocation.ts
│   │   ├── useLocalStorage.ts
│   │   └── useWeather.ts
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   └── types/             # TypeScript type definitions
│       └── weather.ts
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Design Highlights

- **Cosmic Gradient Background:** Animated multi-color gradient that shifts like a living aurora
- **Advanced Glassmorphism:** Multi-layered translucent effects with perfect backdrop blur
- **Floating Orb System:** Dynamic colored orbs that float and pulse in the background
- **Particle Animation:** Floating particles that create an immersive atmosphere
- **Cinematic Transitions:** Movie-quality animations and micro-interactions
- **Sparkle Effects:** Animated sparkles that add magical touches
- **Interactive Elements:** Hover effects that respond to user interaction
- **Professional Typography:** Elegant font hierarchy with gradient text effects

## Visual Features That Make You Go "WOW!"

- **Animated Background:** Constantly shifting gradient background with 15-second cycles
- **3D Floating Orbs:** Multiple animated orbs with different colors and movement patterns
- **Particle System:** 20 floating particles with randomized animations
- **Glass Morphism Cards:** Professional translucent cards with perfect blur effects
- **Staggered Animations:** Elements appear with carefully timed delays
- **Weather Card Expansion:** Large weather cards with comprehensive data visualization
- **Icon Animations:** Weather icons that float and pulse with life
- **Interactive Sparkles:** Rotating sparkle icons that catch the eye
- **Smooth Transitions:** Every interaction feels smooth and professional

## What's New in Modern Version

**Transformed from vanilla HTML/CSS/JS to a stunning futuristic experience:**
- Next.js 15 with React Server Components
- Server-side API routes for security
- Mobile-first responsive design
- Single gorgeous cosmic theme
- Persistent user preferences
- Professional UI component library
- TypeScript for better development experience
- Advanced animation system
- Particle effects and floating elements

## License

MIT License - feel free to use this project for learning or personal use!

## Contributing

This is a personal side project, but suggestions and feedback are always welcome!

---

**Live Demo:** [https://dax-side.netlify.app/](https://daxweather.netlify.app/)

Built with love by [dax-side](https://github.com/dax-side)
