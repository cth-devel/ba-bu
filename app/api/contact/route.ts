import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: 'Name, phone, and service are required fields' },
        { status: 400 }
      );
    }

    // Check if PHP mail endpoint is configured (preferred method)
    const phpMailUrl = process.env.PHP_MAIL_URL;
    
    if (phpMailUrl) {
      // Use PHP mail endpoint
      try {
        const phpResponse = await fetch(phpMailUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const phpData = await phpResponse.json();

        if (!phpResponse.ok) {
          throw new Error(phpData.error || 'PHP mail failed');
        }

        return NextResponse.json(
          {
            message: 'Email sent successfully!',
            method: 'php',
          },
          { status: 200 }
        );
      } catch (phpError) {
        console.error('PHP mail error:', phpError);
        // Fall through to try SMTP method if configured
      }
    }

    // Fall back to SMTP method
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'info@babufamilysalon.com';

    // Validate email configuration
    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error('Missing email configuration:', {
        hasHost: !!smtpHost,
        hasUser: !!smtpUser,
        hasPassword: !!smtpPassword,
      });
      return NextResponse.json(
        { error: 'Email service is not configured properly. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Create transporter with cPanel configuration
    // Port 465 typically requires SSL, so we'll use secure: true
    // But with relaxed TLS settings for better compatibility
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // Use SSL for port 465
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      tls: {
        // Allow self-signed certificates
        rejectUnauthorized: false,
        // Minimum TLS version
        minVersion: 'TLSv1',
      },
      connectionTimeout: 10000, // 10 seconds timeout
      greetingTimeout: 10000,
      socketTimeout: 10000,
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development',
    } as any);

    // Email content
    const emailSubject = `New Contact Form Submission from ${name} - BA-BU Family Salon`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(to right, #77530a, #ffd277); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
            <p style="color: white; margin: 5px 0 0 0;">BA-BU Family Salon</p>
          </div>
          <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="margin-top: 0;"><strong>You have received a new contact form submission:</strong></p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              ${email ? `
              <tr>
                <td style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #77530a;">${email}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #77530a;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
                <td style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #eee;">${service}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee; white-space: pre-wrap;">${message}</td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd;">
              <p style="margin: 0; color: #666; font-size: 12px;">This email was sent from the BA-BU Family Salon contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Contact Form Submission - BA-BU Family Salon

You have received a new contact form submission:

Name: ${name}
${email ? `Email: ${email}` : ''}
Phone: ${phone}
Service: ${service}
${message ? `\nMessage:\n${message}` : ''}

---
This email was sent from the BA-BU Family Salon contact form.
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"BA-BU Family Salon Contact Form" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email || smtpUser,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { 
        message: 'Email sent successfully!',
        messageId: info.messageId 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide more specific error information
    let errorMessage = 'Failed to send email. Please try again later or contact us directly.';
    
    if (error instanceof Error) {
      if (error.message.includes('EAUTH') || error.message.includes('authentication')) {
        errorMessage = 'Email authentication failed. Please verify your email credentials are correct.';
        console.error('Authentication error - check SMTP_USER and SMTP_PASSWORD in .env.local');
        console.error('Tip: Some cPanel setups require just the username part (e.g., "info") instead of full email');
      } else if (error.message.includes('ECONNECTION') || error.message.includes('connection')) {
        errorMessage = 'Unable to connect to email server. Please check your SMTP settings.';
        console.error('Connection error - check SMTP_HOST and SMTP_PORT');
      }
    }
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    );
  }
}

