# PHP Mail Setup Guide

This guide explains how to set up PHP mail as an alternative to SMTP for sending contact form emails.

## Step 1: Upload PHP Script to Your Server

1. **Upload the `send-email.php` file** to your cPanel server:
   - Log into cPanel
   - Open File Manager
   - Navigate to `public_html` (or your domain's root directory)
   - Upload `send-email.php` to this location
   - Make sure the file permissions are set to 644 (readable by web server)

2. **Test the PHP file URL**:
   - The file should be accessible at: `https://babufamilysalon.com/send-email.php`
   - Or: `https://www.babufamilysalon.com/send-email.php`
   - Make sure it loads without errors (it will return JSON)

## Step 2: Configure Next.js to Use PHP Mail

1. **Update your `.env.local` file** with the PHP endpoint URL:

```env
# PHP Mail Configuration (Preferred method)
PHP_MAIL_URL=https://babufamilysalon.com/send-email.php

# Optionally, keep SMTP config as fallback (or remove it)
# SMTP_HOST=mail.babufamilysalon.com
# SMTP_PORT=465
# SMTP_USER=info@babufamilysalon.com
# SMTP_PASSWORD=your_password
# RECIPIENT_EMAIL=info@babufamilysalon.com
```

2. **Important**: Replace `babufamilysalon.com` with your actual domain name

## Step 3: Restart Your Development Server

After updating `.env.local`:
```bash
npm run dev
```

## Step 4: Test the Contact Form

1. Fill out the contact form on your homepage
2. Submit it
3. Check `info@babufamilysalon.com` inbox

## Security Considerations

The PHP script is currently open (no authentication). For better security, you can:

1. **Add a simple token authentication** in `send-email.php`:
   ```php
   $authToken = 'your-secret-token-here';
   $providedToken = $_POST['token'] ?? '';
   
   if ($providedToken !== $authToken) {
       http_response_code(401);
       echo json_encode(['error' => 'Unauthorized']);
       exit;
   }
   ```

2. **Add it to `.env.local`**:
   ```env
   PHP_MAIL_TOKEN=your-secret-token-here
   ```

3. **Update the API route** to include the token when calling PHP endpoint

## Troubleshooting

### PHP mail() not working

If emails aren't being sent, check:

1. **PHP mail() function** - Some hosting providers disable mail()
   - Contact your hosting provider to enable it
   - Or check cPanel email settings

2. **Email delivery** - PHP mail() might send but emails go to spam
   - Check spam folder
   - Consider using a proper email service if mail() is unreliable

3. **File permissions** - Make sure `send-email.php` has correct permissions (644)

4. **URL accessibility** - Test the PHP endpoint directly in browser
   - Should return JSON response
   - If you see PHP errors, check server logs in cPanel

### Alternative: Direct cPanel Email

If PHP mail() doesn't work, you can also:
- Use cPanel's email forwarding
- Set up email aliases
- Use third-party email services (SendGrid, Mailgun, etc.)

## Advantages of PHP Mail

✅ No SMTP authentication required  
✅ Uses cPanel's built-in mail system  
✅ Simpler setup  
✅ Usually more reliable on cPanel hosting  
✅ No need for email credentials  

## Next Steps

Once PHP mail is working:
1. You can remove SMTP configuration from `.env.local` (optional)
2. Test form submission thoroughly
3. Monitor email delivery
4. Check spam folder initially

