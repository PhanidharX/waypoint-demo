# Platform Engineering Onboarding

Welcome to the Platform Engineering team at Meridian Corp. This guide covers your first four weeks.

## Before Day 1

- Accept calendar invites for team rituals (standup, sprint planning, retro)
- Read this Waypoint site end-to-end — it's your map
- Bookmark: #pe-intake, #pe-alerts, #pe-team channels

## Week 1 — Orientation

- [ ] Laptop setup: install pe-cli (`brew install meridian/tap/pe-cli`), Docker Desktop, kubectl, Terraform
- [ ] Access requests: AWS SSO, Vault UI, Grafana, Concourse, Bitbucket, Jira (PLAT project)
- [ ] Meet your onboarding buddy — they'll pair with you all week
- [ ] Read the golden path guide: understand how services ship at Meridian
- [ ] Shadow a support rotation shift — observe, don't act
- [ ] Walk through one Concourse pipeline end-to-end (ask your buddy to pick one)

## Week 2 — First Contributions

- [ ] Pick up a "good first issue" from the PLAT board (labeled `onboarding`)
- [ ] Deploy a change to a staging environment using the golden path
- [ ] Rotate a secret using `pe secrets rotate` — verify the workload picks it up
- [ ] Review a teammate's PR — focus on Terraform modules and Helm charts
- [ ] Attend your first partner sync (Networking or Security)

## Week 3 — Deeper Dive

- [ ] Take your first support rotation shift (paired with a senior PE)
- [ ] Investigate a real alert in Grafana — trace from alert to dashboard to pod logs
- [ ] Create a new environment for the sandbox account using golden path
- [ ] Read the capability detail pages on this site — especially Compute and Security
- [ ] Document one thing you found confusing and submit a PR to improve it

## Week 4 — Independence

- [ ] Solo support rotation shift (with backup available)
- [ ] Pick up a sprint story from the current cycle
- [ ] Attend IDP review and understand the quarterly planning rhythm
- [ ] Set up your own Grafana dashboard for something you care about
- [ ] Write a short retro: what went well, what was confusing, what's missing from onboarding

## Key Resources

| Resource | Link |
|----------|------|
| Golden Path Guide | docs.internal.meridian.dev/pe/golden-path |
| pe-cli Reference | docs.internal.meridian.dev/pe/cli |
| Concourse UI | concourse.internal.meridian.dev |
| Grafana | grafana.internal.meridian.dev |
| Vault UI | vault.internal.meridian.dev |
| Jira Board | jira.internal/projects/PLAT/board |

## Team Rituals

| Ritual | When | Duration |
|--------|------|----------|
| Standup | Daily 9:15 AM | 15 min |
| Sprint Planning | Alternate Wednesdays | 60 min |
| Sprint Retro | Alternate Tuesdays | 45 min |
| IDP Review | Every 6 weeks | 90 min |
| Partner Sync | Monthly | 30 min |
| Knowledge Share | Bi-weekly Fridays | 30 min |

## Your First PR Checklist

1. Branch from `main`, prefix with your initials (`sr/fix-vault-mount`)
2. Include Terraform plan output in PR description
3. Tag the plane owner for review
4. CI must pass: lint, plan, security scan
5. Merge via squash commit
