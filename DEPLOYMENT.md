# Deployment Guide

This guide explains how to deploy the Multystamps website to production.

## Prerequisites

1. **Vercel CLI installed locally** (already installed as dev dependency)
2. **Vercel account** connected to your GitHub repository
3. **Vercel authentication** - Run `npx vercel login` if not already logged in
4. **Domain configured** (`multystamps.be` should be added in Vercel dashboard)

> **Note**: The deploy script will check authentication automatically and prompt you if needed.

## Important Notes

⚠️ **Branch Configuration**: 
- Vercel is configured to auto-deploy from the `main` branch
- We work on the `master` branch locally
- The deploy script automatically syncs `master` → `main`

## Quick Deployment

### Option 1: Using the Deploy Script (Recommended)

The easiest way to deploy is using the provided script:

```bash
# Make the script executable (first time only)
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

The script will automatically:
1. ✅ Check Vercel authentication
2. ✅ Check for uncommitted changes (prompts to commit if needed)
3. ✅ Push changes to `master` branch
4. ✅ Sync `master` to `main` branch
5. ✅ Push to `main` (triggers Vercel auto-deployment)
6. ✅ Wait for deployment to complete (up to 2 minutes)
7. ✅ Automatically find the latest ready deployment
8. ✅ Update domain alias to the latest deployment
9. ✅ Switch you back to `master` branch
10. ✅ Show deployment summary

**The script now handles everything automatically - no manual steps needed!**

### Option 2: Manual Deployment

If you prefer to deploy manually:

```bash
# 1. Commit your changes
git add .
git commit -m "Your commit message"

# 2. Push to master
git push origin master

# 3. Switch to main and merge
git checkout main
git merge master --no-edit

# 4. Push to main (triggers Vercel)
git push origin main

# 5. Wait for deployment, then update alias
# (Check Vercel dashboard for latest deployment URL)
npx vercel alias set <DEPLOYMENT_URL> multystamps.be

# 6. Switch back to master
git checkout master
```

### Option 3: Direct Vercel CLI Deployment

For quick deployments without GitHub sync:

```bash
npx vercel --prod --force
npx vercel alias set <DEPLOYMENT_URL> multystamps.be
```

⚠️ **Note**: This deploys from local files, not from GitHub. For production, prefer using the script or manual method to keep GitHub in sync.

## Troubleshooting

### Domain shows old version

1. **Check deployment status**: `npx vercel ls --prod`
2. **Update domain alias**: `npx vercel alias set <LATEST_DEPLOYMENT_URL> multystamps.be`
3. **Clear browser cache**: Hard refresh with `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
4. **Wait for CDN propagation**: Can take 1-5 minutes

### Deployment fails

1. Check Vercel dashboard for build errors
2. Verify all dependencies are in `package.json`
3. Check build logs: `npx vercel inspect <DEPLOYMENT_URL> --logs`

### Branch sync issues

If `main` and `master` get out of sync:

```bash
git checkout main
git reset --hard master
git push origin main --force
```

⚠️ **Warning**: Only do this if you're sure `master` has the correct code!

### Website shows "Not Secure" (SSL/HTTPS issues)

If your browser shows the website as "not secure", follow these steps:

1. **Verify domain is added in Vercel**:
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Ensure `multystamps.be` is listed and shows "Valid Configuration"
   - If not listed, add it manually

2. **Check DNS configuration**:
   - Verify DNS records point to Vercel (usually a CNAME to `cname.vercel-dns.com`)
   - Use `npx vercel domains ls` to see domain status
   - DNS propagation can take up to 48 hours

3. **Wait for SSL certificate**:
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - This can take a few minutes to a few hours after domain is added
   - Check certificate status in Vercel Dashboard → Domains

4. **Force HTTPS**:
   - Vercel automatically redirects HTTP to HTTPS
   - The security headers in `next.config.js` enforce HTTPS
   - Clear browser cache and try accessing `https://multystamps.be` directly

5. **Verify SSL certificate**:
   ```bash
   # Check domain configuration
   npx vercel domains ls
   
   # Check if domain is properly aliased
   npx vercel alias ls
   ```

6. **If SSL still not working**:
   - Remove and re-add the domain in Vercel dashboard
   - Wait 10-15 minutes for certificate provisioning
   - Contact Vercel support if issue persists

## Project Structure

```
multy-website/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── deploy.sh             # Deployment script
├── DEPLOYMENT.md         # This file
└── README.md            # General project info
```

## Vercel Configuration

- **Project**: `multy-website`
- **Repository**: `eminyilmazdata/multy-website-deploy`
- **Production Branch**: `main`
- **Domain**: `multystamps.be`
- **Framework**: Next.js (auto-detected)

## Useful Commands

```bash
# View all deployments
npx vercel ls --prod

# View domain aliases
npx vercel alias ls

# Inspect a deployment
npx vercel inspect <DEPLOYMENT_URL> --logs

# Check domain configuration
npx vercel domains ls
```

## Support

If you encounter issues:
1. Check the Vercel dashboard: https://vercel.com/dashboard
2. Review deployment logs in the Vercel dashboard
3. Check GitHub repository: https://github.com/eminyilmazdata/multy-website-deploy

