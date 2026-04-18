# CLAUDE.md — Waypoint Project Context

> Complete context for Claude Code. Read before writing any code.
> Every decision here was made deliberately after extensive planning.
> Do not deviate without flagging it explicitly.
> Last updated: April 2026

---

## 1. What Is Waypoint

**Waypoint** is a team operating system — a structured site any engineering team
can use to make themselves legible to the people around them.

Not a PE-specific tool. Any team. Any company. Any domain.

Four questions every visitor can answer after visiting:
- What does this team offer? → Capabilities
- Who do they work with? → Partners
- What are they building now? → Active Projects
- How do I work with them? → How to Engage

**The "new joiner mental model"** is the killer use case: a structured,
templated approach to learn any new team's ecosystem on day one.

---

## 2. Three Repos

```
nondualworks/waypoint-starter   THIS REPO — public, Apache 2.0
nondualworks/waypoint-demo      public, Apache 2.0, Vercel demo
[private]/waypoint              private, PE team production instance
```

### waypoint-starter (this repo)
- Vendor-agnostic contract
- Interfaces only — no vendor implementations
- No Vercel AI SDK, Chat SDK, json-render, Streamdown
- These belong in waypoint-demo only
- Anyone clones this and fills in their data

### waypoint-demo
- Extends waypoint-starter
- Two fictional teams: PE + Data Platform at "Meridian Corp"
- Implements all vendor seams with Vercel stack
- Hosted on Vercel, one-click deploy
- Shows the "any team" thesis with two different domains

### Private instance
- Extends waypoint-starter (not demo)
- Real PE team data
- EKS + Istio + Route 53 deployment
- Concourse CI/CD pipeline

---

## 3. Tech Stack

```
Framework     Next.js 15, App Router, TypeScript strict
Styling       Tailwind CSS — extend pattern ONLY, never replace defaults
Components    shadcn/ui primitives ported to .tsx (we OWN the code)
Search        Pagefind (static WASM, MIT, zero infrastructure)
Data          YAML files in /data/ read via js-yaml + Node fs
Fonts         IBM Plex Sans (body/UI) + JetBrains Mono (technical/code)
Icons         Unicode characters only — no icon library dependency
Export        SheetJS (xlsx) — client-side only, no server involvement
Deployment    Static export default → server mode upgrade path documented
```

### What NOT to install in waypoint-starter
```
❌ @vercel/ai, ai                    → waypoint-demo only
❌ @json-render/core                 → waypoint-demo only
❌ chat (Chat SDK)                   → waypoint-demo only
❌ streamdown                        → waypoint-demo only
❌ @radix-ui/* (via shadcn install)  → port manually to .tsx
❌ lucide-react                      → use Unicode characters
❌ framer-motion                     → use CSS animations
```

---

## 4. Folder Structure

