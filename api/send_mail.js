// Vercel API endpoint for handling form submissions
import multer from 'multer';
import nodemailer from 'nodemailer';

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5
  }
});

// Multer middleware handler for Vercel
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Function to generate email HTML
function generateEmailHtml(data) {
  const { name, email, company, message, selectedServices = [], files = [] } = data;
  
  // Create list of services
  const servicesList = selectedServices.length > 0 
    ? selectedServices.map(s => `<li>${typeof s === 'string' ? s : (s.title || 'Service')}</li>`).join('') 
    : '<p>No specific services selected.</p>';
  
  // Create list of files
  const filesList = files.length > 0
    ? files.map(f => `<li>${f.name || f.originalname || 'File'}</li>`).join('')
    : '';
  
  // Build HTML - modified for better deliverability
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Inquiry from Magpollo Website</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;">
          <tr>
            <td align="center">
              <h1 style="color: #ef4444; margin-bottom: 20px;">New Inquiry from Magpollo Website</h1>
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 5px;">
              <h2 style="margin-top: 0;">Contact Information</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #ef4444;">${email}</a></p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 5px;">
              <h2 style="margin-top: 0;">Services Requested</h2>
              ${servicesList ? `<ul>${servicesList}</ul>` : '<p>No specific services selected.</p>'}
            </td>
          </tr>
        </table>
        
        ${message ? `
        <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 5px;">
              <h2 style="margin-top: 0;">Message</h2>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </td>
          </tr>
        </table>
        ` : ''}
        
        ${filesList ? `
        <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 5px;">
              <h2 style="margin-top: 0;">Attachments</h2>
              <ul>${filesList}</ul>
            </td>
          </tr>
        </table>
        ` : ''}
        
        <table width="100%" cellpadding="10" cellspacing="0" style="border-top: 1px solid #ddd; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding-top: 20px;">
              <p style="color: #777; font-size: 14px; margin: 5px 0;">&copy; ${new Date().getFullYear()} Magpollo. All rights reserved.</p>
              <p style="color: #777; font-size: 14px; margin: 5px 0;">This is an automated message from the Magpollo website contact form.</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// Forward the enquiry to the Magpollo outbound engine, which turns it into a
// lead with a drafted reply for the team to review. Server-side only, so the
// token never reaches the browser. Never blocks or fails the form: the email
// below is still the source of record.
async function forwardToEngine(req, { name, email, company, message, details }) {
  const token = process.env.INBOUND_TOKEN;
  if (!token) return;
  const base = (process.env.ENGINE_URL || 'https://mgp-engine.vercel.app').replace(/\/$/, '');
  let phone;
  try {
    const rows = details ? JSON.parse(details) : [];
    phone = Array.isArray(rows) ? rows.find((r) => r && r.label === 'Phone')?.value : undefined;
  } catch {
    phone = undefined;
  }
  try {
    const r = await fetch(`${base}/api/inbound`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        email,
        company: company || undefined,
        phone: phone || undefined,
        message: message || undefined,
        page: req.headers.referer || 'magpollo.com/lets-build',
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) console.error('Engine inbound failed:', r.status, await r.text().catch(() => ''));
  } catch (e) {
    console.error('Engine inbound error:', e?.message || e);
  }
}

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Process file uploads first
    try {
      await runMiddleware(req, res, upload.array('file'));
      console.log('Files processed successfully:', req.files?.length || 0, 'files uploaded');
    } catch (uploadError) {
      console.error('Error processing file uploads:', uploadError);
      return res.status(400).json({ 
        message: 'Error processing file uploads',
        error: uploadError.message
      });
    }

    const {
      name,
      email,
      company,
      message,
      selectedServices,
      emailHtml
    } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Runs alongside the email; awaited before responding (serverless).
    const engine = forwardToEngine(req, { name, email, company, message, details: req.body.details });

    // Generate or use provided HTML email
    let finalHtml = emailHtml;
    
    if (!finalHtml) {
      let servicesArray = [];
      try {
        // Parse selected services
        if (selectedServices) {
          const parsedServices = JSON.parse(selectedServices);
          // Handle both formats - array of strings or array of objects
          servicesArray = Array.isArray(parsedServices) 
            ? parsedServices.map((item, index) => {
                // If item is already an object with id and title, use it
                if (typeof item === 'object' && item.title) {
                  return item;
                }
                // If item is a string, create an object
                return { id: index + 1, title: item };
              })
            : [];
        }
        
        // Generate email HTML directly - no imports
        finalHtml = generateEmailHtml({
          name,
          email,
          company, 
          message,
          selectedServices: servicesArray,
          files: req.files || []
        });
        
      } catch (e) {
        console.error('Error generating email HTML:', e);
        
        // Ultimate fallback - super simple email
        finalHtml = `
          <h1>New Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          <p><strong>Files Attached:</strong> ${req.files?.length || 0}</p>
        `;
      }
    }

    // Validate SMTP credentials are available
    const smtpUser = process.env.SENDINBLUE_USER || process.env.SMTP_USER;
    const smtpPass = process.env.SENDINBLUE_PASS || process.env.SMTP_PASSWORD;
    
    if (!smtpUser || !smtpPass) {
      console.error('SMTP credentials missing. Available env vars:', Object.keys(process.env).filter(k => k.includes('SMTP') || k.includes('SENDINBLUE') || k.includes('EMAIL')));
      return res.status(500).json({ 
        message: 'Email service not configured. Please contact support.',
        error: 'Missing SMTP credentials'
      });
    }

    // Setup email transporter using SendInBlue/Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: true
      },
      // No connection pooling - incompatible with serverless environments
      connectionTimeout: 10000, // 10 second connection timeout
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    // Prepare attachments if any
    const attachments = req.files ? req.files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    })) : [];

    // Email options
    const mailOptions = {
      from: `"Magpollo Website" <${process.env.EMAIL_FROM || 'noreply@magpollo.com'}>`,
      to: process.env.EMAIL_TO || 'salesteam@magpollo.com',
      replyTo: email,
      subject: `New Inquiry from ${name} - Magpollo Website`,
      html: finalHtml,
      attachments,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High',
        'X-Mailer': 'Magpollo Website Contact Form',
        'List-Unsubscribe': `<mailto:${process.env.EMAIL_FROM || 'noreply@magpollo.com'}?subject=unsubscribe>`
      }
    };

    // Add CC recipients if configured
    if (process.env.EMAIL_CC) {
      // Handle both comma-separated string and single email address
      mailOptions.cc = process.env.EMAIL_CC;
      console.log('Added CC recipients:', process.env.EMAIL_CC);
    }

    // Send the email
    const [info] = await Promise.all([transporter.sendMail(mailOptions), engine]);
    console.log('Email sent successfully:', info.messageId);
    console.log('Email accepted by:', info.accepted);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    return res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
} 