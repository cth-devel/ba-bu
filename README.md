# 🎨 BA-BU Family Salon - Next.js Website

A modern, responsive website for BA-BU Family Salon built with Next.js 15, TypeScript, and TailwindCSS. Features automated deployment to cPanel via GitHub Actions.

## 🚀 Live Sites

- **Production**: [babu.cloudtobuild.com](https://babu.cloudtobuild.com)
- **Staging**: [stage.babu.cloudtobuild.com](https://stage.babu.cloudtobuild.com)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript 5.2.2
- **Styling**: TailwindCSS 3.3.3
- **UI Components**: Shadcn UI + Radix UI
- **Animations**: Framer Motion + GSAP
- **Forms**: React Hook Form + Zod
- **Deployment**: GitHub Actions + cPanel FTP

## 📁 Project Structure

```
ba-bu/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog page
│   ├── services/          # Services page
│   ├── works/             # Portfolio pages
│   │   ├── salon/         # Salon gallery
│   │   └── wedding/       # Wedding gallery
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact form
│   ├── Gallery.tsx       # Image gallery
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   └── WhatsAppChat.tsx  # WhatsApp integration
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml        # Deployment workflow
└── public/               # Static assets
    ├── images/           # Image files
    └── fonts/            # Custom fonts
```

## 🔄 GitHub Actions Workflow

### Overview
The project uses a **staging → production** deployment pipeline with automated builds and FTP deployment to cPanel.

### Workflow Triggers
- **Staging**: Push to `staging` branch → Auto-deploy to staging environment
- **Production**: Merge PR from `staging` to `main` → Auto-deploy to production
- **Manual**: Use "Run workflow" button for any branch

### Deployment Jobs

#### 1. Staging Deployment (`deploy-staging`)
- **Trigger**: Push to `staging` branch
- **Target**: `/home4/babubuild/stage.babu.cloudtobuild.com/`
- **Sync State**: `.ftp-deploy-sync-staging.json`

#### 2. Production Deployment (`deploy-production`)
- **Trigger**: Merge PR from `staging` to `main`
- **Target**: `/home4/babubuild/public_html/`
- **Sync State**: `.ftp-deploy-sync-prod.json`

### Build Process
1. **Checkout**: Downloads latest code
2. **Node Setup**: Installs Node.js 20 with npm caching
3. **Dependencies**: Installs all npm packages
4. **Build**: Creates static export in `./out/` directory
5. **Deploy**: Uploads files to cPanel via FTPS

## 🔐 Required GitHub Secrets

Add these secrets in your GitHub repository → Settings → Secrets and variables → Actions:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `CPANEL_FTP_SERVER` | Your cPanel FTP server | `ftp.cloudtobuild.com` |
| `CPANEL_FTP_USERNAME` | Your cPanel FTP username | `your_username` |
| `CPANEL_FTP_PASSWORD` | Your cPanel FTP password | `your_password` |

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Git
- cPanel hosting with FTP access

### Local Development
```bash
# Clone the repository
git clone https://github.com/cth-devel/ba-bu.git
cd ba-bu

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
Create a `.env.local` file in your project root:
```bash
# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Contact Form
NEXT_PUBLIC_CONTACT_EMAIL=info@yourdomain.com

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890

# Social Media Links
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yoursalon
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yoursalon
```

## 🏗️ Build Configuration

The project is configured for static export in `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',           // Static export for cPanel
  eslint: {
    ignoreDuringBuilds: true, // Skip linting during build
  },
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true         // Required for static export
  },
};
```

## 📱 Features

- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern Animations**: GSAP animations and Framer Motion
- **Image Gallery**: Dynamic portfolio galleries for salon and wedding services
- **Contact Forms**: React Hook Form with Zod validation
- **WhatsApp Integration**: Direct chat integration
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Performance**: Optimized images and lazy loading

## 🔄 Deployment Workflow

### 1. Development Workflow
```bash
# Work on feature branch
git checkout -b feature/new-service

# Make changes and commit
git add .
git commit -m "Add new service feature"

# Push to staging for testing
git checkout staging
git merge feature/new-service
git push origin staging
```

### 2. Staging Deployment
- Push to `staging` branch triggers automatic deployment
- Files deploy to staging environment
- Test all functionality on staging site

### 3. Production Deployment
- Create Pull Request from `staging` to `main`
- Review and approve changes
- Merge PR triggers automatic production deployment
- Files deploy to live production site

## 🛠️ Troubleshooting

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

## 📊 Monitoring

### GitHub Actions
- Monitor deployment status in Actions tab
- Check build logs for errors
- Verify deployment success/failure

### Post-Deployment Checklist
- [ ] Clear browser cache
- [ ] Test homepage loads correctly
- [ ] Verify all navigation links work
- [ ] Check mobile responsiveness
- [ ] Test contact form submission
- [ ] Verify WhatsApp chat integration
- [ ] Check image loading
- [ ] Test all interactive features

## 🔒 Security

- **FTP Credentials**: Stored as GitHub secrets, never committed to repository
- **Dedicated FTP Account**: Use separate account for deployment only
- **Regular Updates**: Keep dependencies and Node.js version updated
- **Access Control**: Limit repository access to authorized team members

## 📞 Support

### For Deployment Issues
1. Check GitHub Actions logs first
2. Verify cPanel FTP settings
3. Test manual FTP connection
4. Contact hosting provider if needed

### For Development Issues
1. Check TypeScript compilation errors
2. Verify all dependencies are installed
3. Check Next.js configuration
4. Review component prop types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for BA-BU Family Salon.

## 🎉 Acknowledgments

- Built with Next.js and modern web technologies
- Deployed with GitHub Actions automation
- Hosted on cPanel with FTPS security
- Designed for optimal user experience and performance

---

**Happy Deploying! 🚀**

For questions about deployment, check the [Actions tab](https://github.com/cth-devel/ba-bu/actions) in the repository.