```
waypoint-starter/
├── CLAUDE.md                       ← this file
├── README.md                       ← quick start + deploy pointer
├── CONTRIBUTING.md                 ← who edits what, LLM workflow
├── Dockerfile                      ← generic Next.js container
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.mjs
│
├── data/                           ← SINGLE SOURCE OF TRUTH
│   ├── config.yaml                 ← global config, vocabulary, stats
│   ├── capabilities/
│   │   ├── index.yaml              ← overview cards
│   │   ├── env-provisioning.yaml   ← detail + partner connections
│   │   ├── compute.yaml
│   │   ├── base-images.yaml        ← image matrix + lifecycle
│   │   ├── observability.yaml
│   │   ├── security.yaml
│   │   └── devex.yaml
│   ├── partners.yaml
│   ├── projects.yaml               ← idp + ongoing tracks
│   ├── team.yaml
│   ├── retro.yaml                  ← populated by scope-creep.js
│   ├── rotation.yaml               ← TODO: Opsgenie/API seam
│   ├── rituals.yaml
│   ├── idp-status.yaml
│   ├── stats.yaml                  ← populated by stats.js (opt-in)
│   └── knowledge-hub/
│       └── docs-registry.yaml      ← Docspine registry format
│
├── content/                        ← Markdown/MDX prose (flat)
│   ├── how-to-engage.md
│   ├── onboarding-pe.md
│   ├── onboarding-dev.md
│   ├── retro-current.md
│   └── archive/
│
├── scripts/
│   ├── scope-creep.js              ← Jira → retro.yaml (Option B)
│   ├── generate-context.js         ← all YAML+MD → context.md for LLM
│   ├── stats.js                    ← Thanos/Prometheus → stats.yaml
│   └── mcp-server.js               ← Phase 2 stub
│
├── docs/                           ← Diataxis structure
│   ├── tutorials/
│   │   └── getting-started.md
│   ├── how-to/
│   │   ├── update-team-members.md
│   │   ├── add-a-project.md
│   │   ├── add-a-partner.md
│   │   ├── run-scope-creep.md
│   │   ├── generate-llm-context.md
│   │   ├── add-a-plane-component.md
│   │   ├── archive-a-retro.md
│   │   ├── override-tokens.md
│   │   ├── add-a-new-section.md
│   │   ├── configure-vocabulary.md
│   │   ├── setup-bot.md
│   │   └── deploy.md
│   ├── reference/
│   │   ├── data-schemas.md
│   │   ├── sor-reference-block.md
│   │   ├── config-options.md
│   │   ├── component-api.md
│   │   ├── scripts.md
│   │   └── vocabulary.md
│   ├── explanation/
│   │   ├── two-zone-architecture.md
│   │   ├── yaml-as-database.md
│   │   ├── catalog-alignment.md
│   │   ├── component-strategy.md
│   │   ├── design-system.md
│   │   ├── three-outlets.md
│   │   ├── mcp-phases.md
│   │   ├── team-types.md
│   │   └── waypoint-and-naadi.md
│   └── decisions/
│       ├── 001-two-zones.md
│       ├── 002-nextjs-choice.md
│       ├── 003-waypoint-name.md
│       ├── 004-persona-cards.md
│       ├── 005-yaml-schema.md
│       ├── 006-design-system.md
│       └── 007-three-outlets.md
│
└── src/
    ├── styles/
    │   ├── tokens.css              ← CSS custom properties — OVERRIDE HERE
    │   ├── global.css              ← base styles, font imports
    │   └── custom.css              ← empty — private instance adds here
    │
    ├── lib/
    │   ├── yaml.ts                 ← YAML reading utilities
    │   ├── query.ts                ← queryWaypoint() interface (stub)
    │   ├── bot.ts                  ← bot interface (stub)
    │   ├── renderer.ts             ← markdown renderer interface (stub)
    │   └── context.ts              ← context.md generation logic
    │
    ├── components/
    │   ├── ui/                     ← shadcn/ui primitives (ported to .tsx)
    │   │   ├── table.tsx
    │   │   ├── badge.tsx
    │   │   ├── card.tsx
    │   │   └── button.tsx
    │   │
    │   ├── catalog/                ← capability components
    │   │   ├── CapabilityList.tsx  ← left panel (Variant B)
    │   │   ├── CapabilityDetail.tsx← right panel
    │   │   ├── CapabilityRow.tsx   ← list item
    │   │   ├── AvailabilityRow.tsx ← per-customer state
    │   │   └── PartnerDepRow.tsx   ← partner dependency
    │   │
    │   ├── layout/
    │   │   ├── BaseLayout.tsx
    │   │   └── Nav.tsx
    │   │
    │   ├── home/
    │   │   ├── Hero.tsx            ← typewriter on "front door."
    │   │   ├── StatsBar.tsx        ← animated counters (opt-in)
    │   │   ├── PersonaCards.tsx    ← three audience entry points
    │   │   └── RightNow.tsx        ← support, cycle, signals
    │   │
    │   ├── overview/
    │   │   ├── QuarterSummary.tsx
    │   │   ├── PlatformHealth.tsx
    │   │   └── LastQuarterSnap.tsx
    │   │
    │   ├── team/
    │   │   ├── PersonCard.tsx
    │   │   ├── PlaneMap.tsx
    │   │   └── HatsTable.tsx
    │   │
    │   ├── projects/
    │   │   ├── ProjectTable.tsx
    │   │   ├── RoadmapHighlights.tsx
    │   │   └── ScopeCreepBadge.tsx
    │   │
    │   ├── partners/
    │   │   └── PartnerCard.tsx
    │   │
    │   ├── knowledge/
    │   │   ├── ManifestIndex.tsx
    │   │   └── FilterBar.tsx
    │   │
    │   └── shared/
    │       ├── AnimatedCounter.tsx ← viewport-aware, celebrate mode
    │       ├── StatBlock.tsx       ← renders stat with label
    │       ├── StatusBadge.tsx
    │       ├── MaturityBadge.tsx
    │       ├── TrackingBadge.tsx
    │       ├── DeadlineBadge.tsx
    │       ├── PipelineEmbed.tsx
    │       ├── SORLink.tsx         ← outward links (↗, new tab)
    │       ├── SignalLink.tsx      ← inward signal links (color-coded)
    │       └── LastUpdated.tsx
    │
    └── app/                        ← Next.js App Router
        ├── layout.tsx
        ├── page.tsx                ← / Home
        ├── engage/page.tsx         ← /engage
        ├── capabilities/
        │   ├── page.tsx            ← /capabilities (Variant B)
        │   └── [id]/page.tsx       ← /capabilities/[id] detail
        ├── partners/page.tsx
        ├── overview/page.tsx
        ├── work/
        │   ├── page.tsx            ← /work dashboard
        │   ├── team/page.tsx
        │   ├── projects/page.tsx
        │   ├── retro/page.tsx
        │   ├── knowledge/page.tsx
        │   ├── onboarding/page.tsx
        │   ├── rituals/page.tsx
        │   └── idp/page.tsx
        ├── meta/
        │   ├── page.tsx            ← /meta Diataxis index
        │   ├── tutorials/[slug]/page.tsx
        │   ├── how-to/[slug]/page.tsx
        │   ├── reference/[slug]/page.tsx
        │   ├── explanation/[slug]/page.tsx
        │   └── decisions/[slug]/page.tsx
        └── api/
            ├── query/route.ts      ← queryWaypoint() endpoint (stub)
            ├── bot/route.ts        ← messenger webhook (stub)
            └── mcp/route.ts        ← MCP server (Phase 2 stub)
```

