# Agents OS

Dark-only AI operations workspace inspired by the interaction patterns of Linear and Watermelon UI.

## Product surfaces

- Overview
- Inbox / approval queue
- Agents directory
- Agent creation
- Agent detail + chat
- Runs / execution history
- Projects
- Knowledge base
- Members
- Settings / providers / integrations / billing

## Stack

- Next.js 15
- TypeScript
- React 19
- Lucide icons
- Watermelon UI-inspired dark interface

## Branch strategy

- `main`: stable integration branch
- `feat/initial-mvp`: complete UI foundation
- `feat/backend`: backend implementation branched from the UI foundation

## Backend plan

The backend branch will wire Supabase Auth/Postgres/Storage, multi-workspace access, persisted agents, runs, chat, knowledge ingestion, provider adapters, inbox approvals, usage and billing. Secrets will be provided through environment variables and never committed.

## Environment contract (backend phase)

A `.env.example` will document every external switch required to run the product. The goal is that deployment requires configuration, not source-code edits.

## Third-party notices

See `THIRD_PARTY_NOTICES.md` for Watermelon UI attribution.
