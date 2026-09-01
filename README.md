# GGON FFPO Research Portal — Prototype Sample

Working prototype for the **Global Gas and Oil Network (GGON) Fossil Fuel Phase-Out (FFPO) Research Portal**, built by [Dezari Ventures Ltd](https://www.dezari.co.ke) in response to the GGON Terms of Reference (August 2026).

## What this demonstrates

| ToR requirement | Prototype feature |
|-----------------|-------------------|
| Research library with Boolean search | `/library` — keyword search with `AND` / `OR` |
| Rich metadata filters | Geography, industry side, petroleum chain, RWG priorities, WG, content type, year |
| Members-only access | Registration + login with admin approval queue |
| Four user roles | Owner, Administrator, Editor, Reviewer, Member |
| Submission workflow | `/submit` → admin review queue → approve/reject |
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

## Tech stack (per proposal)

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **i18n:** Client-side locale switching (EN/FR/PT/ES)
- **Data:** Sample in-memory research library (production would use PostgreSQL + API)

## Production roadmap

- PostgreSQL + Prisma for research metadata and full-text search
- NextAuth or similar for session management
- SendGrid/Mailgun + Slack/Asana integrations
- Secure file uploads for research submissions
- Editorial draft/publish workflow for site copy
- Deployment to GGON-owned hosting (DigitalOcean VPS recommended in proposal)

## License

Prototype sample for GGON evaluation — © Dezari Ventures Ltd 2026