---

## 5. Design System

### Tokens (src/styles/tokens.css)

```css
:root {
  /* Dark mode — DEFAULT */
  --color-bg:           #09090b;  /* zinc-950 */
  --color-surface:      #18181b;  /* zinc-900 */
  --color-surface-high: #27272a;  /* zinc-800 */
  --color-surface-hover:#2d2d30;
  --color-surface-zebra:#1c1c1f;  /* table alternating rows */
  --color-border:       rgba(255,255,255,0.08);
  --color-border-hover: rgba(255,255,255,0.16);
  --color-text:         #f4f4f5;  /* zinc-100 */
  --color-muted:        #a1a1aa;  /* zinc-400 */
  --color-subtle:       #71717a;  /* zinc-500 */

  /* Accent */
  --color-accent:       #10b981;  /* emerald-500 — CONFIRMED */
  --color-accent-dim:   rgba(16,185,129,0.12);
  --color-accent-text:  #10b981;

  /* Status */
  --color-warning:      #fbbf24;
  --color-warning-dim:  rgba(251,191,36,0.10);
  --color-critical:     #f87171;
  --color-critical-dim: rgba(248,113,113,0.10);
  --color-info:         #38bdf8;
  --color-info-dim:     rgba(56,189,248,0.10);
  --color-purple:       #a78bfa;
  --color-purple-dim:   rgba(167,139,250,0.10);

  /* Typography */
  --font-sans: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Shadows (Stripe-style layered) */
  --shadow:      0 0 0 1px rgba(255,255,255,0.05),
                 0 4px 6px -1px rgba(0,0,0,0.5),
                 0 20px 40px -8px rgba(0,0,0,0.6);
  --shadow-hover:0 0 0 1px rgba(255,255,255,0.08),
                 0 8px 16px -2px rgba(0,0,0,0.6),
                 0 32px 56px -8px rgba(0,0,0,0.7);
}

.light {
  /* Light mode — toggled via class on <html> */
  --color-bg:           #f8fafc;
  --color-surface:      #ffffff;
  --color-surface-high: #f1f5f9;
  --color-surface-hover:#e2e8f0;
  --color-surface-zebra:#f8fafc;
  --color-border:       rgba(0,0,0,0.08);
  --color-border-hover: rgba(0,0,0,0.16);
  --color-text:         #0f172a;
  --color-muted:        #64748b;
  --color-subtle:       #94a3b8;
  --color-accent-text:  #059669;  /* darker in light mode */
  /* All other tokens same as dark */
}
```

### Typography scale
```
display:  32-52px, weight 700, IBM Plex Sans, tracking -.04em
h1:       28px, weight 700, tracking -.03em
h2:       22px, weight 700, tracking -.02em
body:     14-15px, weight 400, IBM Plex Sans, line-height 1.6
small:    12-13px, weight 400
label:    10-11px, weight 500, JetBrains Mono, uppercase, tracking .06-.1em
mono:     11-13px, JetBrains Mono — versions, IDs, plane names, status
```

### Spacing
```
Single consistent spacing throughout — NO zone distinction.
Content density is natural (a table is denser than a hero)
not imposed by different spacing rules per zone.

All pages:
  page top padding: 80px
  section gap: 32-48px
  card padding: 20-24px

Zone is communicated by:
  Navigation links  (different set in /work vs marketing pages)
  Breadcrumbs       (Waypoint › Work › Projects)
  URL prefix        (/work/*)
  Content itself    not visual treatment
```

