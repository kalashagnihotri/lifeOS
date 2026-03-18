# Project Guidelines

## Architecture
- Treat this workspace as the LifeOS product scaffold.
- Follow a feature-based modular structure:
  - `core/` for global theme, constants, and pure utilities
  - `features/` for isolated domains (tasks, habits, focus, mood, notes, analytics, ai insights)
  - `shared/` for reusable UI primitives and shared hooks/helpers
  - `services/` for API and external data access
  - `layouts/` for structural shell components
  - `pages/` for route-level composition
- Keep boundaries strict: no direct API calls from UI components.

## Conventions
- Build systems, not isolated features; each addition should fit the overall LifeOS model.
- Prefer clarity over cleverness: explicit, readable code and simple control flow.
- Use composition and single responsibility; split mixed concerns into components, hooks, services, or utilities.
- Centralize repeated values (theme tokens, spacing, constants) instead of hardcoding.
- Keep state local by default; lift or globalize only when needed.
- Naming: `PascalCase` for components, `camelCase` for functions/variables, descriptive names over abbreviations.

## Build and Test
- Build and test tooling is not initialized in this workspace yet.
- If a task introduces runtime/build/test tooling, add and document runnable commands in project docs.

## Source Of Truth
- See `instructions.md` for the full product vision and engineering philosophy.