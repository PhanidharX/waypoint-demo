# Waypoint Demo

Live demo of [Waypoint Starter](https://github.com/nondualworks/waypoint-starter) — a team operating system for any engineering team.

This demo features two fictional teams at **Meridian Corp**:

- **Platform Engineering** — manages infrastructure, CI/CD, and developer tooling
- **Data Platform** — manages data pipelines, warehousing, ML infra, and governance

Both teams use the same Waypoint template with different data, vocabulary, and capabilities — proving the "any team" thesis.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnondualworks%2Fwaypoint-demo)

## Quick Start

```bash
git clone https://github.com/nondualworks/waypoint-demo.git
cd waypoint-demo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Platform Engineering team site.

### View Data Platform team

```bash
NEXT_PUBLIC_TEAM=data-platform npm run dev
```

## What's Different from Starter

| Feature | waypoint-starter | waypoint-demo |
|---------|-----------------|---------------|
| Data | Placeholder/stubs | Full Meridian Corp content |
| Stats bar | Disabled | Live with real numbers |
| Capabilities | 3 overview cards | 6 with full detail pages |
| Content | TODO stubs | Onboarding guides, retro narrative |
| Teams | Single team | PE + Data Platform (env-var switch) |
| Team switcher | No | Yes (nav dropdown) |

## Two-Team Architecture

Team selection is controlled by the `NEXT_PUBLIC_TEAM` environment variable:

| Value | Team | Data directory |
|-------|------|---------------|
| _(unset)_ | Platform Engineering | `data/` |
| `data-platform` | Data Platform | `data-dp/` |

`src/lib/yaml.ts` resolves the data root based on this env var. All pages read from the selected directory automatically.

## PE Team Stats

| Metric | Value |
|--------|-------|
| Pipeline runs/day | ~280 |
| App builds/day | ~72 |
| Pipeline success | 94% |
| EKS clusters | 8 |
| Workloads running | 680 |
| Environments | 28 |
| Zero-CVE images | 16 |
| Critical CVEs | 0 |

## Data Platform Stats

| Metric | Value |
|--------|-------|
| Data processed/day | ~1.2 TB |
| Active pipelines | 14 |
| Pipeline reliability | 99.2% |
| Data domains | 6 |
| Datasets maintained | ~840 |
| Schema violations | 0 |

## Deploy

**Vercel** (recommended): Click the deploy button above, or connect the repo and push.

For two teams on Vercel, create two projects from the same repo:
1. **waypoint-demo-pe** — no env vars needed (PE is default)
2. **waypoint-demo-dp** — set `NEXT_PUBLIC_TEAM=data-platform`

**Docker**:
```bash
docker build -t waypoint-demo .
docker run -p 3000:3000 waypoint-demo
```

**Data Platform via Docker**:
```bash
docker build -t waypoint-demo-dp --build-arg NEXT_PUBLIC_TEAM=data-platform .
docker run -p 3000:3000 waypoint-demo-dp
```

## Related Repos

| Repo | What |
|------|------|
| `nondualworks/waypoint-starter` | Vendor-agnostic template — clone and fill in your data |
| `nondualworks/waypoint-demo` | This repo — full demo with Meridian Corp content |

## License

Apache 2.0