### Link vocabulary (THREE distinct types)
```
Inward — .link-internal CSS class
  color: muted → accent on hover
  same tab, → arrow suffix

Outward — SORLink.tsx
  color: subtle → muted on hover
  new tab, ↗ suffix, slightly muted

Signal — SignalLink.tsx
  color-coded by status (critical/warning/ok/info)
  count badge, → arrow, same tab
```

### Micro interactions
```
Card hover:     translateY(-3px) + shadow deepens (0.2s cubic-bezier)
Project row:    background highlight on hover (0.15s ease)
Profile link:   arrow nudges right+up (0.15s)
CTA arrow:      6px spring nudge (0.25s cubic-bezier(.34,1.56,.64,1))
Pulse dot:      breathing animation 1.8s ease-out infinite
Typewriter:     65ms/char, cursor blinks 1.5s then fades, plays once
Counter:        cubic ease-out 1.8s, celebrate mode for zero values
Theme toggle:   background 0.3s ease transition
```

---

## 6. YAML Data Layer

### Core principle
YAML files are the single source of truth. All pages read from them at
build time (static) or request time (server mode). Never duplicate data.

### SOR reference block (used everywhere a link to external system exists)
```yaml
sor_ref:
  system: jira | confluence | bitbucket | opsgenie | github | external
  url: "https://..."
  id: "PLAT-123"       # system-native stable ID
  label: "View in Jira"
```

### Capability schema
```yaml
# data/capabilities/index.yaml — overview cards
capabilities:
  - id: env-provisioning
    icon: "⬡"
    shortName: "Environments"          # left panel nav label (short)
    name: "Environment Provisioning & Delivery"  # full title
    type: prose | matrix | boundary    # determines card shape
    maturity: golden_path | manual | in_progress | mixed
    planes: [infra-cicd, app-cicd]
    statement: "One or two sentences — verb-led, outcome-focused"
    detail: "Expanded explanation for detail panel"
    selfService: ["list of self-service items"]
    needsPE: ["list of items requiring PE intake"]
    stats:
      - label: "environments"
        value: 34
        unit: ""
        prefix: ""
        celebrate: false               # true = green pulse when 0
        type: text                     # omit for numbers, "text" for strings
    customerAvailability:
      - customer: "Customer A"
        state: adopted | partial | available | not_offered
        note: "context"
        variants_adopted: [java21]     # base-images specific
        variants_available: [java25]   # base-images specific
    partnerDeps:
      - partner_id: networking
        name: "Networking Team"
        relationship: "Network approval required"
        impact: "Adds 2-week lead time"
        sla_effect: "Explains 10-day SLA for new environments"
        golden_path_blocker: true | false
        blocker_detail: "Blocked pending GSO policy-as-code API"
    ctas:                              # contextual call-to-action links
      - label: "Request a new secret"
        type: intake | self-service | external
        intake_template: "I need [what] for [service] in [environment]"
        channel: "#pe-intake"

# data/capabilities/base-images.yaml — detail page data
images:
  - name: java21-build
    architectures: [amd64, arm64]
    phase: build | runtime
    current_tag: "21.0.3-gradle8.7"
    latest_available: "21.0.4-gradle8.8"
    cve_status: zero | clean | has_issues
    last_scanned: "2026-04-01T00:00:00Z"
    tracking_level: full | light | acknowledged
    lifecycle:
      upgrade_status: current | scheduled | in_progress | not_started
      compliance_drivers:
        - type: security | cost | feature
          deadline: "2026-04-15"
          notes: "patches CVE-XXXX"
    ecr_path: "[account].dkr.ecr.[region].amazonaws.com/base/java21-build"
```

### Partners schema
```yaml
partners:
  - id: networking
    name: "Enterprise Networking Team"
    area: "Network Infrastructure"
    desc: "One paragraph description"
    whatWeConsume:
      - "VPC and subnet allocations"
    integrationPoint: "How PE integrates with them"
    engagementProcess: "PE-mediated — do not contact directly"
    theirCycle: "2-week approval cycle"
    frontDoor: "https://networking.internal/request"
    spaceLink: "#networking-pe-collab"
    isCustomer: false                  # true for DB SRE team
    affects_capabilities:
      - capability_id: env-provisioning
        how: "Approves network connectivity changes"
    sor_ref:
      system: external
      url: "https://networking.internal"
      id: null
      label: "Their front door"
```

### Projects schema
```yaml
projects:
  - id: 1
    name: "EKS 1.28 → 1.30 Upgrade"
    customer: "Customer A"
    track: idp | ongoing
    status: on-track | in-progress | slipping | complete
    lead: "Sofia Reyes"
    planes: [compute]                  # one OR many — both valid
    lastUpdated: "2d ago"
    scopeCreep: 0
    sor_ref:
      system: jira
      url: "https://jira.internal/browse/PLAT-200"
      id: "PLAT-200"
      label: "View in Jira"
    channel:
      system: external
      url: "https://webex.internal/spaces/xyz"
      id: null
      label: "#proj-custa-eks"
```

