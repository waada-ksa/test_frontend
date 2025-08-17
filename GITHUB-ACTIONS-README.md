# GitHub Actions Setup Guide

This guide explains how to set up GitHub Actions for your React frontend application, including Docker image building and Slack notifications.

## 🚀 Workflows Overview

### 1. **Build Application** (`.github/workflows/ci-cd.yml`)
- **Complete CI/CD pipeline** with build, test, Docker, and deploy
- **Multi-environment deployment** support (development and production)
- **Comprehensive testing** and artifact management
- **Independent workflow** - can run separately from others

### 2. **Docker Build** (`.github/workflows/docker-build.yml`)
- **Focused workflow** specifically for Docker image building
- **Automated tagging** with commit SHA and branch names
- **Slack notifications** for build status
- **Independent workflow** - can run separately from others

### 3. **Notify Team** (`.github/workflows/test-build.yml`)
- **Lightweight workflow** for quick feedback and team notifications
- **Build artifacts** storage for 7 days
- **Slack notifications** for team updates
- **Independent workflow** - can run separately from others

## 🔧 Setup Instructions

### Step 1: Enable GitHub Actions
1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Click **Enable Actions** if not already enabled

### Step 2: Set up Slack Integration

#### Option A: Using Slack Webhook (Recommended)
1. **Create a Slack App**:
   - Go to [api.slack.com/apps](https://api.slack.com/apps)
   - Click **Create New App** → **From scratch**
   - Give it a name (e.g., "GitHub Actions Bot")
   - Select your workspace

2. **Enable Incoming Webhooks**:
   - In the left sidebar, click **Incoming Webhooks**
   - Toggle **Activate Incoming Webhooks** to **On**
   - Click **Add New Webhook to Workspace**
   - Select the channel where you want notifications (e.g., `#deployments`, `#alerts`)
   - Copy the **Webhook URL**

3. **Add Webhook URL to GitHub Secrets**:
   - Go to your GitHub repository
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `SLACK_WEBHOOK_URL`
   - Value: Paste your Slack webhook URL
   - Click **Add secret**

#### Option B: Using Slack Bot Token (Advanced)
1. **Create a Slack App** (same as above)
2. **Add Bot Token Scopes**:
   - Go to **OAuth & Permissions**
   - Add scopes: `chat:write`, `channels:read`
3. **Install App to Workspace**
4. **Copy Bot User OAuth Token**
5. **Add to GitHub Secrets** as `SLACK_BOT_TOKEN`

### Step 3: Configure GitHub Container Registry

1. **Enable Container Registry**:
   - Go to your GitHub repository
   - Click **Settings** → **Packages**
   - Ensure **Inherit access from source repository** is enabled

2. **Set Repository Permissions**:
   - Go to **Settings** → **Actions** → **General**
   - Scroll to **Workflow permissions**
   - Enable **Read and write permissions**
   - Check **Allow GitHub Actions to create and approve pull requests**

### Step 4: Create Required Channels in Slack

Create these channels in your Slack workspace:
- `#deployments` - For successful deployment notifications
- `#builds` - For build and test notifications  
- `#alerts` - For failure notifications

## 📋 Workflow Triggers

### Automatic Triggers
- **Push to main/develop**: Triggers all workflows independently
- **Pull Request to main**: Triggers all workflows independently

### Manual Triggers
You can also run workflows manually:
1. Go to **Actions** tab
2. Select the workflow you want to run
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## 🔄 Sequential Workflow Execution

The workflows now run in a **specific sequence** when triggered automatically:

### **1. Build Application** → **2. Notify Team** → **3. Docker Build**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Build App     │───▶│  Notify Team    │───▶│  Docker Build   │
│                 │    │                 │    │                 │
│ ✅ Success      │    │ ✅ Success      │    │ ✅ Success      │
│ ❌ Failure      │    │ ❌ Failure      │    │ ❌ Failure      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
       │                       │                       │
       ▼                       ▼                       ▼
   🔴 Stop if failed      📢 Team notification    🐳 Image created
   ✅ Continue if success  📦 Build artifacts      🚀 Deploy ready
```

1. **Build Application** runs first:
   - Builds and tests the application
   - If successful, triggers the next workflows
   - If failed, stops and sends failure notification

2. **Notify Team** runs second (after successful build):
   - Runs tests and builds again for verification
   - Sends detailed status notifications to team
   - Provides build artifacts for download

3. **Docker Build** runs third (after successful build):
   - Creates and pushes Docker images
   - Tags images with commit SHA and branch names
   - Sends deployment notifications

### **Manual Execution**
You can still run each workflow manually via `workflow_dispatch`:
- **Individual workflows**: Run any workflow separately
- **Full sequence**: Push to main/develop to trigger the complete sequence
- **Custom triggers**: Run specific workflows based on your needs

## 🔍 Monitoring and Debugging

### View Workflow Runs
1. Go to **Actions** tab
2. Click on any workflow run
3. View detailed logs for each step

### Common Issues and Solutions

#### Docker Build Failures
- **Permission denied**: Ensure workflow has `packages: write` permission
- **Authentication failed**: Check `GITHUB_TOKEN` secret
- **Build context too large**: Review `.dockerignore` file

#### Slack Notification Failures
- **Webhook URL invalid**: Verify `SLACK_WEBHOOK_URL` secret
- **Channel not found**: Ensure channel exists and bot has access
- **Rate limiting**: Slack has rate limits; consider batching notifications

## 🎯 Customization

### Modify Slack Messages
Edit the `text` field in workflow files:
```yaml
text: '🚀 Your custom message here!'
```

### Add More Channels
Add multiple notification steps:
```yaml
- name: Notify Team Channel
  uses: 8398a7/action-slack@v3
  with:
    channel: '#team-updates'
    text: 'Custom team message'
```

### Environment-Specific Deployments
Add environment protection rules:
1. Go to **Settings** → **Environments**
2. Create environments (e.g., `staging`, `production`)
3. Add required reviewers or wait timers

## 📊 Advanced Features

### Matrix Builds
Run workflows on multiple Node.js versions:
```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
```

### Caching
Optimize build times with caching:
```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### Conditional Steps
Run steps only under certain conditions:
```yaml
- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  run: echo "Deploying to staging"
```

## 🚨 Security Best Practices

1. **Never commit secrets** to your repository
2. **Use least privilege** for workflow permissions
3. **Review third-party actions** before using them
4. **Enable branch protection** for main branch
5. **Require status checks** before merging

## 📞 Support

If you encounter issues:
1. Check the **Actions** tab for error logs
2. Verify all secrets are properly configured
3. Ensure Slack app has proper permissions
4. Check GitHub Container Registry access

## 🔄 Next Steps

After setup:
1. **Test the workflows** by pushing to a feature branch
2. **Monitor notifications** in your Slack channels
3. **Customize messages** and channels as needed
4. **Add deployment steps** for your specific infrastructure
5. **Set up branch protection** rules for production deployments
