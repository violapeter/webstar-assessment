# WebStar Assessment - Star Wars Character Management System

An unnecessarily sophisticated solution to the Webstar frontend assessment, featuring a modular, enterprise-grade architecture for managing Star Wars characters.

## 🚀 Project Overview

This project demonstrates advanced React/TypeScript patterns including Clean Architecture, MVP (Model-View-Presenter) pattern, and monorepo structure. Built as a comprehensive character management system set in the Star Wars universe.

## 🏗️ Architecture

The project follows a **modular monorepo architecture** with a clear separation of concerns:

```
webstar-assessment/
├── modules/           # Reusable packages
├── features/          # Business logic & domain features
├── development/       # Development tooling
└── README.md          # This file
```

### Core Principles

- **Clean Architecture**: Clear separation between domain, presentation, and infrastructure layers
- **MVP Pattern**: Model-View-Presenter for predictable state management
- **Domain-Driven Design**: Features organized by business domain
- **Type Safety**: Comprehensive TypeScript coverage

## 📦 Module Structure

```
├── features/                   # Business domain features
│   ├── LoginForm/              # Authentication feature
│   ├── User/                   # User profile management
│   ├── CharacterChooser/       # Character selection
│   ├── CharacterEditor/        # Character CRUD operations
│   └── Gateways/               # External service integration
├── modules/
│   ├── cornerstone/           # Core MVP framework
│   ├── cornerstone-react/     # React integration
│   ├── types/                 # Shared TypeScript definitions
│   ├── api-client/            # WebStar API client
│   ├── ui-library/            # Design system components
│   ├── ui-react/              # Business-specific components
│   ├── classnames/            # CSS utility
│   └── web/                   # Next.js application
└── development/
    └── prettier-config/       # Code formatting configuration
```

### Business Features

| Feature | Purpose | Components |
|---------|---------|------------|
| **LoginForm** | User authentication | Repository, Presenter, validation logic |
| **User** | User profile management | User state, logout functionality |
| **CharacterChooser** | Character selection interface | Navigation, character display |
| **CharacterEditor** | Character CRUD operations | Create, edit, duplicate, delete characters |

## 🛠️ Technology Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: SCSS Modules, CSS-in-JS
- **State Management**: Custom MVP pattern with Observables
- **Testing**: Jest, React Testing Library
- **Build Tools**: Next.js, TypeScript compiler
- **Package Management**: npm workspaces

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
# Install dependencies for all workspaces
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
# Development
npm run dev          # Start Next.js development server

# Testing
npm test             # Run all tests across workspaces
npm test -w features # Run tests for specific workspace
```

## 📝 License

This project is created as part of a technical assessment.

## 👨‍💻 Author

**Peter Viola**
- Email: info@violapeter.hu
- Website: https://violapeter.hu

---

*"Do or do not, there is no try." - Master Yoda*
