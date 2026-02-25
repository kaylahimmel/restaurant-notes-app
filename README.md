# Restaurant Notes

A React app for saving and reviewing restaurant visits.

## Tech Stack

- **React 19** with TypeScript
- **Vite** — build tool and dev server
- **TanStack Router** — client-side routing
- **Firebase** — authentication
- **MUI (Material UI)** — component library
- **SCSS Modules** — component styles
- **Jest** + **React Testing Library** — unit tests

## Getting Started

Install dependencies:

```bash
npm install
```

Set up environment variables by creating a `.env` file at the project root:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
