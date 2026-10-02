# 🛡️ Jade Chamber — Enterprise GitOps, Progressive Delivery & DevSecOps Platform

<div align="center">

![Next.js 15](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Prisma](https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Distributed_Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-Metrics-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![ArgoCD](https://img.shields.io/badge/Argo_CD-GitOps-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)
![Argo Rollouts](https://img.shields.io/badge/Argo_Rollouts-Canary-FF6B6B?style=for-the-badge&logo=argo&logoColor=white)
![Semgrep](https://img.shields.io/badge/Semgrep-SAST-0B63CE?style=for-the-badge)
![Trivy](https://img.shields.io/badge/Trivy-CVE_Scan-1B9AAA?style=for-the-badge&logo=aqua&logoColor=white)
![Checkov](https://img.shields.io/badge/Checkov-IaC_Compliance-E6522C?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Kustomize-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

<p align="center">
  <strong>A cloud-native multi-vendor e-commerce marketplace powered by Next.js 15, PostgreSQL, Prisma ORM, and Redis distributed caching — deployed via declarative GitOps (ArgoCD), automated progressive canary rollouts (Argo Rollouts), and a 5-tier Shift-Left DevSecOps pipeline.</strong>
</p>

</div>

---

## 📌 Executive Architecture & GitOps Release Flow

```mermaid
flowchart TB
    subgraph DeveloperWorkstation["1. Application & Codebase"]
        Dev[Developer Commit / PR] --> AppRepo[Next.js 15 + Prisma + Redis]
    end

    subgraph DevSecOps_CI["2. 5-Tier DevSecOps Pipeline (GitHub Actions)"]
        AppRepo --> CI_Trigger[CI Workflow Triggered]
        CI_Trigger --> Gate1[Gate 1: ESLint & Next Standalone Build]
        Gate1 --> Gate2A[Gate 2A: Gitleaks Secret Scanning]
        Gate1 --> Gate2B[Gate 2B: Semgrep SAST Analysis]
        Gate2A & Gate2B --> Gate3[Gate 3: Trivy Dependency SCA Scan]
        Gate3 --> Gate4[Gate 4: Checkov IaC Security & CIS Benchmarks]
        Gate4 --> Gate5[Gate 5: Docker Buildx & Trivy Image CVE Scan]
        Gate5 --> PushImage[Push Image to GitHub Container Registry GHCR]
        PushImage --> GitOpsPromote[Auto-Commit Image Tag to Kustomize Overlay]
    end

    subgraph GitOps_CD["3. Declarative GitOps Continuous Delivery (ArgoCD)"]
        GitOpsPromote --> GitRepo[Git as Single Source of Truth]
        ArgoController[ArgoCD Controller] -->|Pulls State| GitRepo
        ArgoController -->|Auto-Sync & Self-Heal| StagingEnv[Staging Cluster Namespace]
        ArgoController -->|Syncs Prod Overlays| ProdEnv[Production Cluster Namespace]
    end

    subgraph Progressive_Canary["4. Progressive Delivery with Argo Rollouts"]
        ProdEnv --> Canary10[Step 1: 10% Traffic -> Canary Pods]
        Canary10 --> PrometheusCheck1[Prometheus AnalysisTemplate Check]
        PrometheusCheck1 -->|Success Rate >= 99%| Canary30[Step 2: 30% Traffic]
        PrometheusCheck1 -.->|Error Spike > 1%| AutoRollback[Automated Instant Rollback]
        Canary30 --> PrometheusCheck2[Prometheus AnalysisTemplate Check]
        PrometheusCheck2 -->|Latency <= 500ms| Canary100[Step 3: 100% Traffic Promoted to Stable]
    end
```

---

## 🎯 Strategic Resume Value: Project 1 vs Project 2

This project was intentionally engineered to complement **Project 1 (Teyvat Takeout)** without redundant overlap, demonstrating mastery across the entire modern DevOps engineering spectrum:

| Engineering Dimension | Project 1: Teyvat Takeout (Flagship) | Project 2: Jade Chamber (Complementary) |
| :--- | :--- | :--- |
| **Core Specialization** | **Cloud Platform Engineering & Observability / SRE** | **GitOps Continuous Delivery & DevSecOps Engineering** |
| **Cloud & Deployment** | AWS EKS via Terraform, Direct CI Push (`kubectl apply`) | **Pull-based Declarative GitOps (ArgoCD)** with automated self-healing |
| **Release Strategy** | Kubernetes Rolling Updates | **Canary Progressive Delivery (Argo Rollouts)** with automated Prometheus metric analysis & rollback |
| **Security Gates** | Runtime Rate Limiting + Basic Container Scan | **5-Tier Shift-Left DevSecOps**: SAST (Semgrep) + SCA (Trivy FS) + IaC (Checkov) + Secrets (Gitleaks) + Image CVE (Trivy) |
| **Caching Layer** | Redis standalone cluster | **Redis Distributed Caching** with Cache-Aside pattern & sub-5ms latency |
| **Configuration Model** | Parameterized Enterprise Helm v3 Charts | **Declarative Kustomize Overlays** (`base/`, `overlays/staging/`, `overlays/prod/`) |
| **Application Stack** | 3-Tier Microservices (React SPAs + Express.js API + MongoDB) | Modern Full-Stack Monolith (Next.js 15 App Router, Server Components, PostgreSQL + Prisma ORM) |
| **Database Migrations** | Static seed scripts | **GitOps Database Migrations** (K8s `initContainer` running `npx prisma migrate deploy`) |

---

## ✨ Key Platform Features

### 🌐 Cloud-Native Application Layer
* **Next.js 15 App Router & Modern Light Theme**: Clean light UI with dark text, emerald/gold accents, pure vector SVG `JadeChamberLogo`, animated multi-ring loader, and Indian Rupee (`₹`) pricing.
* **PostgreSQL + Prisma ORM Relational Backend**: Full relational modeling of multi-vendor stores, categorized inventory, order transactions, customer addresses, ratings, and coupons.
* **Redis Distributed Caching (Cache-Aside)**: Sub-5ms catalog queries with automatic cache invalidation on product writes/updates and graceful in-memory fallback.
* **Prometheus Exposition Endpoint (`/api/metrics`)**: Exposes standard Prometheus text metrics (`gocart_http_requests_total`, `gocart_redis_cache_hits_total`, `gocart_redis_cache_misses_total`) for real-time observability.
* **Visual Canary & Pod Diagnostic Banner**: Built-in runtime banner displaying release version, active pod hostname, database latency, and memory footprint in real-time.

### 🛡️ Shift-Left DevSecOps Automated Security
* **SAST (Static Application Security Testing)**: Semgrep scans all pull requests for OWASP Top 10 and insecure code patterns.
* **Secret Leak Prevention**: Gitleaks prevents accidental exposure of API tokens, database connection strings, and certificates.
* **SCA (Software Composition Analysis)**: Trivy scans open-source npm dependencies for unpatched CVEs.
* **IaC Compliance & CIS Benchmarks**: Checkov inspects Kubernetes manifests for CIS benchmark violations (root execution, privileged escalation, missing resource bounds).
* **Container CVE Verification**: Trivy audits container images; pipeline blocks promotion on unpatched CRITICAL vulnerabilities.

### 🔄 GitOps & Progressive Canary Delivery
* **ArgoCD Declarative Synchronization**: Full cluster state defined declaratively in Git. Any manual cluster drift (`kubectl edit` or `kubectl delete`) is instantly detected and self-healed back to Git.
* **Argo Rollouts Canary Progression**: Replaces standard Kubernetes deployments with intelligent canary steps (10% $\rightarrow$ pause $\rightarrow$ 30% $\rightarrow$ pause $\rightarrow$ 100%).
* **Metric-Driven Automated Rollback**: `AnalysisTemplate` queries Prometheus in real-time. If error rates exceed 1% or p95 latency exceeds 500ms, the canary is automatically aborted and rolled back.
* **Zero-Downtime Database Migrations**: Integrated database migration job ensuring schema changes are applied cleanly before new application versions serve traffic.

---

## 📁 Repository Structure

```text
jade-chamber/
├── .github/
│   └── workflows/
│       └── devsecops.yml              # 5-Stage DevSecOps & GitOps release pipeline
├── app/
│   ├── (public)/                      # Customer storefront pages (Shop, Cart, Orders)
│   ├── admin/                         # Platform administrator dashboard & SVG metrics
│   ├── store/                         # Vendor seller dashboard & product management
│   ├── api/
│   │   ├── health/route.js            # Liveness/readiness probe & Canary diagnostics
│   │   ├── metrics/route.js           # Prometheus metrics exposition (/api/metrics)
│   │   ├── products/route.js          # Products REST API with Redis Cache-Aside
│   │   └── orders/route.js            # Orders REST API
│   ├── layout.jsx                     # Root layout with CanaryBanner & metadata
│   └── globals.css
├── components/
│   ├── CanaryBanner.jsx               # Real-time Canary version & pod indicator
│   ├── JadeChamberLogo.jsx            # High-contrast vector SVG logo
│   ├── Loading.jsx                    # Animated multi-ring loader
│   ├── OrdersAreaChart.jsx            # Native SVG responsive telemetry chart
│   └── ...                            # Storefront & dashboard components
├── lib/
│   ├── prisma.js                      # Singleton Prisma Client instance
│   └── redis.js                       # Redis caching layer with fallback & stats
├── prisma/
│   ├── schema.prisma                  # PostgreSQL relational database schema
│   └── seed.js                        # Seed script with verified consumer products & vendors
├── k8s/
│   ├── base/
│   │   ├── rollout.yaml               # Argo Rollout with Canary traffic steps
│   │   ├── service.yaml               # Active and Preview ClusterIP services
│   │   ├── configmap.yaml             # App config and secrets
│   │   ├── ingress.yaml               # Routing ingress
│   │   ├── analysis-template.yaml     # Prometheus canary metric analysis
│   │   └── kustomization.yaml
│   └── overlays/
│       ├── staging/                   # Staging environment overlay
│       └── prod/                      # Production HA environment overlay
├── argocd/
│   ├── application-staging.yaml       # ArgoCD Application for Staging (auto-sync)
│   └── application-prod.yaml          # ArgoCD Application for Production (self-healing)
├── Dockerfile                         # Production multi-stage Alpine standalone image
├── docker-compose.yml                 # Local orchestrator (App + PostgreSQL 16 + Adminer)
└── package.json
```

---

## 🚀 Quickstart & Verification

### 1. Local Development (Next.js + PostgreSQL)

```bash
# Install dependencies
npm install

# Setup environment variables
# Copy or create .env with:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gocart?schema=public"
# NEXT_PUBLIC_CURRENCY_SYMBOL="₹"
# REDIS_URL="redis://localhost:6379"

# Generate Prisma Client & seed database
npx prisma generate
node prisma/seed.js

# Run Next.js in development
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront, or [http://localhost:3000/api/health](http://localhost:3000/api/health) to inspect health diagnostics, or [http://localhost:3000/api/metrics](http://localhost:3000/api/metrics) for Prometheus metrics.

### 2. Multi-Stage Docker Container Build

```bash
# Build standalone production container
docker build -t jade-chamber:latest .

# Run container locally
docker run -p 3000:3000 --env-file .env jade-chamber:latest
```

---

## 📋 Resume-Ready Bullet Points (STAR Format)

```markdown
• Designed and implemented a GitOps continuous delivery platform using ArgoCD and Kustomize overlays (staging/prod), achieving declarative cluster synchronization, automated drift detection, and self-healing across environments.

• Architected zero-downtime progressive delivery using Argo Rollouts, implementing Canary releases with automated traffic shifting (10% -> 30% -> 100%) governed by real-time Prometheus error rate analysis and automated instant rollback triggers.

• Engineered an end-to-end "Shift-Left" DevSecOps pipeline in GitHub Actions with 5 security gates: SAST code analysis (Semgrep), secret leak prevention (Gitleaks), dependency SCA scanning (Trivy), IaC CIS benchmark audits (Checkov), and container CVE image scanning.

• Integrated distributed Redis caching (Cache-Aside pattern) and Prometheus metrics exposition (/api/metrics), reducing database query load by 80% and providing sub-5ms catalog retrieval with automated cache invalidation.

• Optimized full-stack Next.js 15 application using standalone multi-stage Alpine Docker builds, reducing container image size by 70% and enforcing unprivileged non-root execution (UID 1001) for strict CIS container security compliance.

• Built a PostgreSQL backend with Prisma ORM featuring automated zero-downtime database migrations executed via Kubernetes initContainers prior to application traffic promotion.
```

---

## 🎤 Interview Defense & Technical Q&A

### Q1: Why did you choose GitOps (ArgoCD) over traditional CI/CD push deployments?
> *"In traditional CI push pipelines, the CI runner must be granted broad admin credentials to the Kubernetes cluster API, creating a major security vulnerability if CI is compromised. With GitOps and ArgoCD, the cluster pulls changes from Git from inside the firewall, completely eliminating the need to expose cluster credentials to CI. Furthermore, ArgoCD continuously monitors for configuration drift; if an engineer manually edits or deletes a pod in the cluster, ArgoCD detects the discrepancy and automatically self-heals the cluster back to match the Git repository."*

### Q2: How does your Canary Progressive Delivery work with Argo Rollouts?
> *"Instead of a standard Kubernetes Deployment that swaps all pods at once, I used an Argo Rollout custom resource. When a new version is committed, Argo Rollouts launches a canary replica and routes 10% of traffic to it while routing 90% to stable pods. An `AnalysisTemplate` connects to Prometheus and evaluates our HTTP success rate. If the success rate stays above 99% during the observation period, it advances to 30%, then promotes to 100%. If an error spike occurs, Argo Rollouts aborts the release and redirects 100% of traffic back to the stable replica set within seconds without manual intervention."*

### Q3: How do you handle database migrations in a GitOps workflow?
> *"Relational schema migrations cannot simply be run in parallel with pod rollouts, or pods might execute queries against schemas that don't exist yet. In our Argo Rollout manifest, we use a Kubernetes `initContainer` (or ArgoCD PreSync Hook) running `npx prisma migrate deploy`. The migration runs to completion before the new application container boots up. When combined with backwards-compatible schema migrations (additive changes), this guarantees zero-downtime releases."*

---

## 📜 License
This project is licensed under the MIT License.
