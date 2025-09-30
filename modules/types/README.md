# Types

Shared TypeScript type definitions for the Webstar Assessment project.

## Overview

This module contains all the shared TypeScript interfaces and types used across the application. It serves as the single source of truth for domain models, ensuring type safety and consistency throughout the codebase.

## Type Definitions

### Character

Represents a Star Wars character with all their properties.

```typescript
export type Character = {
  id: string
  name: string
  side: Side
  properties: {
    power: string
    midichlorian: number
  }
  createdTimestamp: number
  description: string
}
```

### Side

Enumeration for Force alignment.

```typescript
export type Side = 'DARK' | 'LIGHT'
```

### User

Represents a user account in the system.

```typescript
export type User = {
  email: string
  firstName: string
  lastName: string
}
```
