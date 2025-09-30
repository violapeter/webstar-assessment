# Web Application

The main Next.js application for the project. This is the entry point that brings together all modules and features to create the complete Star Wars character management system.

## Overview

The Web module is a Next.js 14 application that serves as the main user interface for the WebStar system. It integrates all other modules (cornerstone, ui-library, features, etc.) to provide a complete character management experience.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 8 or later

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open https://localhost:3000
```

### Environment Variables

Create a `.env` file in the web module root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.webstar.example.com
NEXT_PUBLIC_APPLICANT_ID=your-applicant-id
```