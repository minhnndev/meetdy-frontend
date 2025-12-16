# Meetdy Frontend

## Overview
A React TypeScript frontend application built with Vite. This is a comprehensive platform for managing information, work, and personnel.

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS, SASS
- **UI Libraries**: Radix UI, Ant Design, Semi UI
- **State Management**: Redux Toolkit, React Query
- **Routing**: React Router DOM
- **Internationalization**: i18next
- **Form Handling**: React Hook Form, Formik

## Project Structure
```
src/
├── api/          # API service layer
├── app/          # App-level components
├── assets/       # Static assets
├── components/   # Reusable UI components
├── config/       # Configuration files
├── constants/    # Application constants
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization setup
├── lib/          # Utility libraries
├── models/       # TypeScript models/types
├── queries/      # React Query hooks
├── redux/        # Redux store and slices
├── routes/       # Route definitions
├── styles/       # Global styles
└── utils/        # Utility functions
```

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` for production build
- Run `npm run lint` for linting

## External Dependencies
- Backend API: https://api.meetdy.com/
- Google reCAPTCHA integration

## Recent Changes
- December 16, 2025: Initial Replit setup
  - Configured Vite to use port 5000 with `allowedHosts: true` for Replit proxy
  - Set host to `0.0.0.0` for external access
