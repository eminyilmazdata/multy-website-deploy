# Multystamps Website

Contact page for multystamps.be with links to email and Delcampe webshop.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Deployment

**Quick Deploy** (Recommended):
```bash
./deploy.sh
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Reference

- **Repository**: `eminyilmazdata/multy-website-deploy`
- **Production Branch**: `main` (Vercel auto-deploys from this branch)
- **Working Branch**: `master` (use this for development)
- **Domain**: `multystamps.be`
- **Deploy Script**: `./deploy.sh` (automates the entire process)

## Project Structure

- `app/page.tsx` - Main contact page
- `app/layout.tsx` - Root layout with metadata
- `app/globals.css` - Global styles
- `deploy.sh` - Automated deployment script
- `DEPLOYMENT.md` - Detailed deployment guide

