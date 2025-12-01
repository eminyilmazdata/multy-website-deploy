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
NC='\033[0m' # No Color

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
git push origin master

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
git push origin main

# Step 5: Wait a bit for Vercel to start building
echo -e "${YELLOW}⏳ Waiting for Vercel to start building (15 seconds)...${NC}"
sleep 15

# Step 6: Get the latest deployment
echo -e "${GREEN}🔍 Finding latest deployment...${NC}"
sleep 5  # Give Vercel a moment to process

# Try to get the latest deployment URL
LATEST_DEPLOYMENT=$(npx vercel ls --prod 2>/dev/null | grep "Ready" | head -1 | awk '{print $NF}')

# If that didn't work, try alternative method
if [ -z "$LATEST_DEPLOYMENT" ]; then
    echo -e "${YELLOW}⚠️  Could not auto-detect deployment. Checking Vercel...${NC}"
    npx vercel ls --prod
    echo ""
    read -p "Please enter the latest deployment URL (or press Enter to skip alias update): " LATEST_DEPLOYMENT
fi

# Step 7: Update domain alias (if we have a deployment URL)
if [ -n "$LATEST_DEPLOYMENT" ]; then
    echo -e "${GREEN}🔗 Updating domain alias to: $LATEST_DEPLOYMENT${NC}"
    npx vercel alias set "$LATEST_DEPLOYMENT" multystamps.be || {
        echo -e "${YELLOW}⚠️  Could not update alias automatically. You may need to update it manually in Vercel dashboard.${NC}"
    }
else
    echo -e "${YELLOW}⚠️  Skipping alias update. Please update manually in Vercel dashboard.${NC}"
fi

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Your site should be live at: https://multystamps.be${NC}"
echo -e "${YELLOW}💡 Note: It may take a few minutes for DNS/CDN to propagate.${NC}"

# Switch back to master branch
git checkout master

echo -e "${GREEN}✨ All done!${NC}"

