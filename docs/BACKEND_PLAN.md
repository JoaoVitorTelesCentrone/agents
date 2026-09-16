# Backend implementation plan

This branch will make the dark Watermelon-based UI functional end to end.

## Stack
- Next.js App Router
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Supabase pgvector / embeddings where applicable
- Server Actions / Route Handlers
- AI provider abstraction for OpenAI, Gemini and DeepSeek-compatible APIs
- Billing abstraction (Stripe-first; provider can be swapped)

## Domains
1. Authentication and onboarding
2. Organizations / workspaces
3. Memberships, roles and RLS
4. Projects
5. Agents
6. Agent runs and messages
7. Tools / provider credentials
8. Knowledge documents, chunks and retrieval
9. Inbox events and approvals
10. Usage and credits
11. Billing subscriptions
12. Audit log / observability

## Delivery rule
The branch should not depend on fake application data when complete. External services must be isolated behind environment variables and adapters so the remaining setup is connecting accounts/projects and adding keys/secrets.
