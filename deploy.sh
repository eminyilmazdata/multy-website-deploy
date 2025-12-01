#!/bin/bash

# Deploy script for multystamps.be
# This script automates the deployment process to Vercel

# Don't exit on error - we'll handle errors manually
set +e

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Vercel authentication
echo -e "${BLUE}🔐 Checking Vercel authentication...${NC}"
if ! npx vercel whoami &>/dev/null; then
    echo -e "${YELLOW}⚠️  Not authenticated with Vercel. Please run: npx vercel login${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Authenticated with Vercel${NC}"

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}Current branch: $CURRENT_BRANCH${NC}"

# Step 1: Make sure all changes are committed
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes.${NC}"
    read -p "Do you want to commit them? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Commit message: " COMMIT_MSG
        git commit -m "${COMMIT_MSG:-Update website}"
    else
        echo -e "${RED}❌ Please commit or stash your changes before deploying.${NC}"
        exit 1
    fi
fi

# Step 2: Push to master branch
echo -e "${GREEN}📤 Pushing to master branch...${NC}"
if ! git push origin master; then
    echo -e "${RED}❌ Failed to push to master. Please check your git configuration.${NC}"
    exit 1
fi

# Step 3: Switch to main branch and merge master
echo -e "${GREEN}🔄 Syncing main branch with master...${NC}"
git checkout main || {
    echo -e "${YELLOW}⚠️  Main branch doesn't exist locally. Creating it...${NC}"
    git checkout -b main origin/main 2>/dev/null || git checkout -b main
}
git merge master --no-edit || {
    echo -e "${RED}❌ Merge failed. You may need to resolve conflicts manually.${NC}"
    exit 1
}

# Step 4: Push to main branch (this triggers Vercel auto-deploy)
echo -e "${GREEN}📤 Pushing to main branch (triggers Vercel deployment)...${NC}"
if ! git push origin main; then
    echo -e "${RED}❌ Failed to push to main. Deployment may not trigger.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Push successful! Vercel should start deploying automatically.${NC}"

# Step 5: Wait for Vercel to start building and complete
echo -e "${YELLOW}⏳ Waiting for Vercel deployment to start (20 seconds)...${NC}"
sleep 20

# Step 6: Find the latest deployment and wait for it to be ready
echo -e "${GREEN}🔍 Finding latest deployment...${NC}"
MAX_ATTEMPTS=12
ATTEMPT=0
LATEST_DEPLOYMENT=""

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    ATTEMPT=$((ATTEMPT + 1))
    
    # Get the most recent deployment (first line after header)
    DEPLOYMENT_INFO=$(npx vercel ls --prod 2>/dev/null | grep -E "● (Ready|Building|Queued)" | head -1)
    
    if [ -n "$DEPLOYMENT_INFO" ]; then
        DEPLOYMENT_STATUS=$(echo "$DEPLOYMENT_INFO" | grep -oE "(Ready|Building|Queued)")
        DEPLOYMENT_URL=$(echo "$DEPLOYMENT_INFO" | awk '{print $NF}')
        
        if [ "$DEPLOYMENT_STATUS" = "Ready" ]; then
            LATEST_DEPLOYMENT="$DEPLOYMENT_URL"
            echo -e "${GREEN}✅ Found ready deployment: $LATEST_DEPLOYMENT${NC}"
            break
        else
            echo -e "${YELLOW}⏳ Deployment status: $DEPLOYMENT_STATUS (attempt $ATTEMPT/$MAX_ATTEMPTS)...${NC}"
            if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
                sleep 10
            fi
        fi
    else
        echo -e "${YELLOW}⏳ Waiting for deployment to appear (attempt $ATTEMPT/$MAX_ATTEMPTS)...${NC}"
        sleep 10
    fi
done

# Step 7: Update domain alias
if [ -n "$LATEST_DEPLOYMENT" ]; then
    echo -e "${GREEN}🔗 Updating domain alias to: $LATEST_DEPLOYMENT${NC}"
    if npx vercel alias set "$LATEST_DEPLOYMENT" multystamps.be 2>/dev/null; then
        echo -e "${GREEN}✅ Domain alias updated successfully!${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not update alias automatically. Trying alternative method...${NC}"
        # Try with full URL format
        npx vercel alias set "https://$LATEST_DEPLOYMENT" multystamps.be || {
            echo -e "${RED}❌ Failed to update alias. Please update manually in Vercel dashboard.${NC}"
            echo -e "${YELLOW}   Deployment URL: $LATEST_DEPLOYMENT${NC}"
        }
    fi
else
    echo -e "${RED}❌ Could not find a ready deployment after $MAX_ATTEMPTS attempts.${NC}"
    echo -e "${YELLOW}📋 Showing recent deployments:${NC}"
    npx vercel ls --prod | head -10
    echo ""
    echo -e "${YELLOW}⚠️  Please update the domain alias manually in Vercel dashboard.${NC}"
    echo -e "${YELLOW}   Or wait a few minutes and run: npx vercel alias set <DEPLOYMENT_URL> multystamps.be${NC}"
fi

# Switch back to master branch
echo -e "${GREEN}🔄 Switching back to master branch...${NC}"
git checkout master

# Final summary
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Deployment process complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
if [ -n "$LATEST_DEPLOYMENT" ]; then
    echo -e "${GREEN}🌐 Site URL: https://multystamps.be${NC}"
    echo -e "${BLUE}📦 Deployment: $LATEST_DEPLOYMENT${NC}"
else
    echo -e "${YELLOW}🌐 Site URL: https://multystamps.be${NC}"
    echo -e "${YELLOW}⚠️  Domain alias may need manual update${NC}"
fi
echo -e "${YELLOW}💡 Note: Changes may take 1-2 minutes to propagate${NC}"
echo -e "${YELLOW}💡 If you don't see changes, try a hard refresh (Cmd+Shift+R)${NC}"
echo ""
echo -e "${GREEN}✨ All done!${NC}"

