# 🚀 BlokPilot for Storyblok

> **AI-first Next.js 15 demo** that turns content creation into a data-driven workflow for Storyblok.  
> Orchestrate world-class content with predictive insights, automated testing, and localization—at startup speed.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![Storyblok](https://img.shields.io/badge/CMS-Storyblok-1A1A1A?logo=storyblok)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![MIT License](https://img.shields.io/badge/License-MIT-green)

---

> Made by Deepak

## 🎯 Key Features

### 🧠 Predictive Content Intelligence
Forecast CTR, engagement, and conversion rates before publishing. Get persona-specific scores and actionable recommendations.

### 🚀 Content Autopilot  
Generate 3 AI variants, run live A/B tests with real-time analytics, and deploy winning content automatically.

### 🎨 AI Design System Generator
Create design tokens and export ready-to-use React/Tailwind components with one click.

### 🌍 Multilingual Localizer
Translate content with cultural awareness, quality scoring, and persona adaptation across 9+ locales.

### 🏷️ Brand Identity Kit
Generate complete brand kits with colors, typography, and SVG logo concepts.

### 🛠️ Storyblok Toolkit
List stories, edit content, and bulk publish with management API integration.

## 🛠️ Tech Stack

**Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Radix UI

**AI & Search**: Google Gemini, Algolia (with CDN fallback)

**CMS**: Storyblok (CDN + Management API)

**Deployment**: Vercel-ready with optimized build config

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/deepakm0003/BlokPilot.git
cd BlokPilot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=your_preview_token
STORYBLOK_MANAGEMENT_TOKEN=your_management_token
NEXT_PUBLIC_STORYBLOK_SPACE_ID=your_space_id
NEXT_PUBLIC_STORYBLOK_REGION=eu
```

4. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📸 Screenshots

### 🏠 Hero Section
![Hero](docs/screenshots/hero.png)
*Clean, professional landing with animated hero section*

### 🧠 Predictive Content Intelligence
![Predictive](docs/screenshots/predictive.png)
*Analyze content performance before publishing with AI-powered insights*

### 🤖 AI Assistant
![Assistant](docs/screenshots/assistant.png)
*Generate taglines, summaries, and content ideas with Gemini AI*

### 🛠️ Storyblok Toolkit
![Toolkit](docs/screenshots/toolkit.png)
*Manage stories, bulk publish, and track deployment status*

### 🎨 Design System Generator
![Design System](docs/screenshots/design-system.png)
*Create design tokens and export React components*

### 🌍 Multilingual Localizer
![Localizer](docs/screenshots/localizer.png)
*Translate content with cultural adaptation and quality scoring*

### 🏷️ Brand Identity Generator
![Brand](docs/screenshots/brand-identity.png)
*Generate complete brand kits with SVG logo concepts*

### 🚀 Content Autopilot
![Autopilot](docs/screenshots/autopilot.png)
*Run A/B tests with real-time analytics and deploy winners*

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Storyblok Setup
1. Create a story with slug `home` in your Storyblok space
2. Add any content blocks (the app will render them)
3. Use the Toolkit to manage stories and publish content

### API Endpoints
- `POST /api/ai` - AI content generation with Gemini
- `POST /api/storyblok/list` - List stories from space
- `POST /api/storyblok/write` - Create/update stories
- `POST /api/storyblok/publish` - Publish stories
- `GET /api/search` - Content search with Algolia/CDN fallback

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

The repository includes `vercel.json` with optimized build settings and dependency resolution.

### Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=your_preview_token
STORYBLOK_MANAGEMENT_TOKEN=your_management_token
NEXT_PUBLIC_STORYBLOK_SPACE_ID=your_space_id
NEXT_PUBLIC_STORYBLOK_REGION=eu
```

## 🔒 Security

- Never commit API keys to version control
- Use `.env.local` for local development
- Rotate API keys regularly
- Review Storyblok token permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Storyblok](https://www.storyblok.com/) for the amazing headless CMS
- [Google Gemini](https://ai.google.dev/) for powerful AI capabilities
- [Algolia](https://www.algolia.com/) for search infrastructure
- [Vercel](https://vercel.com/) for seamless deployment

---

<div align="center">
  <strong>Made with ❤️ by Deepak</strong>
</div>