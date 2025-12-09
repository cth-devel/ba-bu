# Email Configuration Setup for Contact Form

The contact form on the homepage is now configured to send emails to `info@babufamilysalon.com`. 

## Setup Instructions

### 1. Create `.env.local` file

Create a file named `.env.local` in the root directory of your project (same level as `package.json`).

### 2. Add your email configuration

Copy the following configuration into your `.env.local` file and replace the placeholder values with your actual cPanel email settings:

```env
# Email Configuration for Contact Form

# SMTP Server Settings
# For cPanel email accounts, typically:
# - Host: mail.yourdomain.com (e.g., mail.babufamilysalon.com) or your server's mail host
# - Port: 587 for TLS/STARTTLS or 465 for SSL
# - User: Your full email address (info@babufamilysalon.com)
# - Password: Your email account password

SMTP_HOST=mail.babufamilysalon.com
SMTP_PORT=587
SMTP_USER=info@babufamilysalon.com
SMTP_PASSWORD=your_email_password_here

# Recipient Email (where contact form submissions will be sent)
RECIPIENT_EMAIL=info@babufamilysalon.com
```

### 3. Fill in your actual values

Replace the following with your actual cPanel email settings:

- **SMTP_HOST**: Usually `mail.babufamilysalon.com` or your cPanel mail server hostname
- **SMTP_PORT**: 
  - `587` for TLS/STARTTLS (most common)
  - `465` for SSL/TLS
- **SMTP_USER**: `info@babufamilysalon.com` (your full email address)
- **SMTP_PASSWORD**: The password for your email account
- **RECIPIENT_EMAIL**: `info@babufamilysalon.com` (where you want to receive form submissions)

### 4. Common cPanel SMTP Settings

Most cPanel hosting providers use these settings:

- **Host**: `mail.yourdomain.com` or `cpanelmail.yourdomain.com`
- **Port 587**: Use with STARTTLS/TLS (recommended)
- **Port 465**: Use with SSL/TLS
- **Authentication**: Required (use full email address as username)

### 5. Testing

After setting up your `.env.local` file:

1. Restart your Next.js development server (`npm run dev`)
2. Fill out the contact form on your homepage
3. Submit the form
4. Check `info@babufamilysalon.com` inbox for the form submission

### Important Notes

- The `.env.local` file is automatically ignored by git (it's in `.gitignore`)
- Never commit your `.env.local` file to version control
- Keep your email password secure
- If emails are not being sent, check:
  - Your cPanel email account is active
  - SMTP settings are correct
  - Port is not blocked by firewall
  - Email account password is correct

## Troubleshooting

If emails are not being sent:

1. **Check server logs**: Look for errors in your terminal/console
2. **Verify SMTP settings**: Double-check host, port, username, and password
3. **Test email account**: Try logging into the email account directly to ensure it's working
4. **Check cPanel**: Ensure the email account is properly set up in cPanel
5. **Firewall**: Ensure the SMTP port (587 or 465) is not blocked

## Support

If you need help finding your SMTP settings:
1. Log into your cPanel
2. Go to "Email Accounts"
3. Select your email account
4. Look for "Connect Devices" or "Configure Mail Client"
5. Use the SMTP settings provided there

