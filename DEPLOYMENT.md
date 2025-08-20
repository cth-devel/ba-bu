# 🚀 Deployment Guide - GitHub Actions to cPanel

This guide will help you set up automated deployment from GitHub to your cPanel hosting using GitHub Actions.

## 📋 Prerequisites

- GitHub repository with your Next.js project
- cPanel hosting account with FTP access
- FTP credentials (server, username, password)

## 🔧 Setup Steps

### 1. GitHub Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, then add these secrets:

```
FTP_SERVER        - Your cPanel FTP server (e.g., ftp.yourdomain.com)
FTP_USERNAME      - Your cPanel FTP username
FTP_PASSWORD      - Your cPanel FTP password
FTP_SERVER_DIR    - Target directory on server (e.g., /public_html/)
```

### 2. cPanel Configuration

#### FTP Account Setup
1. Log into your cPanel
2. Go to "FTP Accounts"
3. Create a new FTP account or use existing
4. Note down the FTP server, username, and password

#### Directory Structure
- **Local build output**: `./out/` (Next.js static export)
- **Server target**: Usually `/public_html/` or your domain's root directory

### 3. Workflow Triggers

The workflow automatically runs on:
- ✅ Push to `main` or `master` branch
- ✅ Manual trigger via GitHub Actions tab

## 🏗️ Build Process

1. **Checkout**: Downloads your latest code
2. **Node Setup**: Installs Node.js 18 with npm caching
3. **Dependencies**: Installs all npm packages
4. **Build**: Creates static export in `./out/` directory
5. **Deploy**: Uploads files to cPanel via FTP

## 📁 File Exclusions

The workflow automatically excludes:
- Git files and directories
- Node modules
- Environment files
- README and documentation
- GitHub workflow files

## 🔍 Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check for TypeScript errors

#### FTP Connection Issues
- Verify FTP credentials in GitHub secrets
- Check if FTP server allows connections
- Ensure server directory path is correct

#### Deployment Failures
- Check cPanel disk space
- Verify file permissions on server
- Check FTP account limits

### Debug Steps

1. **Check Actions Logs**: Go to Actions tab → Click on failed workflow → Review logs
2. **Verify Secrets**: Ensure all secrets are correctly set
3. **Test FTP**: Try connecting manually with FTP client
4. **Check Build Output**: Verify `./out/` directory contains files after build

## 🚀 Manual Deployment

To deploy manually:
1. Go to Actions tab in GitHub
2. Select "Deploy to cPanel" workflow
3. Click "Run workflow"
4. Select branch and click "Run workflow"

## 📱 Post-Deployment

After successful deployment:
1. Clear browser cache
2. Test all pages and functionality
3. Check mobile responsiveness
4. Verify form submissions work
5. Test WhatsApp chat integration

## 🔒 Security Notes

- Never commit FTP credentials to your repository
- Use dedicated FTP account for deployment
- Regularly rotate FTP passwords
- Monitor deployment logs for suspicious activity

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs first
2. Verify cPanel FTP settings
3. Test manual FTP connection
4. Contact your hosting provider if needed

---

**Happy Deploying! 🎉**
