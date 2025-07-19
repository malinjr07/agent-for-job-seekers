# Project Structure

For managing the project in a more concise way, we should create file in these folders in given structure:

## Files and Folders Structure

- `public`
- `src`
  - `pages`
  - `components`
    - `core`
    - `common`
    - `layouts`
    - `shadCn`
  - `styles`
  - `utils`
    - `hooks`
    - `lib`
    - `services`
    - `store`
    - `types`

## Detailed Explanation

Following is a detailed overview of each folder and its contents:

### Components

This folder contains reusable UI components used throughout the application. It has three folders:

#### &nbsp; Core

The `core` folder contains the unbreakable components such as buttons, inputs, svg icons etc.

#### &nbsp; Common

The `common` folder contains common components that combine multiple core components. These are shared across different
layouts in the application. Examples include various types of cards, dropdowns, tabs, accordions, and modals.

#### &nbsp; Layouts

The `layouts` folder contains components that define the structure of pages. These components often include headers,
footers, or sidebars and are used across multiple pages. Layout components are usually made up of multiple common and
core components.

#### &nbsp; ShadCn

The `shadCn` folder contains components that are used throughout the application. These components are used to create a consistent look and feel across the application. Components that are being created via `shadcn` cli are stored in this folder.

### Pages

The `pages` folder contains the main pages of the application. Each folder in this `pages` folder represents a route in the application. The structure of the `pages` folder follows the [`Official Next.js Project Structure and Organization`](https://nextjs.org/docs/pages/getting-started/project-structure).

#### &nbsp; Example

Here is an example of a simple page component:

```javascript
// filepath: /path/to/pages/Home.js
import { NextPage } from 'next';
import React from 'react';
import Header from '@layouts/Header';
import Footer from '@layouts/Footer';
import MainContent from '@common/MainContent';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;
```

### Styles

The `styles` folder contains global styles, theme definitions, and any other styling-related code. This includes CSS,
SCSS, or styled-components files that define the look and feel of the application. It helps maintain a consistent design
system across the entire project.

### Utils

The `utils` folder contains utility functions and helpers that are used throughout the application.

#### &nbsp; Hooks

The `hooks` folder contains custom React hooks that encapsulate reusable logic and state management.

#### &nbsp; Lib

The `lib` folder contains utility functions, helpers, or any other code that doesn't fit into the other categories but
is still shared across the application.

#### &nbsp; Services

The `services` folder contains code related to making API calls, handling authentication, or any other service-related
logic.

#### &nbsp; Store

The `store` folder contains code related to state management in the application using Zustand.

#### &nbsp; &nbsp; Structure

- **Store Configuration**: Set up and configure the Zustand store.
- **Slices**: Organize state into logical slices for better modularity and maintainability.

#### &nbsp; &nbsp; Example

Here is an example of how to set up a Zustand store:

```javascript
// filepath: /path/to/store/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  // Define your state and actions here
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
```

#### &nbsp; Types

The `types` folder contains TypeScript type definitions and interfaces used throughout the application. This helps in
maintaining type safety and consistency across the codebase. By defining types in a centralized location, it becomes
easier to manage and update them as the application evolves.

#### &nbsp; Example

Here is an example of a simple type definition:

```typescript
// filepath: /path/to/types/index.d.ts
export interface User {
  id: number;
  name: string;
  email: string;
}
```

These type definitions can then be imported and used in various parts of the application to ensure that the data
structures are consistent and type-safe.
