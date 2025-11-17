# TODO List for Responsive Website Development

## Project Setup

- [X] Initialize Next.js project with TypeScript
- [X] Set up project structure and folders
- [x] Install necessary dependencies:
  - [x] Next.js
  - [x] TypeScript
  - [ ] Sentry (for crash errors)
  - [x] Jest/React Testing Library or Maestro
  - [ ] Cypress or Detox
  - [x] MaterialUI
  - [x] Supabase or AWS
- [x] Configure linting (ESLint + Prettier)

## UI Development

- [ ] Design and implement responsive layout using MaterialUI
- [x] Create reusable components (Button, Link, Input, Profile, Review, Image)
- [x] Implement navigation using Next.js file-based routing
- [x] Add navigation to home page

## State Management

- [ ] Set up local state management using Jotai or Zustand
- [ ] Implement global state for user authentication
- [ ] Manage state for maps and restaurant lists

## User Authentication

- [ ] Design and implement login and registration forms
- [ ] Set up authentication flow (login, logout, registration) using Supabase Auth or AWS Cognito
- [ ] Protect routes and components based on authentication status

## API Integration

- [ ] Integrate Google Maps API for displaying locations
- [ ] Fetch and display restaurant lists from Google Places API
- [ ] Handle API errors and loading states

## Database Integration

- [ ] Set up Supabase database for storing restaurant notes and user information
- [ ] Implement CRUD (Create, Read, Update, and Delete) operations for restaurant notes
- [ ] Ensure data security and privacy

## Testing

- [x] Set up Jest and React Testing Library
- [x] Write unit tests for components (Button, Link, Input, Profile, Review, Image)
- [ ] Implement integration tests for API calls using MSW (Mock Service Worker)
- [ ] Write end-to-end tests using Cypress or Detox
- [ ] Ensure 100% test coverage for critical components

## Final Touches

- [ ] Optimize performance and loading times
- [ ] Conduct user testing and gather feedback
- [ ] Fix bugs and polish UI/UX

## Deployment

- [x] Set up CI/CD pipeline using GitHub Actions
- [ ] Deploy application to production environment using GitHub Pages or Vercel or AWS
- [ ] Monitor and maintain the application post-deployment
