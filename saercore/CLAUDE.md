# CLAUDE.md - Saercore Project Guidelines

## Build & Development Commands
- `bun install` - Install dependencies
- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Fix linting errors automatically
- `bun run format` - Format code with Prettier
- `bun run check` - Type check with TypeScript (no emit)
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run migrations
- `bun run db:studio` - Launch Drizzle Studio

## Code Style Guidelines
- **Formatting**: Single quotes, semicolons, 2 spaces, 100 chars line length
- **Imports**: Use ES modules, group imports (external → internal)
- **Types**: Prefer strict typing, enable TypeScript strict mode
- **Error Handling**: Use typed errors and early returns
- **Naming**: camelCase for variables/functions, PascalCase for types/classes
- **Components**: Prefer functional components with explicit return types
- **API Routes**: Use Hono for API endpoints with consistent response format
- **Database**: Use Drizzle ORM with explicit schemas and migrations