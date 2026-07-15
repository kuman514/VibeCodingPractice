# Project Architecture Rules

## Hexagonal Architecture

This project follows the Hexagonal (Ports & Adapters) architecture.

### Folder Structure
- `src/domain/models/` — Core data types and business entities
- `src/domain/services/` — Business logic (pure functions, no external dependencies)
- `src/ports/` — Interface definitions (contracts for domain to communicate with the outside)
- `src/adapters/api/` — External API calls, data fetching implementations
- `src/adapters/ui/` — Reusable UI components
- `src/app/` — Next.js App Router pages and routing

### Rules
1. Code in the domain folder must not depend on external libraries or frameworks
2. Define interfaces in ports first, then implement in adapters
3. Keep page components in app thin; write logic in domain/services
4. File names: kebab-case, types/interfaces: PascalCase, variables/functions: camelCase
5. Use TypeScript strict mode, no any type
