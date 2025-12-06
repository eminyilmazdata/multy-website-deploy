# DNS Configuration Fix for multystamps.be

## Problem Identified

Your domain `multystamps.be` is currently using **One.com nameservers** instead of **Vercel nameservers**. This prevents Vercel from automatically managing DNS and provisioning SSL certificates, which is why your browser shows "Not Secure".

**Current Status:**
- Current Nameservers: `ns01.one.com`, `ns02.one.com` ✘
- Required Nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com` ✓

## Solution: Change Nameservers to Vercel

### Step-by-Step Instructions

1. **Log into One.com**
   - Go to https://www.one.com/
   - Log into your account

2. **Navigate to Domain Management**
   - Find `multystamps.be` in your domain list
   - Click on it to access DNS/Nameserver settings

3. **Change Nameservers**
   - Look for "Nameservers" or "DNS Settings"
   - Change from:
     - `ns01.one.com`
     - `ns02.one.com`
   - To:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`

4. **Save Changes**
   - Save the nameserver changes
   - One.com may send a confirmation email

5. **Wait for DNS Propagation**
   - DNS changes can take 24-48 hours to fully propagate
   - Usually works within 1-2 hours
   - You can check status with:
     ```bash
     npx vercel domains inspect multystamps.be
     ```
   - Look for ✓ next to nameservers when ready

6. **Verify SSL Certificate**
   - Once nameservers are updated, Vercel will automatically:
     - Verify domain ownership
     - Provision SSL certificate (usually within minutes)
   - Check in Vercel Dashboard → Settings → Domains
   - Status should show "Valid Configuration"

## Alternative: Keep One.com Nameservers (Not Recommended)

If you must keep One.com nameservers, you need to manually configure DNS records:

### DNS Records to Add in One.com:

1. **A Record** (for apex domain):
   - Name: `@` (or leave blank)
   - Type: `A`
   - Value: `76.76.21.21`
   - TTL: 3600 (or default)

2. **CNAME Record** (for www subdomain):
   - Name: `www`
   - Type: `CNAME`
   - Value: `cname.vercel-dns.com`
   - TTL: 3600 (or default)

3. **CAA Record** (allows Vercel to issue SSL):
   - Name: `@` (or leave blank)
   - Type: `CAA`
   - Value: `0 issue "letsencrypt.org"`
   - TTL: 3600 (or default)

**Note**: This method requires manual DNS management and may have delays in SSL certificate provisioning.

## Verification Commands

After making changes, verify with:

```bash
# Check nameserver status
npx vercel domains inspect multystamps.be

# Check DNS records
dig multystamps.be NS
dig multystamps.be A

# Check SSL certificate
openssl s_client -connect multystamps.be:443 -servername multystamps.be < /dev/null 2>&1 | grep "Verify return code"
```

## Expected Result

After nameservers are updated and propagated:
- ✅ Nameservers show ✓ in Vercel
- ✅ Domain shows "Valid Configuration" in Vercel Dashboard
- ✅ SSL certificate is automatically provisioned
- ✅ Browser shows secure padlock icon
- ✅ Website accessible at https://multystamps.be

## Need Help?

If you encounter issues:
1. Check Vercel Dashboard → Settings → Domains for error messages
2. Wait 24-48 hours for full DNS propagation
3. Contact Vercel Support: https://vercel.com/support
4. Contact One.com Support if you need help changing nameservers

