# Storyblok x Code & Coffee Hackathon 2025 – SBX-CC

Premium white-theme Next.js app featuring:

- Storyblok integration with live preview and component mapping
- Algolia AI-powered search with optional OpenAI re-ranking
- AI assistant for content authoring
- Accessibility checker for creators

## Quick start

Fill `.env.local` with:

```
STORYBLOK_ACCESS_TOKEN=
NEXT_PUBLIC_STORYBLOK_SPACE_ID=
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=
ALGOLIA_ADMIN_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Run the app:

```
npm run dev
```

## Storyblok
- Create `home` story (slug `home`) and add `feature_list` blocks
- Enable preview

## Search
- Create Algolia index `stories` and push records
- Optional: OpenAI key enables semantic re-ranking via `/api/search`

## AI Assistant
- POST `/api/ai` with `{ prompt }` or use the homepage panel
- Uses Google Gemini (free tier) - add `GEMINI_API_KEY` to `.env.local`

## Accessibility
- Basic checker in the UI; extend with more rules
