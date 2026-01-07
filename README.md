# RamzLight - Crypto News Platform

A modern and professional platform for displaying and managing crypto news, built with Next.js 16 and React 19.

## 🚀 Key Features

- 🔐 **Complete Authentication System** with cookie management and Redux
- 📰 **Article Management** with infinite scroll capability
- 🎨 **Modern UI** with Tailwind CSS
- 📱 **Fully Responsive Design** for all devices
- ⚡ **Performance Optimization** with React Compiler
- 🌐 **Persian Date Support** with moment-jalaali
- 🔄 **Advanced State Management** with Redux Toolkit
- 🛡️ **Error Boundary** for error handling
- 🏗️ **Professional Architecture** with feature-based structure
- 🎯 **Mobile-First Design** with drawer navigation
- ✨ **Glassmorphism Effects** with blur backgrounds
- 🎮 **Interactive Components** with active states

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework
- **React 19.2.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React Icons** - Icon library

### State Management
- **Redux Toolkit** - State management
- **React Redux** - Redux-React integration

### HTTP Client & Tools
- **Axios** - HTTP client
- **Moment.js & Moment Jalaali** - Date management

### Development Tools
- **ESLint** - Code quality control
- **React Compiler** - Performance optimization

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # UI Components
│   ├── layout/            # Layout components
│   │   ├── Header.tsx     # Responsive header
│   │   ├── Sidebar.tsx    # Adaptive sidebar
│   │   ├── PageLayout.tsx # Reusable page layout
│   │   └── index.ts       # Central exports
│   └── ErrorBoundary.tsx  # Error handling
├── config/                # Project configuration
│   └── auth.ts           # Authentication config
├── constants/             # Application constants
│   └── index.ts          # API settings, error messages
├── features/              # Feature-based modules
│   ├── articles/          # Article management
│   │   ├── components/    # Article components
│   │   │   ├── ArticlesList.tsx    # Responsive article list
│   │   │   ├── MainArticle.tsx     # Responsive article view
│   │   │   └── index.ts
│   │   ├── articlesSlice.ts
│   │   ├── articlesServices.ts
│   │   ├── selectors.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── auth/              # Authentication management
│       ├── components/    # Auth components
│       │   ├── AuthGuard.tsx
│       │   ├── LoginPage.tsx
│       │   └── index.ts
│       ├── authSlice.ts
│       ├── auth.services.ts
│       ├── auth.selectors.ts
│       ├── types.ts
│       └── index.ts
├── services/              # HTTP Services
│   ├── axios.ts          # Axios configuration
│   ├── endpoints.ts      # API endpoints
│   └── cookieService.ts  # Cookie management
├── shared/                # Shared resources
│   ├── hooks/            # Shared hooks
│   │   ├── hooks.ts      # Redux hooks + useAuth
│   │   ├── useResponsive.ts # Responsive hook
│   │   └── index.ts
│   └── ui/               # Shared UI components
│       ├── Loading.tsx
│       ├── Logo.tsx           # Responsive logo
│       ├── SearchBox.tsx      # Responsive search
│       ├── MenuHeader.tsx     # Interactive menu
│       ├── ProfileHeader.tsx  # Responsive profile
│       ├── MobileMenu.tsx     # Mobile hamburger menu
│       ├── SidebarDrawer.tsx  # Drawer sidebar
│       ├── QuickActions.tsx   # Mobile quick actions
│       └── index.ts
├── store/                 # Redux store
│   ├── ReduxProvider.tsx # Provider component
│   └── store.ts          # Store configuration
├── types/                 # Global types
│   └── global.ts         # Shared type definitions
└── utils/                 # Utility functions
    └── dateUtils.ts      # Date utilities
```

## 📱 Responsive Design System

### 🎯 Responsive Hook (`useResponsive`)
Real-time screen size detection with standard Tailwind breakpoints:

```tsx
import { useResponsive } from '@/shared/hooks';

