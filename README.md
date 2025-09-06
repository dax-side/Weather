# Modern Weather App

Weather app built with Next.js 15, TypeScript, and Tailwind CSS. Features a cosmic design with floating orbs and particle effects. Shows real-time weather data from OpenWeatherMap. Works on desktop, tablet, and mobile.

## Features

- Cosmic gradient theme with floating orbs and particles
- Glassmorphism UI with backdrop blur effects
- Responsive design for all screen sizes
- Real-time weather data with data visualization
- City search with smooth animations
- Local storage for user preferences
- Framer Motion animations
- Secure API integration
- Interactive elements with hover effects

## Tech Stack

- Framework: Next.js 15 with App Router
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI Components: Radix UI + shadcn/ui
- Animations: Framer Motion
- Icons: Lucide React
- Weather API: OpenWeatherMap
- State Management: React Context + useReducer
- Design System: Custom CSS variables

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

Open http://localhost:3000 to see the app.

## Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deployment

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variable: `OPENWEATHER_API_KEY=your_api_key`
5. Deploy the site

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

Get your API key from OpenWeatherMap.

## Project Structure

```
modern-weather/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components
│   │   ├── weather/       # Weather components
│   │   └── weather-app.tsx # Main app component
│   ├── contexts/          # React contexts
│   │   └── WeatherContext.tsx
│   ├── hooks/             # Custom hooks
│   │   ├── useGeolocation.ts
│   │   ├── useLocalStorage.ts
│   │   └── useWeather.ts
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   └── types/             # TypeScript types
│       └── weather.ts
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

## Design Details

- Animated gradient background that shifts colors
- Translucent design with backdrop blur
- Floating colored orbs with different patterns
- Particle system for atmosphere
- Smooth animations and transitions
- Sparkle effects on interactive elements
- Professional typography with gradient text
- Hover effects throughout the interface

## Visual Features

- Shifting gradient background with 15-second cycles
- Multiple animated orbs with different colors
- 20 floating particles with randomized movement
- Translucent cards with blur effects
- Staggered element animations
- Large weather cards with data visualization
- Animated weather icons
- Rotating sparkle icons
- Smooth interaction transitions

## Recent Updates

Changed from vanilla HTML/CSS/JS to Next.js 15 with React Server Components. Added server-side API routes. Made it mobile-first. Created single cosmic theme. Added user preference storage. Used professional UI components. Added TypeScript. Built advanced animation system. Included particle effects.

## License

MIT License. Use for learning or personal projects.

## Contributing

Personal project. Open to suggestions and feedback.

---

Live site: https://daxweather.netlify.app/

Built by dax-side
