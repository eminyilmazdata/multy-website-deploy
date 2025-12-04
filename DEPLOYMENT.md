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

If your browser shows the website as "not secure", the most common cause is **incorrect DNS nameserver configuration**.

#### Quick Diagnosis

Check your domain configuration:
```bash
npx vercel domains inspect multystamps.be
```

Look for the **Nameservers** section. If it shows:
- ✘ Current Nameservers: `ns01.one.com`, `ns02.one.com` (or other third-party)
- Intended Nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`

**This is the problem!** Vercel needs to manage your DNS to automatically provision SSL certificates.

#### Solution: Configure DNS Nameservers

You have **two options**:

##### Option 1: Use Vercel Nameservers (Recommended - Easiest)

1. **Log into your domain registrar** (One.com in this case)
2. **Navigate to DNS/Nameserver settings** for `multystamps.be`
3. **Change nameservers to**:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. **Save changes** and wait 24-48 hours for DNS propagation
5. **Verify in Vercel**: Run `npx vercel domains inspect multystamps.be` - nameservers should show ✓

**Benefits**: Vercel automatically manages DNS and SSL certificates. No manual DNS record management needed.

##### Option 2: Keep Current Nameservers (Advanced)

If you must keep One.com nameservers, configure DNS records manually:

1. **In One.com DNS panel**, add these records:
   - **A Record**: `@` (or blank) → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
   - **CAA Record**: `@` → `0 issue "letsencrypt.org"` (allows Vercel to issue SSL)

2. **Wait for DNS propagation** (can take up to 48 hours)

3. **Verify DNS**:
   ```bash
   dig multystamps.be +short  # Should show Vercel IP
   dig www.multystamps.be +short  # Should show cname.vercel-dns.com
   ```

#### After DNS Configuration

1. **Wait for SSL certificate provisioning**:
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - This can take a few minutes to a few hours after DNS is correct
   - Check certificate status in Vercel Dashboard → Domains

2. **Verify SSL certificate**:
   ```bash
   openssl s_client -connect multystamps.be:443 -servername multystamps.be < /dev/null 2>&1 | grep "Verify return code"
   # Should show: Verify return code: 0 (ok)
   ```

3. **Test the website**:
   - Clear browser cache: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Visit `https://multystamps.be` directly
   - The security headers in `next.config.js` enforce HTTPS

#### Still Not Working?

1. **Check domain status in Vercel Dashboard**:
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Ensure `multystamps.be` shows "Valid Configuration"

2. **Remove and re-add domain**:
   - Remove domain from Vercel dashboard
   - Wait 5 minutes
   - Re-add the domain
   - Wait for DNS verification and SSL provisioning

3. **Contact support**:
   - Vercel Support: https://vercel.com/support
   - Include output from: `npx vercel domains inspect multystamps.be`

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

