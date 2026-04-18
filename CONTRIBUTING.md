# Contributing to Waypoint Starter

## Who Edits What

| Layer | Who edits | How |
|-------|-----------|-----|
| `data/*.yaml` | Team leads, any team member | Edit YAML, commit, rebuild |
| `content/*.md` | Anyone on the team | Markdown prose, no code needed |
| `src/components/` | Engineers | React/TypeScript components |
| `src/styles/tokens.css` | Design system owner | CSS custom properties |
| `src/styles/custom.css` | Private instance only | Overrides for your deployment |
| `docs/` | Anyone | Diataxis documentation |
| `scripts/` | Engineers | Automation and data pipelines |

## Adding Content

### Add a team member
Edit `data/team.yaml`. Follow the existing schema.

### Add a project
Edit `data/projects.yaml`. Set `track` to `idp` or `ongoing`.

### Add a capability
1. Add an entry to `data/capabilities/index.yaml`
2. Optionally create a detail file in `data/capabilities/`

### Add a partner
Edit `data/partners.yaml`. Follow the existing schema.

### Add a ritual
Edit `data/rituals.yaml`.

### Add a knowledge hub document
Edit `data/knowledge-hub/docs-registry.yaml`.

## Working with Claude Code

This repo includes a `CLAUDE.md` that provides full context to Claude Code sessions. When working with Claude:

1. Claude reads `CLAUDE.md` automatically
2. All decisions and patterns are documented there
3. If you need to change a decision, update `CLAUDE.md` first
4. Claude will follow the documented patterns for new code

## Code Conventions

- **No vendor lock-in** — Vercel AI SDK, Chat SDK, json-render belong in waypoint-demo only
- **Unicode icons only** — no lucide-react or other icon libraries
- **CSS custom properties** — extend `tokens.css`, never replace Tailwind defaults
- **YAML is the source of truth** — never duplicate data, always read from `data/`
- **TypeScript strict** — all types in `src/lib/types.ts`

## Design Tokens

Override design tokens in `src/styles/tokens.css`. For private instance customizations, use `src/styles/custom.css`.

## Deployment

See README.md for deployment options.
