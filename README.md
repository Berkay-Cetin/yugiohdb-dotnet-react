# YugiohDB — .NET + React

A full-stack Yu-Gi-Oh! card search application built with .NET and React TypeScript.

![Tech Stack](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat&logo=dotnet)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)

## Features

- 🔍 Search cards by **name** and **card text**
- 🎛️ Filter by **Type**, **Race**, **Attribute**
- ⚔️ Advanced filters — **ATK**, **DEF**, **Level**, **Link**, **Scale** ranges
- 📊 Sort by **Name**, **ATK**, **DEF**, **Level / Rank**, **Link**, **TCG Date**, **OCG Date**
- 🃏 Card detail modal with full card info
- 🌀 **Pendulum** card support — separate Pendulum & Monster effect texts
- 📅 **TCG & OCG** release dates
- ✨ Dark Yu-Gi-Oh themed UI

## Tech Stack

### Backend
- **.NET 8** / C#
- **Clean Architecture** — API, Application, Domain, Infrastructure layers
- **YGOPRODeck API** — [https://ygoprodeck.com/api-guide/](https://ygoprodeck.com/api-guide/)

### Frontend
- **React 18** + **TypeScript**
- **Vite** — build tool
- **CSS Variables** — custom dark theme
- **Google Fonts** — Cinzel & Crimson Pro

## Project Structure
```
yugiohdb-dotnet-react/
├── Yugioh.API/              # Controllers
├── Yugioh.Application/      # Use cases
├── Yugioh.Domain/           # Entities (Card, CardImage, MiscInfo)
├── Yugioh.Infrastructure/   # YgoApiClient
└── yugioh-ui/               # React frontend
    ├── src/
    │   ├── api/             # API calls
    │   ├── components/      # SearchPanel, CardGrid, CardModal
    │   ├── hooks/           # useCardSearch
    │   └── types/           # TypeScript types & constants
```

## API Endpoints

| Method | Endpoint | Parameters |
|--------|----------|------------|
| GET | `/api/cards` | `name`, `type`, `race`, `attribute`, `atkMin`, `atkMax`, `defMin`, `defMax`, `levelMin`, `levelMax`, `linkval`, `scaleMin`, `scaleMax` |

## Data Source & Credits

Card data provided by **YGOPRODeck** — a free and open Yu-Gi-Oh! database API.

- 🌐 Website: [ygoprodeck.com](https://ygoprodeck.com)
- 📖 API Documentation: [ygoprodeck.com/api-guide](https://ygoprodeck.com/api-guide/)
- 🗄️ API Endpoint: `https://db.ygoprodeck.com/api/v7/cardinfo.php`

Card images and data are the property of **Konami Digital Entertainment**.  
This project is not affiliated with or endorsed by Konami.

> Yu-Gi-Oh! is a trademark of Kazuki Takahashi and Konami.