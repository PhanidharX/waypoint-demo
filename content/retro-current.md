# Q1 2026 Retrospective

## Quarter Summary

Q1 2026 was defined by the EKS 1.30 migration and continued golden path adoption. We completed 48 stories across 3 IDP projects and 4 ongoing tracks, with a scope creep rate of 14.6% (7 items added mid-sprint).

## Key Wins

- **EKS 1.30 upgrade completed** for Customer A (production + staging) — zero downtime, completed 2 weeks ahead of schedule
- **Karpenter migration finished** — cluster autoscaler fully deprecated across all clusters, saving ~18% on compute costs
- **Zero critical CVEs maintained** for 90 consecutive days across all 16 base images
- **Pipeline success rate hit 94%** — up from 89% last quarter, driven by flaky test detection in Concourse
- **Developer adoption of golden path** reached 82% of new services (up from 71% in Q4 2025)

## What Didn't Go Well

- **Customer C staging environment** took 3 weeks instead of 2 days — blocked by networking approval delays
- **Scope creep on Istio migration** — 4 of 7 scope additions came from this project, driven by undocumented Gloo edge cases
- **Knowledge sharing attendance** dropped to 40% — need to rethink format or timing
- **Vault secret rotation caused 2 incidents** — race condition in sidecar injection during rolling deployments

## Metrics

| Metric | Q4 2025 | Q1 2026 | Trend |
|--------|---------|---------|-------|
| Stories completed | 42 | 48 | +14% |
| Scope creep items | 5 | 7 | +40% |
| Scope creep rate | 11.9% | 14.6% | Needs attention |
| Pipeline success rate | 89% | 94% | Improving |
| Golden path adoption | 71% | 82% | Improving |
| Mean time to provision | 52h | 48h | Improving |
| Support tickets | 34 | 28 | -18% |
| Critical CVEs | 0 | 0 | Maintained |

## Action Items for Q2

1. **Automate networking approvals** — work with Networking team on policy-as-code API to eliminate the 2-week bottleneck
2. **Fix Vault sidecar race condition** — pre-populate secrets before pod start, not during
3. **Revamp knowledge sharing** — shorter format (15 min lightning talks), rotate presenters, record sessions
4. **Complete Istio migration** — Customer B and internal clusters remaining
5. **Launch self-service environments** — Backstage plugin MVP by end of Q2