function MyComponent() {
  const { isMobile, isTablet, isDesktop, windowSize } = useResponsive();
  
  return (
    <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
}
```

### 📐 Breakpoints
```css
sm: 640px   (Large mobile)
md: 768px   (Small tablet)  
lg: 1024px  (Large tablet)
xl: 1280px  (Desktop)
2xl: 1536px (Large desktop)
```

### 🎨 Responsive Components

#### **Header Component**
- **Desktop**: Grid layout with Logo, SearchBox, Menu, Profile
- **Mobile**: Flex layout with Logo, Profile, and Hamburger Menu
- **Tablet**: Hybrid approach with adaptive elements

#### **Mobile Menu System**
- **Hamburger Menu**: Smooth slide-in drawer from right (RTL support)
- **Blur Overlay**: Glassmorphism effect with backdrop-blur
- **Navigation**: Vertical menu layout with SearchBox integration
- **Keyboard Support**: Escape key to close, body scroll lock

#### **Sidebar Drawer System**
- **Desktop**: Fixed sidebar beside main content (320px width)
- **Mobile/Tablet**: Floating Action Button (FAB) with drawer
- **Animations**: Smooth slide transitions with opacity changes
- **Auto-close**: Automatically closes when screen size changes to desktop
- **Accessibility**: ARIA labels, keyboard navigation, screen reader friendly

#### **Component Adaptations**

**SearchBox**
```tsx
// Responsive sizing and styling
className={`
  ${isMobile ? 'py-3 pr-12 pl-3 text-base' : 'py-2 pr-10 pl-2 text-sm'} 
  focus:ring-2 focus:ring-amber-500/50
`}
```

**Logo**
```tsx
// Variable sizing: 100px (small) → 150px (desktop)
const width = isSmall ? 100 : isMobile ? 120 : 150;
const height = isSmall ? 57 : isMobile ? 69 : 86;
```

**MenuHeader**
- **Desktop**: Horizontal layout with hover effects
- **Mobile**: Vertical layout in drawer
- **Active States**: Interactive selection with `bg-amber-600`
- **State Management**: Click handling with `useState`

**ProfileHeader**
- **Mobile**: Larger dropdown (`min-w-[140px]` vs `min-w-[120px]`)
- **Touch Targets**: Bigger buttons (`px-3 py-2` vs `px-2 py-1`)
- **Enhanced Positioning**: Better dropdown placement

### 🎨 Glassmorphism Design System

#### **Blur Effects**
```css
/* Overlay backgrounds */
.overlay-blur {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

/* Drawer backgrounds */
.drawer-blur {
  background: rgba(25, 25, 33, 0.95);
  backdrop-filter: blur(16px);
}

/* Header/Footer sections */
.section-blur {
  background: rgba(23, 22, 28, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(31, 32, 37, 0.5);
}
```

#### **Z-Index Layers**
```css
z-30: Header (sticky navigation)
z-40: Sidebar Drawer (overlay & FAB)
z-45: Mobile Menu (overlay)
z-50: Mobile Menu (content)
```

#### **Enhanced Shadows**
```css
.drawer-shadow {
  box-shadow: 
    -10px 0 25px -5px rgba(0, 0, 0, 0.3),
    -4px 0 10px -2px rgba(0, 0, 0, 0.2);
}
```

### ⚡ Performance Optimizations

#### **Mobile-First Approach**
- Reduced blur intensity on mobile (12px vs 16px)
- Lighter animations for better battery life
- Touch-optimized interactions (44px minimum targets)
- GPU acceleration with `transform3d`

#### **Browser Compatibility**
```css
/* Webkit prefix for Safari */
-webkit-backdrop-filter: blur(16px);

/* Fallback for unsupported browsers */
@supports not (backdrop-filter: blur(1px)) {
  .backdrop-blur-lg {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
```

### 🎯 Design Principles

#### ✅ **Mobile-First Design**
- Progressive enhancement from mobile to desktop
- Touch-friendly interactions throughout
- Optimized for thumb navigation

#### ✅ **Accessibility Standards**
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios

#### ✅ **RTL Language Support**
- Complete right-to-left layout support
- Drawer animations from appropriate side
- Text alignment and spacing adjustments

#### ✅ **Performance Focus**
- Lazy loading for non-critical components
- Optimized re-renders with proper dependencies
- Memory management for event listeners
- Efficient state updates

## 🚀 Installation & Setup

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

3. **Setup environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Run development server:**
```bash
npm run dev
# or
yarn dev
```

5. **Open in browser:**
Project will be available at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
npm run dev      # Run development server with hot reload
npm run build    # Build optimized production bundle
npm run start    # Run production build locally
npm run lint     # Check code quality with ESLint
```

### Using Responsive Hook
```tsx
import { useResponsive } from '@/shared/hooks';

function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop, windowSize } = useResponsive();
  
  return (
    <div className={`
      ${isMobile ? 'flex-col p-4' : 'flex-row p-8'}
      ${isTablet ? 'gap-4' : 'gap-8'}
    `}>
      <h1 className={`
        ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}
      `}>
        Responsive Title
      </h1>
      
      {isMobile ? (
        <MobileSpecificComponent />
      ) : (
        <DesktopSpecificComponent />
      )}
    </div>
  );
}
```

### Creating Custom Drawers
```tsx
import { SidebarDrawer } from '@/shared/ui';

function CustomDrawer() {
  return (
    <SidebarDrawer title="Custom Drawer">
      <div className="p-4">
        <h3>Custom Content</h3>
        <p>Your drawer content here...</p>
      </div>
    </SidebarDrawer>
  );
}
```

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_API_TIMEOUT=10000

# Authentication
NEXT_PUBLIC_AUTH_COOKIE_NAME=auth_token
NEXT_PUBLIC_AUTH_COOKIE_EXPIRES=7

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=true
```

### Tailwind CSS Customization
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      colors: {
        primary: {
          50: '#fef7ee',
          // ... custom color palette
        }
      }
    }
  }
}
```

## 📊 Changelog

### Version 2.0.0 - Professional Redesign (2026-01-07)

#### 🔧 Critical Fixes
- **TypeScript Errors**: Fixed `tsconfig.json` configuration (module: node16)
- **JSX Errors**: Added proper imports and type definitions
- **MainArticle Issues**: Resolved 81 TypeScript errors
- **ESLint Warnings**: Removed unused variables and imports

#### 🏗️ Architecture Improvements
- **Feature-based Structure**: Organized code by features rather than file types
- **Central Index Files**: Created centralized exports for all components
- **Logic Separation**: Separated business logic from UI components
- **Modern Standards**: Following React/Next.js best practices

#### 📁 File Organization
- Restructured entire `src/` directory
- Created dedicated `features/` folder for main functionality
- Separated `shared/` resources from feature-specific code
- Implemented consistent naming conventions

#### 🔄 State Management Enhancements
- **Cookie Management**: Centralized `CookieService` for cookie operations
- **Code Deduplication**: Unified authentication logic
- **Error Handling**: Improved async thunk error management
- **Hook Migration**: Moved `useAuth` to shared hooks

#### 🛠️ New Tools & Utilities
- **DateUtils**: Centralized date management utilities
- **Constants**: Central configuration and constants management
- **Error Boundary**: React error handling component
- **Global Types**: Shared type definitions across the app

#### 📦 Import/Export Improvements
- **Central Exports**: Index files for all modules
- **Clean Imports**: Consistent use of named imports
- **Dependency Management**: Eliminated circular dependencies
- **Path Aliases**: Optimized use of `@` alias

#### 🎨 UI/UX Enhancements
- **Loading States**: Improved loading indicators
- **Error States**: Better error message display
- **Animation System**: Enhanced component animations
- **Responsive Design**: Complete mobile-first redesign

#### 📱 Responsive Features Added
- **useResponsive Hook**: Real-time screen size detection
- **Mobile Menu**: Hamburger menu with blur effects
- **Sidebar Drawer**: Floating action button with slide-out drawer
- **Glassmorphism**: Modern blur effects throughout UI
- **Touch Optimization**: 44px minimum touch targets
- **RTL Support**: Complete right-to-left language support

#### 🔧 Environment & Configuration
- **Environment Variables**: Comprehensive env var support
- **Config Management**: Centralized configuration system
- **API Configuration**: Unified API settings
- **Build Optimization**: Enhanced build process

#### 📚 Documentation
- **Enhanced README**: Complete English documentation
- **Code Comments**: Comprehensive code documentation
- **Type Documentation**: Detailed type definitions
- **Architecture Guide**: Complete project structure guide

#### 🧪 Code Quality
- **TypeScript Strict**: Enforced strict TypeScript standards
- **ESLint Clean**: Zero warnings and errors
- **Consistent Naming**: Standardized naming conventions
- **Code Deduplication**: Eliminated redundant code

#### 🚀 Performance
- **Bundle Optimization**: Reduced bundle size
- **Lazy Loading**: Implemented component lazy loading
- **Memory Management**: Improved memory usage
- **Render Optimization**: Minimized unnecessary re-renders

#### 🔒 Security
- **Cookie Security**: Enhanced cookie security measures
- **Input Validation**: Comprehensive input validation
- **Error Boundaries**: Safe error handling
- **Type Safety**: Complete type safety throughout app

### Version 1.0.0 - Initial Release
- Initial authentication system implementation
- Article management with infinite scroll
- Tailwind CSS user interface
- Redux state management
- Next.js 16 + React 19 foundation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use feature-based file organization
- Implement responsive design for all components
- Add proper error handling and loading states
- Include comprehensive tests for new features
- Follow accessibility standards (WCAG 2.1)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Redux Toolkit for simplified state management
- React Icons for the comprehensive icon library
- The open-source community for inspiration and tools

---

**Built with ❤️ for the crypto community**