### Team schema
```yaml
team:
  - id: sofia-reyes
    name: "Sofia Reyes"
    role: "Platform Engineer"
    primaryPlane: compute
    secondaryPlane: app-cicd           # optional
    hat: "Tech Lead"                   # current quarter hat
    onSupportToday: true
    projects: [1, 4]                   # project IDs
    bandwidth: null                    # TBD — algorithm not yet defined
    profile_link:
      system: external
      url: "https://directory.internal/sofia-reyes"
      id: null
      label: "View profile"
```

### Config schema
```yaml
# data/config.yaml
team_name: "Platform Engineering"
team_type: platform_engineering        # platform_engineering | product | data | security

current_quarter: "Q1 2026"
sprint:
  cadence: 2-week
  start_day: Wednesday
  current_sprint: "Sprint 8"
  idp_cycle_week: 4
  idp_cycle_total: 6

# Vocabulary overrides — any team can rename these
vocabulary:
  consumers: "Customers"               # or Users, Clients, Tenants
  planes: "Planes"                     # or Domains, Squads, Areas
  intake: "Intake"                     # or Requests, Tickets
  rotation: "Support Rotation"         # or On-call, Office Hours

# Relationship types
relationships:
  consumers:
    label: "Customers"
    enabled: true
  stakeholders:
    label: "Stakeholders"
    enabled: true
  partners:
    label: "Partners"
    enabled: true

# JIRA config (single project, custom fields)
jira:
  project_key: PLAT
  base_url: "https://jira.internal"
  custom_fields:
    customer: "customfield_10001"
    plane:    "customfield_10002"
    track:    "customfield_10003"
    work_type:"customfield_10004"

# Voting system
voting:
  system: jira                         # jira | jira-product-discovery
  jira_issue_type: "Platform Proposal"
  project_key: PLAT

# Stats bar (opt-in)
stats:
  enabled: false                       # flip to true when ready
  source: manual                       # manual | thanos | prometheus
  thanos_url: null                     # set when source: thanos
  # token via env: THANOS_TOKEN
  items:
    - id: pipeline_runs
      label: "pipeline runs/day"
      prefix: "~"
      value: null
      celebrate: false
    - id: app_builds
      label: "app builds/day"
      prefix: "~"
      value: null
      celebrate: false
    - id: success_rate
      label: "pipeline success"
      suffix: "%"
      value: null
      celebrate: false
    - id: eks_clusters
      label: "EKS clusters"
      value: null
      celebrate: false
    - id: workloads
      label: "workloads running"
      value: null
      celebrate: false
    - id: environments
      label: "environments"
      value: null
      celebrate: false
    - id: zero_cve_images
      label: "zero-CVE images"
      value: null
      celebrate: false
    - id: critical_cves
      label: "critical CVEs"
      value: null
      celebrate: true                  # green pulse when 0

# Deployment
deployment:
  internal_url: null                   # "https://waypoint.internal.yourcompany.com"

# Notifications (opt-in)
notifications:
  enabled: false
  provider: teams | webex | slack
  webhook_url: null                    # TODO: add webhook URL
  triggers:
    lifecycle_deadline_days: 30
    scope_creep_threshold: 3
    support_rotation_reminder: true
```

### Stats schema (populated by scripts/stats.js)
```yaml
# data/stats.yaml
generated_at: "2026-04-09T06:00:00Z"
source: manual                         # manual | thanos
builds:
  per_day: null                        # all Concourse jobs
  app_builds_per_day: null             # _develop jobs only
  success_rate: null
  avg_duration_seconds: null
clusters:
  total: null
workloads:
  running: null
environments:
  total: null
base_images:
  total: null
  zero_cve: null
  last_scanned: null
  critical_vulns: null
```

---

## 7. Page Inventory

### Marketing zone (/ prefix)
```
/                   Home — hero, stats bar, persona cards, RightNow
/engage             How to Engage — intake, triage outcomes, SLA table
/capabilities       Platform Capabilities — Variant B master/detail
/capabilities/[id]  Capability detail — matrix, lifecycle, partner deps
/partners           Platform Partners — PE-mediated, front door links
/overview           Leadership Overview — signals + drill-downs
```

### Operational zone (/work prefix)
```
/work               Dashboard — signal pills, support, cycle status
/work/team          Team — PlaneMap, HatsTable, PersonCards, rotation
/work/projects      Projects — tabs + filters + table + export
/work/retro         Quarterly Retro — metrics + prose + archive
/work/knowledge     Knowledge Hub — Docspine manifest index
/work/onboarding    Onboarding — Track A (PE) + Track B (dev)
/work/rituals       Rituals — currently running + target cadence
/work/idp           IDP Status — domain status cards
```

