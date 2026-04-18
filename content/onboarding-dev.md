# Developer Onboarding

Welcome to Meridian Corp. This guide helps you ship your first service using the Platform Engineering golden path.

## What PE Provides

Platform Engineering manages the infrastructure so you can focus on your application. We provide:

- **Environments** — Dev, staging, and production namespaces with networking, secrets, and CI/CD pre-configured
- **Base Images** — Curated, scanned container images (Java, Node, Python, Go)
- **CI/CD Pipelines** — Concourse pipelines that build, test, scan, and deploy your code
- **Observability** — Grafana dashboards, alerting, and log aggregation out of the box
- **Secrets** — Vault-managed secrets injected into your pods automatically

## Getting Started

### 1. Install the CLI

```bash
brew install meridian/tap/pe-cli
pe --version
```

### 2. Create Your Service

```bash
pe new --template java21-microservice --name order-service
cd order-service
```

This scaffolds: Dockerfile, Helm chart, Concourse pipeline, Grafana dashboard config, and Vault secret paths.

### 3. Push and Ship

```bash
git push origin main
```

Concourse picks up your repo automatically. Your pipeline:
1. Builds the container image using PE base images
2. Runs your tests
3. Scans for vulnerabilities
4. Deploys to your dev environment
5. Promotes to staging on green

### 4. Access Your Service

```bash
pe env status --service order-service
```

Your service is available at: `order-service.dev.custA.internal.meridian.dev`

## Self-Service vs. Intake

| Action | How |
|--------|-----|
| New service from template | `pe new` (self-service) |
| Rotate a secret | `pe secrets rotate` (self-service) |
| View pipeline logs | `pe pipeline logs` (self-service) |
| New environment | #pe-intake request |
| Custom networking | #pe-intake request |
| New base image variant | #pe-intake request |
| Production access | #pe-intake + security review |

## Golden Path Rules

1. **Use PE base images** — no direct pulls from Docker Hub in production
2. **Use the Helm chart template** — PE manages ingress, mTLS, and resource limits
3. **Don't store secrets in code** — use Vault paths, PE handles injection
4. **Don't modify Concourse pipelines directly** — use the pipeline template variables
5. **Do add custom Grafana dashboards** — in your team's folder, not the PE folder

## Need Help?

- **#pe-intake** — For new requests and changes
- **#pe-support** — For questions and issues
- **Waypoint** — This site — browse capabilities, check project status, find your PE contact
