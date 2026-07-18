# Project Architecture Rules

## Hexagonal Architecture

This project follows the Hexagonal (Ports & Adapters) architecture.

### Folder Structure

- `src/domain/models/` — Core data types and business entities
- `src/domain/services/` — Business logic (pure functions, no external dependencies)
- `src/ports/` — Interface definitions (contracts for domain to communicate with the outside)
- `src/adapters/api/` — External API calls, data fetching implementations
- `src/adapters/ui/` — Reusable UI components
- `src/main.tsx` — Vite entry point (mounts the root component)
- `src/App.tsx` — Root component, composes adapters/ui components

### Rules

1. Code in the domain folder must not depend on external libraries or frameworks
2. Define interfaces in ports first, then implement in adapters
3. Keep App.tsx thin; write logic in domain/services
4. File names: kebab-case, types/interfaces: PascalCase, variables/functions: camelCase
5. Use TypeScript strict mode, no any type
6. Prefer switch-case to if-else when multiple branches are split on one primitive variable.
7. Strings in markups like JSX: double-quote, ones in elsewhere in JavaScript/TypeScript files: single-quote
8. Always use Block Statement for if-else.
9. Specify expected types in `<...>` if generic, especially `useState`.
