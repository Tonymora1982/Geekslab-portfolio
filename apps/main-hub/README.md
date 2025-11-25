# Anthony Mora | Senior Full Stack Developer Portfolio

> "R&D discipline meets modern web engineering."

Portfolio showcasing my transition from 5+ years in Medical Device R&D (Establishment Labs, ISO 13485) to Full Stack Development. Built with a minimalist aesthetic emphasizing performance, testing, and transparency.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Vercel Postgres](https://vercel.com/postgres) + [Drizzle ORM](https://orm.drizzle.team/)
- **Testing**: [Vitest](https://vitest.dev/) (37 tests)
- **CI/CD**: GitHub Actions (Tests + Lighthouse)
- **Deployment**: [Vercel](https://vercel.com)

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Installation

```bash
# From monorepo root
npm install
```

### Environment Setup

```bash
# Copy example env file
cp .env.example .env.local

# Required variables:
# - POSTGRES_URL (Vercel Postgres)
# - RESEND_API_KEY (for RFC emails)
# - NEXT_PUBLIC_FORMSPREE_ID (contact form)
```

### Database Setup

```bash
# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample SLA data (30 days)
npm run db:seed

# Open Drizzle Studio (visual DB explorer)
npm run db:studio
```

### Development

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Testing

```bash
# From monorepo root
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Production Build

```bash
npm run build
npm run start
```

## 📂 Project Structure

```
apps/main-hub/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (SLA, RFC, Analytics)
│   ├── components/        # Page-specific components
│   └── [pages]/           # Route pages
├── db/                    # Database
│   ├── schema.ts          # Drizzle schema
│   ├── index.ts           # DB connection
│   └── seed.ts            # Seed script
└── public/                # Static assets

packages/ui/
├── src/
│   ├── components/        # Shared UI components
│   ├── lib/              # Utilities (RFC scoring, etc.)
│   └── __tests__/        # Vitest tests
└── vitest.config.ts
```

## 🧪 Test Coverage

- **RFC Scoring System**: 37 tests covering validation, scoring algorithms, decision thresholds, and letter generation
- **CI/CD**: Automated testing on every push/PR
- **Lighthouse**: Performance audits on deployment

## 📊 Features

- **Evidence Layer**: Live SLA metrics, experiment logs, RFC scoring
- **Inverse Application**: Companies apply to work with you (scored automatically)
- **Bilingual**: Full EN/ES support
- **Performance**: 98+ Lighthouse score target

## 🔗 Links

- **Live**: [geekslab.tech](https://geekslab.tech)
- **GitHub**: [Tonymora1982/Geekslab-portfolio](https://github.com/Tonymora1982/Geekslab-portfolio)
- **LinkedIn**: [Anthony Mora Parra](https://linkedin.com/in/anthonymoraparra)

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