### Meta zone (/meta prefix)
```
/meta               Diataxis index — four quadrants + page status
/meta/tutorials     Learning-oriented guides
/meta/how-to        Task-oriented guides
/meta/reference     Reference material
/meta/explanation   Background and context
/meta/decisions     ADR list
```

---

## 8. Navigation Rules

```
Marketing zone nav links:
  Capabilities · Partners · How to Engage · Overview

Operational zone nav links (/work/*):
  Dashboard · Projects · Team · Retro · Knowledge

Meta zone nav links (/meta/*):
  Tutorials · How-to · Reference · Explanation · Decisions

Work zone breadcrumbs:
  Waypoint › Work › [Page Name]

Footer links (all pages):
  "About this site →" → /meta
  "Waypoint Starter ↗" → GitHub
```

---

## 9. Key Component Patterns

### Capability layout — Variant B (master/detail)
- Left panel: 320px, sticky, capability list with short names
- Right panel: flexible width, full detail
- Short names in list (no truncation), full names in detail header
- Adoption dots: colored per customer availability state
- Three card shapes: prose | matrix | boundary

### Three-state customer availability
```
adopted    green  #10b981  — customer actively using
partial    amber  #fbbf24  — some variants adopted, some available
available  blue   #38bdf8  — offered but not yet adopted
not_offered gray  #71717a  — not offered to this customer
```

### Projects table
- Tabs for track (IDP / Ongoing) — NOT a filter pill
- Filter pills: Customer · Status · Plane · Lead (multi-select)
- Plane filter: array includes match (project spans planes)
- Zebra striping: alternating zinc-900/zinc-950
- Row padding: 16px vertical
- Export: SheetJS CSV, client-side only
- Two tracks: IDP (purple accent) / Ongoing (sky blue accent)

### Stats bar (opt-in)
- Only renders when config.stats.enabled = true
- AnimatedCounter: viewport-aware via IntersectionObserver
- Celebrate mode: counts DOWN to 0, green pulse on landing
- Delay stagger: 110ms per stat
- Placed ABOVE persona cards on home page

### Animations (Phase 2 — not in initial build)
- Pipeline flow: Concourse visual language (job boxes, resource circles)
- Concourse state colors: idle #3d3d3d, pending #8b572a,
  running #f5a623, succeeded #11c560, failed #ed4b35
- Resource circles: git #f5a623, docker-image #38bdf8, s3 #fbbf24, slack #10b981
- Persona journey: developer, PE team, leadership (3 animations)
- All animations: Phase 2, viewport-triggered, loop with 3s pause
- Slots marked with TODO comments in initial build

---

## 10. Interfaces (Stubs in Starter)

These are defined as TypeScript interfaces in src/lib/ but NOT implemented.
Implementations belong in waypoint-demo or private instance.

```typescript
// src/lib/query.ts
export interface WaypointQuery {
  question: string
  outlet: 'web' | 'messenger' | 'llm'
}
export interface WaypointQueryResult {
  type: 'ui' | 'text' | 'card'
  content: unknown
}
// TODO: implement with your LLM provider
// See docs/how-to/setup-ai-query.md

// src/lib/bot.ts
export interface BotMessage {
  text: string
  platform: string
  threadId: string
}
// TODO: implement with your bot framework
// See docs/how-to/setup-bot.md

// src/lib/renderer.ts
// TODO: implement with your markdown renderer
// See docs/how-to/setup-renderer.md
```

---

## 11. Three Outlets (Architecture)

```
Outlet 1 — Web (primary)
  Next.js pages render YAML data
  json-render for natural language → UI (waypoint-demo only)
  Vercel AI SDK (waypoint-demo only)

Outlet 2 — Messenger
  Teams/Webex → Adaptive Cards
  Slack → Block Kit
  Same queryWaypoint() function, outlet-aware output
  Chat SDK (waypoint-demo only)
  scripts/notify.js for proactive notifications

Outlet 3 — LLM/MCP
  Phase 1: scripts/generate-context.js → context.md
  Phase 2: api/mcp/route.ts MCP server
  Reads YAML files directly
```

---

## 12. Data Freshness Tiers

```
Tier 1 — Manual (monthly/quarterly)
  capabilities, partners, slas, rituals, content/*.md
  Edit YAML → commit → rebuild

Tier 2 — Scheduled script (weekly/daily)
  rotation.yaml    ← scripts/stats.js (Opsgenie seam marked)
  retro.yaml       ← scripts/scope-creep.js (Jira API)
  stats.yaml       ← scripts/stats.js (Thanos API)
  Concourse pipeline triggers these scripts

Tier 3 — Live API routes (real-time, Phase 2)
  api/rotation/route.ts  ← Opsgenie live, rotation.yaml fallback
  api/projects/route.ts  ← Jira live, projects.yaml fallback
  Requires Next.js server mode (flip output in next.config.mjs)
```

