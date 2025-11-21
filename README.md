# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🅿️ ParkInfy - Smart Campus Parking Management System

A modern React + TypeScript application for managing and booking parking spaces within the Infosys campus.

## ✨ Features

- **📊 Overview**: Real-time summary of all campus parking facilities
- **📈 Dashboard**: Zone-wise statistics with hourly predictions
- **🗺️ Parking Map**: Visual parking space layout with real-time status
- **📅 Bookings**: Multi-step booking flow for parking slots
- **📉 Analytics**: Charts and trends using ECharts
- **🔔 Notifications**: User alerts and preference management
- **⚙️ Settings**: Profile and preference management

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Application pages
├── services/       # API integration (RTK Query)
├── store/          # Redux state management
├── layouts/        # Page layouts
├── constants/      # Static values & configurations
└── assets/         # Images and icons
```

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Ant Design** - UI Components
- **Redux Toolkit** - State Management
- **RTK Query** - API Data Fetching
- **ECharts** - Data Visualization
- **React Router v7** - Navigation

## 📖 Documentation

For detailed documentation, see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)

### Key Sections
- Project Overview
- Detailed Page Features
- API Integration Guide
- Component Documentation
- Development Workflow
- Deployment Guide

## 🎯 Pages Overview

| Page | Route | Purpose |
|------|-------|---------|
| Overview | `/overview` | Summary of all parking facilities |
| Dashboard | `/dashboard` | Zone details with predictions |
| Parking Map | `/parking-map` | Visual parking layout |
| Bookings | `/bookings` | Multi-step booking flow |
| Analytics | `/analytics` | Charts and trends |
| Notifications | `/notifications` | User alerts |
| Settings | `/settings` | Profile & preferences |

## 🔧 API Integration

The application uses **RTK Query** for API data fetching with a custom base query for:
- Centralized API configuration
- Request/response logging
- Authentication handling
- Error management

### Example Usage

```typescript
import { useGetAllDCsQuery } from 'services/api/endpoints';

function MyComponent() {
  const { data: dcs, isLoading } = useGetAllDCsQuery();
  // Use data...
}
```

## 🎨 Customization

### Theme Colors
Edit `src/constants/Themes.ts` to customize:
```typescript
{
  primary: "#C4573B",    // Terracotta
  secondary: "#7C8D67",  // Sage
  // ... more colors
}
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route to `src/pages/appRoutes.tsx`
3. Add navigation in `src/components/NavBar.tsx`

## 🚀 Development

```bash
# Start dev server with HMR
npm run dev

# Run linter
npm run lint

# Build production
npm run build

# Preview production build
npm npm run preview
```

## 📦 Environment Variables

Create `.env`:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🔒 Security Features

- Type-safe TypeScript codebase
- API request logging for debugging
- Environment variable configuration
- Input validation on forms
- React's XSS protection

## 📊 State Management

**Redux Toolkit** with **RTK Query** for:
- Automatic API caching
- Request deduplication
- Optimistic updates
- Cache invalidation

## 🎯 Next Steps

1. Review [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) for detailed guide
2. Check `src/components/` for reusable components
3. See `src/services/api/endpoints.ts` for API endpoints
4. Explore pages in `src/pages/` for implementation examples

## 🐛 Debugging

All API calls logged in browser console:
```
[RTK Query] GET http://localhost:8080/api/...
[RTK Query] Response received: {...}
```

Use Redux DevTools extension for state inspection.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Ant Design Components](https://ant.design/components/overview/)
- [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [ECharts](https://echarts.apache.org/en/index.html)

## 📝 License

Proprietary & Confidential

## 👥 Team

Built for Infosys Campus Parking Management

---

**Happy Coding! 🚀**


You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
