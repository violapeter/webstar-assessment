# Classnames Utility

A lightweight utility for conditionally joining CSS class names. Provides type-safe, efficient class name composition for React components.

## Overview

The Classnames utility simplifies conditional CSS class composition, making it easy to apply styles based on component state, props, or other conditions. It's particularly useful when working with CSS modules and dynamic styling.

## Basic Usage

```ts
import { classNames } from 'classnames'

// Simple class joining
const className1 = classNames('btn', 'btn-primary')
// Result: 'btn btn-primary'

// Conditional classes
const className2 = classNames(
  'btn',
  {
    'btn-primary': isPrimary,
    'btn-disabled': isDisabled,
    'btn-loading': isLoading
  }
)
```