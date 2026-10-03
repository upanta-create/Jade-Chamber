# Jade Chamber — Enterprise GitOps & DevSecOps Platform

> A production-grade, cloud-native multi-vendor e-commerce platform built with Next.js 15, PostgreSQL, Prisma ORM, and Redis distributed caching. Automated with declarative GitOps via ArgoCD, canary progressive delivery with automated Prometheus rollback via Argo Rollouts, and a comprehensive 5-tier Shift-Left DevSecOps security pipeline.

[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions)](https://github.com/upanta-create/Jade-Chamber/actions)
[![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED?logo=docker)](https://hub.docker.com)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Kustomize-326CE5?logo=kubernetes)](https://kubernetes.io)
[![ArgoCD](https://img.shields.io/badge/Argo_CD-GitOps-EF7B4D?logo=argo)](https://argo-cd.readthedocs.io)
[![Argo Rollouts](https://img.shields.io/badge/Argo_Rollouts-Canary-FF6B6B?logo=argo)](https://argoproj.github.io/argo-rollouts/)
[![Redis](https://img.shields.io/badge/Redis-Cache--Aside-DC382D?logo=redis)](https://redis.io)
[![Prometheus](https://img.shields.io/badge/Prometheus-Metrics-E6522C?logo=prometheus)](https://prometheus.io)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                       │
│                                                             │
│       GitHub Webhook / Git Commit (Single Source of Truth)   │
│                             │                               │
│                             ▼                               │
│                    ┌──────────────────┐                     │
│                    │ ArgoCD Controller│                     │
│                    └────────┬─────────┘                     │
│                             │ Pull Sync & Self-Heal         │
│                             ▼                               │
│                    ┌──────────────────┐                     │
│                    │   Argo Rollouts  │ ◄── Nginx Ingress   │
│                    └───┬──────────┬───┘                     │
│            10% Canary  │          │  90% Stable             │
│                        ▼          ▼                         │
│                 ┌──────────┐ ┌──────────┐                   │
│                 │Canary Pod│ │Stable Pod│                   │
│                 └────┬─────┘ └────┬─────┘                   │
│                      │            │                         │
│                      ▼            ▼                         │
│           ┌──────────────────────────────────┐              │
│           │   Redis Distributed Cache        │              │
│           │   (Sub-5ms Cache-Aside Layer)    │              │
│           └────────────────┬─────────────────┘              │
│                            │                                │
│                            ▼                                │
│           ┌──────────────────────────────────┐              │
│           │  PostgreSQL 16 + Prisma ORM      │              │
│           │  (Relational E-Commerce Schema)  │              │
│           └──────────────────────────────────┘              │
│                            │                                │
│       Metrics Scrape       ▼                                │
│  ┌────────────────────┐  ┌──────────────────┐               │
│  │Prometheus Operator ├──┤AnalysisTemplate  │ (Auto-Rollback│
│  │ (/api/metrics)     │  │ (Error/Latency)  │  if err > 1%) │
│  └────────────────────┘  └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Features & Engineering Decisions

| Feature | Implementation | Keywords |
|---------|---------------|----------|
| **Declarative GitOps** | Pull-based continuous sync via ArgoCD with automated self-healing and drift detection | ArgoCD, GitOps, Kubernetes |
| **Progressive Canary Delivery** | Argo Rollouts with automated traffic shifting (10% → 30% → 100%) and instant rollback | Canary, Argo Rollouts, Traffic Management |
| **Metric-Driven Analysis** | Real-time Prometheus `AnalysisTemplate` monitoring HTTP success rate and p95 latency | Prometheus, SLO, Automated Rollback |
| **Distributed Caching** | Redis Cache-Aside pattern with TTL invalidation on mutations and graceful in-memory fallback | Redis, Cache-Aside, Performance |
| **Relational Data Modeling** | PostgreSQL 16 schema mapped via Prisma ORM for vendors, products, addresses, and orders | PostgreSQL, Prisma ORM, Relational DB |
| **Zero-Downtime Migrations** | Automated database migrations executed via Kubernetes `initContainer` before pod promotion | Database Migrations, Zero-Downtime, K8s |
| **Shift-Left DevSecOps** | 5-stage pipeline: SAST (Semgrep), SCA (Trivy FS), Secrets (Gitleaks), IaC (Checkov), Container CVE (Trivy) | DevSecOps, Trivy, Semgrep, Checkov |
| **Non-Root Hardened Containers** | Multi-stage Alpine Docker build with unprivileged runtime user (UID 1001) for CIS compliance | Docker, CIS Benchmark, Container Hardening |
| **Environment Overlays** | Declarative Kustomize overlays for staging and production environments (`base`, `staging`, `prod`) | Kustomize, Multi-Environment, Infrastructure |
| **Observability & RED Metrics** | Custom Prometheus exposition endpoint (`/api/metrics`) exposing cache hit/miss and HTTP counters | Prometheus, RED Metrics, SRE |
| **Health Probes & Telemetry** | `/api/health` providing database connectivity checks, memory footprint, uptime, and pod metadata | Health Probes, Liveness, Readiness |
| **Multi-Vendor Storefront** | Next.js 15 App Router with vendor dashboards, catalog search, cart operations, and INR pricing | Next.js 15, React 19, E-Commerce |

---

## Tech Stack

### Application
- **Frontend & Server**: Next.js 15 (App Router), React 19, Lucide React
- **Styling**: Tailwind CSS, CSS Modules
- **State & Architecture**: React Context API, Server Components, API Route Handlers

### Data & Caching
- **Database**: PostgreSQL 16, Prisma ORM
- **Cache**: Redis 7 (Cache-Aside pattern, TTL invalidation, graceful fallback)
- **Database Tooling**: Adminer database management UI

### Security & DevSecOps
- **SAST**: Semgrep static code analysis (OWASP Top 10)
- **Secret Scanning**: Gitleaks git repository inspection
- **SCA**: Trivy dependency vulnerability scanner
- **IaC Scanning**: Checkov Kubernetes CIS benchmarks
- **Container Scanning**: Trivy container image CVE analysis

### DevOps & Infrastructure
- **Containers**: Docker, Docker Compose (multi-stage production builds)
- **GitOps CD**: ArgoCD (declarative staging & prod applications)
- **Progressive Delivery**: Argo Rollouts (canary deployments with Prometheus metrics analysis)
- **Configuration Management**: Kustomize overlays (`base/`, `overlays/staging/`, `overlays/prod/`)
- **Monitoring**: Prometheus (`/api/metrics` text format exposition)
- **CI/CD**: GitHub Actions (5-gate DevSecOps & automated image publishing)

---

## Getting Started

### Quick Start with Docker Compose

```bash
# Clone and start the local environment (App, PostgreSQL 16, Adminer)
git clone https://github.com/upanta-create/Jade-Chamber.git
cd Jade-Chamber
docker compose up --build -d
```

| Service | URL |
|---------|-----|
| Next.js Application | http://localhost:3000 |
| Adminer DB Manager | http://localhost:8080 |
| Health & Diagnostics | http://localhost:3000/api/health |
| Prometheus Metrics | http://localhost:3000/api/metrics |

### Manual Local Development

```bash
# Install dependencies
npm install

# Generate Prisma Client & seed database
npx prisma generate
node prisma/seed.js

# Run Next.js in development
npm run dev
```

---

## API Reference

| Method | Endpoint | Auth | Rate Limit | Description |
|--------|----------|------|-----------|-------------|
| `GET` | `/api/health` | — | — | Health probe, DB latency, memory & pod telemetry |
| `GET` | `/api/metrics` | — | — | Prometheus RED metrics & cache hit/miss exposition |
| `GET` | `/api/products` | — | — | List products with Redis Cache-Aside & category filter |
| `POST` | `/api/products` | — | — | Create product and invalidate Redis cache |
| `PUT` | `/api/products` | — | — | Update product details and purge cached keys |
| `DELETE` | `/api/products?id=` | — | — | Delete product and clean cached records |
| `GET` | `/api/orders` | — | — | Fetch customer and store orders |
| `POST` | `/api/orders` | — | — | Create order transaction and line items |

---

## Observability

### Prometheus Metrics (`/api/metrics`)
- `gocart_http_requests_total` — Request count partitioned by HTTP status code
- `gocart_redis_cache_hits_total` — Total Redis cache hits (Cache-Aside pattern)
- `gocart_redis_cache_misses_total` — Total Redis cache misses requiring database query
- `gocart_active_products_total` — Total listed products in the database
- `gocart_active_vendors_total` — Count of verified active storefronts
- `gocart_orders_processed_total` — Total completed order transactions
- `nodejs_heap_used_bytes` — Node.js runtime process heap memory consumption

### Canary Analysis Rules (`k8s/base/analysis-template.yaml`)
- `SuccessRate` — HTTP success rate >= 99% evaluated over rolling observation intervals
- `LatencyThreshold` — p95 request latency <= 500ms before advancing traffic allocation
- `AutomatedRollback` — Instant rollouts abortion and 100% traffic redirect on degradation

---

## Kubernetes & GitOps Deployment

### Deploy Kustomize Base Manifests

```bash
# Deploy base resources (Rollout, Services, ConfigMap, Ingress, AnalysisTemplate)
kubectl apply -k k8s/base
```

### Deploy Environment Overlays

```bash
# Deploy to Staging environment
kubectl apply -k k8s/overlays/staging

# Deploy to Production environment
kubectl apply -k k8s/overlays/prod
```

### ArgoCD GitOps Applications

```bash
# Register Staging GitOps Application
kubectl apply -f argocd/application-staging.yaml

# Register Production GitOps Application
kubectl apply -f argocd/application-prod.yaml
```

---

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `DATABASE_URL` | `.env` | PostgreSQL connection string (`postgresql://...`) |
| `REDIS_URL` | `.env` | Redis connection URL (`redis://localhost:6379`) |
| `NEXT_PUBLIC_APP_VERSION` | `.env` | Semantic application release version (e.g., `v1.0.0`) |
| `NEXT_PUBLIC_ENV` | `.env` | Target runtime environment (`development`, `staging`, `production`) |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | `.env` | Display currency symbol (`₹`) |

---

## License

MIT — Built by [upanta-create](https://github.com/upanta-create)
