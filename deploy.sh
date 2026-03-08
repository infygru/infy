#!/bin/bash
# ============================================================
#  Infygru — VPS Deploy Script
#  Usage: bash deploy.sh
# ============================================================
set -e

echo "🚀 Starting deployment..."

# 1. Pull latest code from GitHub
echo "📦 Pulling latest code..."
git pull origin master

# 2. Install / update dependencies (skip dev deps in production)
echo "📥 Installing dependencies..."
npm ci --omit=dev

# 3. Build the Next.js app
echo "🏗️  Building Next.js..."
npm run build

# 4. Create logs directory if it doesn't exist
mkdir -p logs

# 5. Restart PM2 (or start fresh if not running)
echo "🔄 Restarting PM2..."
pm2 startOrRestart ecosystem.config.js --env production

# 6. Save PM2 process list so it survives reboots
pm2 save

echo "✅ Deployment complete! Site is live."
