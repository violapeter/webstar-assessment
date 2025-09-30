# WebStar API Client

A TypeScript HTTP client for communicating with the WebStar backend API. Provides type-safe methods for authentication, character management, and combat simulation.

## Overview

The WebStar API Client handles all communication with the backend services required for the WebStar Frontend recruitment assignment. It provides a clean, type-safe interface for authentication, character data retrieval, and combat simulation features.

## Configuration

To use the client, you will need your:
- API URL
- Applicant-Id

You can initialize the client like this:

```typescript
import { WebStarApiClient } from "api-client"

export const apiClient = new WebStarApiClient(
  'https://my-webstar-url/rest/my-api/v2/',
  'applicantID',
)
```