---

## 13. Naadi Alignment

Waypoint is Customer Zero for Naadi (the IDP platform).

```
capabilities.yaml uses catalog/v1 metadata structure:
  apiVersion: catalog/v1
  kind: Component
  metadata:
    name: eks-cluster
    owner: compute-plane
    lifecycle: active

pe_hub: block for PE-specific fields not in catalog/v1:
  tracking_level: full | light | acknowledged
  lifecycle: { current_version, compliance_drivers... }
  naadi_component_id: null  ← populated when Naadi catalog is live

Migration path:
  When Naadi backend ready:
    YAML files → naadi CLI ingests → PostgreSQL
    Waypoint reads Naadi API instead of YAML
    naadi_component_id field is the seam
```

---

## 14. Deployment Notes

### waypoint-starter (public demo)
```
Platform: Vercel native Git integration
Config:   Connect repo → push → auto-deploy
No AWS, no SST, no Concourse
```

### Private PE instance
```
Pipeline: Concourse → ECR (private) → EKS → Istio VirtualService
DNS:      Route 53 Private Hosted Zone (internal only)
URL:      waypoint.internal.yourcompany.com (TBD)
Container: node:20-alpine multi-stage Dockerfile

k8s resources (in private repo):
  deployment.yaml
  service.yaml
  virtualservice.yaml  ← Istio (replacing Gloo)
  gateway.yaml
```

### Server mode upgrade (when needed)
```
// next.config.mjs — flip this one line
output: 'export'  →  remove this line + add @next/vercel adapter
Triggers: live Jira queries, real-time Opsgenie, MCP server, AI SDK
```

---

## 15. Build Order (Recommended)

Start with a vertical slice — one page end-to-end first.
Proves the stack before building everything.

```
Step 1 — Foundation (Day 1 morning)
  npx create-next-app@latest waypoint-starter --typescript --tailwind --app
  Install: js-yaml @types/js-yaml
  src/styles/tokens.css  ← design tokens
  src/styles/global.css  ← font imports, base styles
  src/lib/yaml.ts        ← YAML reading utility
  data/config.yaml       ← global config with all fields
  Verify: npm run dev shows blank dark page

Step 2 — Capabilities vertical slice (Day 1 afternoon)
  data/capabilities/index.yaml  ← 3 capabilities with full schema
  src/components/catalog/       ← CapabilityList + CapabilityDetail
  src/app/capabilities/page.tsx ← Variant B renders from YAML
  Verify: /capabilities shows list + detail panel

Step 3 — Home page (Day 1 evening)
  data/stats.yaml (disabled)
  src/components/home/Hero.tsx
  src/components/home/PersonaCards.tsx
  src/components/home/RightNow.tsx
  src/app/page.tsx
  Verify: / shows hero + persona cards + RightNow

Step 4 — Nav + shell (Day 2 morning)
  src/components/layout/BaseLayout.tsx
  src/components/layout/Nav.tsx
  Theme toggle (dark/light)
  All pages navigate correctly
  Breadcrumbs in /work zone

Step 5 — Partners + Projects (Day 2 afternoon)
  data/partners.yaml
  data/projects.yaml
  src/components/partners/PartnerCard.tsx
  src/app/partners/page.tsx
  src/app/work/projects/page.tsx (table + filters + export)

Step 6 — Remaining pages (Day 3)
  /work/team, /work/retro, /work/knowledge
  /work/onboarding, /work/rituals, /work/idp
  /overview, /engage
  All can be placeholder shells that render YAML

Step 7 — /meta (Day 4 morning)
  Diataxis index page
  All section pages with page status (done/partial/needed)
  docs/ files as stubs

Step 8 — Demo content + deploy (Day 4-5)
  waypoint-demo repo
  PE team content (Meridian Corp)
  Data Platform team content
  Vercel deploy + GitHub public
  README polished
```

---

## 16. What NOT to Build in Initial Pass

```
Animations          → Phase 2 (mark slots with TODO comments)
MCP server          → Phase 2 (stub exists in api/mcp/route.ts)
Chat SDK bot        → waypoint-demo only (stub in src/lib/bot.ts)
AI SDK integration  → waypoint-demo only
Jira live queries   → Tier 3 (scripts run manually for now)
Thanos live queries → stats.js stub, manual values in stats.yaml
Bandwidth algorithm → TBD (slot exists in team.yaml)
Project docs        → TBD per project (Knowledge Hub placeholder)
Opsgenie integration→ seam marked in rotation.yaml + RightNow.tsx
Shape Up IDP track  → proposed, not yet running (placeholder)
Full /meta docs     → stubs only in initial pass
```

