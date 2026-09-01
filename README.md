# GGON FFPO Research Portal — Prototype Sample

Working prototype for the **Global Gas and Oil Network (GGON) Fossil Fuel Phase-Out (FFPO) Research Portal**, built by [Dezari Ventures Ltd](https://www.dezari.co.ke) in response to the GGON Terms of Reference (August 2026).

## What this demonstrates

| ToR requirement | Prototype feature |
|-----------------|-------------------|
| Research library with Boolean search | `/library` — keyword search with `AND` / `OR` |
| Rich metadata filters | Geography, industry side, petroleum chain, RWG priorities, WG, content type, year |
| Members-only access | Registration + login with admin approval queue |
| Four user roles | Owner, Administrator, Editor, Reviewer, Member |
| Submission workflow | `/submit` → metadata + files → reviewer approve → editor publish |
| Admin dashboard | `/admin` — stats, submissions, registrations, role management |
| Multilingual UI | EN / FR / PT / ES language switcher |
| Priority themes & narratives | `/themes`, `/narratives` |
| Member directory & Ask & Connect | `/members`, `/ask-connect` |
| Responsive design | Mobile-friendly Tailwind layout |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo accounts

Password for all: **`demo123`**

| Email | Role |
|-------|------|
| `owner@ggon.demo` | Owner |
| `admin@ggon.demo` | Administrator |
| `editor@ggon.demo` | Editor |
| `reviewer@ggon.demo` | Reviewer |
| `member@ggon.demo` | Member |

### Submission workflow (demo)

1. **Member** (`member@ggon.demo`) — `/submit` with metadata, cover image, and PDF/files
2. **Reviewer** (`reviewer@ggon.demo`) — `/admin` → **Approve for publishing**
3. **Editor** (`editor@ggon.demo`) — `/admin` → add body text → **Publish to library**
4. Published article appears in `/library` with full layout and downloads

## Tech stack (per proposal)

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **i18n:** Client-side locale switching (EN/FR/PT/ES)
- **Data:** Sample in-memory research library (production would use PostgreSQL + API)

## Deployment (CI/CD)

### Live site (Vercel — free)

**Recommended:** connect Vercel directly to GitHub (no secrets required). This fixes `DEPLOYMENT_NOT_FOUND` when the deploy workflow was never run.

1. Go to [vercel.com/new](https://vercel.com/new) → sign in with GitHub
2. **Import** `thegeektets/ggon-ffpo-research-portal`
3. Framework: **Next.js** (auto-detected) → **Deploy**
4. Every push to `main` redeploys automatically via the Vercel GitHub app

Your live URL will be something like `https://ggon-ffpo-research-portal.vercel.app` (shown in the Vercel dashboard after a successful build).

If you see `404 DEPLOYMENT_NOT_FOUND`, the project has no successful deployment yet — open the Vercel project → **Deployments** → check the latest build log, or delete the project and re-import from GitHub.

### CI (GitHub Actions)

`CI` workflow runs on every push/PR to `main`: `npm ci` → lint → build.

> **Note:** If pushing workflow files fails with `workflow scope` error, run once:
> `gh auth refresh -h github.com -s workflow`
> then `git push origin main`

Optional: add Vercel CLI deploy via Actions later using `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets — not required when using Vercel's GitHub integration above.

## Production roadmap

- PostgreSQL + Prisma for research metadata and full-text search
- NextAuth or similar for session management
- SendGrid/Mailgun + Slack/Asana integrations
- Secure file uploads for research submissions
- Editorial draft/publish workflow for site copy
- Deployment to GGON-owned hosting (DigitalOcean VPS recommended in proposal)

## License

Prototype sample for GGON evaluation — © Dezari Ventures Ltd 2026
