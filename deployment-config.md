# 🔧 Deployment Configuration Reference

## Environment Variables for Local Development

Create a `.env.local` file in your project root with these variables:

```bash
# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Contact Form (if using external service)
NEXT_PUBLIC_CONTACT_EMAIL=info@yourdomain.com

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890

# Social Media Links
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yoursalon
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yoursalon

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## GitHub Secrets Required

These must be added in your GitHub repository settings:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `FTP_SERVER` | Your cPanel FTP server | `ftp.yourdomain.com` |
| `FTP_USERNAME` | FTP username | `yourusername` |
| `FTP_PASSWORD` | FTP password | `yourpassword` |
| `FTP_SERVER_DIR` | Target directory on server | `/public_html/` |

## cPanel FTP Configuration

### Recommended FTP Settings
- **Protocol**: FTP (or FTPS if available)
- **Port**: 21 (default FTP) or 990 (FTPS)
- **Passive Mode**: Enabled (recommended)
- **Directory**: `/public_html/` (or your domain's root)

### Security Best Practices
- Use dedicated FTP account for deployment
- Enable FTPS if your hosting supports it
- Regularly rotate FTP passwords
- Monitor FTP access logs

## Build Configuration

Your `next.config.js` is already optimized for static export:

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

## Deployment Workflow

The workflow automatically:
1. ✅ Builds your Next.js project
2. ✅ Creates static files in `./out/` directory
3. ✅ Uploads files to cPanel via FTP
4. ✅ Excludes unnecessary files
5. ✅ Provides deployment status feedback

## Post-Deployment Checklist

After successful deployment:
- [ ] Clear browser cache
- [ ] Test homepage loads correctly
- [ ] Verify all navigation links work
- [ ] Check mobile responsiveness
- [ ] Test contact form submission
- [ ] Verify WhatsApp chat integration
- [ ] Check image loading
- [ ] Test all interactive features

## Troubleshooting Commands

### Check Build Output Locally
```bash
npm run build
ls -la out/
```

### Test FTP Connection
```bash
ftp yourdomain.com
# Enter credentials and test connection
```

### Verify GitHub Actions
```bash
# Check workflow file syntax
# Ensure secrets are properly set
# Monitor Actions tab for errors
```