---

## 17. Concourse / Thanos Metrics Context

For the stats bar (when enabled):

```
Concourse runs on EC2 (not EKS)
  Exposes Prometheus metrics endpoint
  Scrapes → Prometheus → Thanos

Pipelines organized 1:1 with customers
  Concourse team = customer
  e.g. team: customer-a, team: customer-b, team: internal

App build jobs named: ${applicationName}_develop
  e.g. order-service_develop
  Filter: job=~".*_develop" for app builds only

Stats bar Option C (both):
  ~340 pipeline runs/day (all jobs)
  ~85 app builds/day (_develop jobs only)

EKS clusters dedicated per customer (no sharing)
  cluster label in Thanos identifies each cluster

Thanos endpoint: set in config.yaml metrics.thanos_url
Token: env var THANOS_TOKEN

OTEL logs → Splunk (migrating from Splunk Universal Forwarder)
  Potential future: error rates, deployment events
  scripts/splunk.js → data/signals.yaml (Phase 2)

Thanos queries validated file: thanos-queries.promql
  Run discovery queries first (Section A)
  Report back label names before baking into stats.js
```

---

## 18. Demo Site Content

**Fictional company: Meridian Corp**

### Team 1: Platform Engineering
```
config.yaml vocabulary:
  planes: "Planes"
  consumers: "Customers"

Stats (static, source: manual):
  ~280 pipeline runs/day
  ~72 app builds/day
  94% success rate
  8 EKS clusters
  680 workloads running
  28 environments
  0 critical CVEs
  16 zero-CVE images
```

### Team 2: Data Platform
```
config.yaml vocabulary:
  planes: "Domains"
  consumers: "Data Consumers"

Stats (static, source: manual — different domain):
  ~1.2TB data processed/day
  14 active pipelines
  99.2% pipeline reliability
  6 data domains
  ~840 datasets maintained
  0 schema violations this week

Capabilities (different domain vocabulary):
  Data Pipelines
  Data Warehouse
  ML Infrastructure
  Data Quality

Partners (different partner dynamics):
  Legal/Privacy (data governance — blocks some golden paths)
  Security (data classification)
  FinOps (data storage costs)
  Business Intelligence team (consumer, not governing body)
```

---

## 19. Key Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js App Router | json-render + AI SDK native fit |
| Static vs server | Static default | Upgrade path: remove output:'export' |
| Astro vs Next.js | Next.js | json-render is React-native |
| Single visual zone | No zone distinction | Same spacing/quality everywhere — zone communicated by nav + breadcrumbs + URL, not visual treatment |
| Track filter | Tabs not pills | IDP vs Ongoing is primary split |
| Dark/light | Dark default | json-render.dev quality bar |
| Emerald shade | #10b981 emerald-500 | Richer on dark backgrounds |
| Shadow style | Stripe layered | Elevation without flatness |
| Vendor lock-in | Demo only | Starter stays tool-agnostic |
| Customer fields | Custom JIRA fields | Single PLAT project, filter-driven |
| Clusters | Dedicated per customer | No cross-customer sharing |
| Ingress | Istio (replacing Gloo) | Migration in progress |
| Stats | Opt-in | Not ready until Thanos queries validated |
| Animations | Phase 2 | Core site first |
| Concourse visual | Concourse state colors | Recognizable to PE team |

---

## 20. Parked / TBD Items

```
Bandwidth algorithm       [TBD — custom, add to PersonCard when ready]
Project-level docs        [TBD — decided per project]
Opsgenie API integration  [seam in rotation.yaml, TODO in RightNow.tsx]
Shape Up for IDP          [proposed, not yet running]
Internal domain           [TBD after local validation]
Ecosystem links           [deferred — add when handbook.naadi.dev live]
Jira Product Discovery    [seam in config.yaml voting section]
Emerald shade verify      [#10b981 locked, revisit if needed]
Thanos query validation   [run thanos-queries.promql, report label names]
Splunk integration        [Phase 2 — scripts/splunk.js]
⌘K command palette        [Phase 2 — alongside json-render]
Persona journey animations[Phase 2 — 3 animations, React components]
MCP server                [Phase 2 — api/mcp/route.ts]
Jira live API             [Phase 3 — Tier 3 data freshness]
Naadi migration           [Phase 3 — naadi_component_id seam ready]
```

---

*This document is the source of truth for Claude Code sessions.
Update it when decisions change. Never let code drift from what's documented here.*
