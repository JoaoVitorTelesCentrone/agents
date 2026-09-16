# OriginKit UI direction

The product UI will use OriginKit as the motion/visual layer while keeping the operational dashboard restrained and readable.

## Selected OriginKit primitives

- `line-ripple-background`: subtle authenticated-shell/empty-state background.
- `reactive-lines`: optional contextual background for agent detail or onboarding.
- `text-wave`: restrained loading/processing state for long-running agent executions.
- `3d-stagger-flip`: marketing/onboarding headings only; not for dense dashboard copy.

## Product rules

1. Motion supports hierarchy; it never competes with data.
2. Dashboard surfaces stay neutral and high-contrast.
3. Animated OriginKit components are isolated to hero, empty, loading, onboarding, and agent-focus surfaces.
4. Respect reduced-motion behavior.
5. Components must be retrieved from OriginKit via its official CLI/MCP and committed as source; do not recreate or imitate proprietary component code.

## Authentication requirement

OriginKit requires a signed-in account to deliver component source through CLI/MCP. Once the OriginKit MCP is connected, retrieve the selected components for Next.js + TypeScript and integrate them into the app shell.
