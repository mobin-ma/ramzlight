# RamzLight - Cryptocurrency Exchange Platform

A modern and comprehensive platform for managing and displaying cryptocurrency information, built with Next.js 16 and React 19.

## Key Features

- 🔐 **Complete Authentication System** with cookie management and Redux
- 📰 **Article Management** with infinite scroll capability
- 🎨 **Modern UI Interface** with Tailwind CSS
- 📱 **Responsive Design** for all devices
- ⚡ **Performance Optimization** with React Compiler
- 🌐 **Persian Date Support** with moment-jalaali
- 🔄 **Advanced State Management** with Redux Toolkit

## Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework
- **React 19.2.3** - UI library
- **TypeScript** - For type safety
- **Tailwind CSS 4** - For styling
- **React Icons** - Icon library

### State Management
- **Redux Toolkit** - State management
- **React Redux** - Redux React bindings

### HTTP Client & Utils
- **Axios** - HTTP client
- **Moment.js & Moment Jalaali** - Date management

### Development Tools
- **ESLint** - Code quality control
- **React Compiler** - Performance optimization

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Main layout
│   └── page.tsx           # Home page
├── components/            # UI Components
│   ├── articles/          # Article components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   └── ui/                # General UI components
├── config/                # Project configuration
│   └── auth.ts           # Authentication config
├── features/              # Redux slices and services
│   ├── articles/          # Articles management
│   └── auth/              # Authentication management
├── hooks/                 # Custom hooks
│   └── useAuth.ts        # Authentication hook
├── services/              # HTTP services
│   ├── axios.ts          # Axios configuration
│   └── endpoints.ts      # API endpoints
└── store/                 # Redux store
    ├── hooks.ts          # Typed hooks
    ├── ReduxProvider.tsx # Provider component
    └── store.ts          # Store configuration
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository:**
```bash
git clone [repository-url]
cd ramzlight
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Run development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser:**
The project will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev      # Run development server
npm run build    # Build production version
npm run start    # Run production version
npm run lint     # Check code quality
```

## Implemented Features

### Authentication System
- Login with username/password
- Session management with cookies
- Protected route guards
- Secure logout functionality

### Article Management
- Article list display
- Article details view
- Infinite scroll for loading more content
- State management with Redux

### User Interface
- Header with menu and profile
- Configurable sidebar
- Loading components
- Advanced search functionality

## Project Configuration

### Authentication
Authentication settings can be modified in `src/config/auth.ts`:
- Cookie name
- Expiration time
- Authentication token

### API Endpoints
API addresses are defined in `src/services/endpoints.ts`.

## Contributing

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## License

This project is released under the MIT License.

## Support

For bug reports or feature requests, please use the Issues section.
