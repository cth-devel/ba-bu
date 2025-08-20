#!/bin/bash

echo "🚀 Setting up GitHub Actions Deployment for Ba-Bu Salon"
echo "======================================================"
echo ""

# Check if .github/workflows directory exists
if [ ! -d ".github/workflows" ]; then
    echo "📁 Creating .github/workflows directory..."
    mkdir -p .github/workflows
fi

echo "✅ GitHub Actions workflow directory ready!"
echo ""

echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. 🔐 Add GitHub Secrets:"
echo "   - Go to your GitHub repository"
echo "   - Settings → Secrets and variables → Actions"
echo "   - Add these secrets:"
echo "     * FTP_SERVER (e.g., ftp.yourdomain.com)"
echo "     * FTP_USERNAME (your cPanel FTP username)"
echo "     * FTP_PASSWORD (your cPanel FTP password)"
echo "     * FTP_SERVER_DIR (e.g., /public_html/)"
echo ""
echo "2. 🚀 Push to main/master branch to trigger deployment"
echo ""
echo "3. 📊 Monitor deployment in Actions tab"
echo ""
echo "4. 🌐 Check your live website after successful deployment"
echo ""

echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""

# Check if workflow file exists
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ Deployment workflow is ready!"
else
    echo "❌ Deployment workflow not found. Please ensure deploy.yml is created."
fi

echo ""
echo "🎉 Setup complete! Happy deploying!"
