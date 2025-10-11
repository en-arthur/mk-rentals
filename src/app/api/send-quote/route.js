import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Check if credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing email credentials. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env');
      return NextResponse.json(
        { success: false, message: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    console.log('Creating email transporter for:', process.env.GMAIL_USER);
    
    // Create transporter with Gmail SMTP with proper connection handling
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail service shorthand
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      // Additional options for better reliability
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates in dev
      },
      debug: true, // Enable debug output
      logger: true // Enable logging
    });

    // Format the items list
    const itemsList = data.items.split('\n').map(item => `  • ${item}`).join('\n');

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: data.email, // Customer can reply directly
      subject: `New Quote Request from ${data.name} - MK RENTALS`,
      text: `
NEW QUOTE REQUEST - MK RENTALS
================================

CUSTOMER INFORMATION:
---------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

EVENT DETAILS:
--------------
Event Type: ${data.eventType || 'Not specified'}
Event Date: ${data.eventDate || 'Not specified'}
Event Location: ${data.eventLocation || 'Not specified'}
Number of Guests: ${data.guestCount || 'Not specified'}

RENTAL DETAILS:
---------------
Start Date: ${data.startDate}
End Date: ${data.endDate}
Delivery Needed: ${data.needsDelivery ? 'Yes' : 'No'}

ITEMS REQUESTED:
----------------
${itemsList}

ADDITIONAL INFORMATION:
-----------------------
${data.message || 'None'}

================================
Reply to this email to respond directly to the customer.
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 25px; }
    .section-title { color: #f97316; font-weight: bold; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #f97316; padding-bottom: 5px; }
    .info-row { margin: 8px 0; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; }
    .items-list { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #f97316; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🎉 NEW QUOTE REQUEST</h1>
      <p style="margin: 5px 0 0 0;">MK RENTALS - Takoradi</p>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="section-title">👤 CUSTOMER INFORMATION</div>
        <div class="info-row"><span class="label">Name:</span> <span class="value">${data.name}</span></div>
        <div class="info-row"><span class="label">Email:</span> <span class="value">${data.email}</span></div>
        <div class="info-row"><span class="label">Phone:</span> <span class="value">${data.phone}</span></div>
      </div>

      <div class="section">
        <div class="section-title">🎊 EVENT DETAILS</div>
        <div class="info-row"><span class="label">Event Type:</span> <span class="value">${data.eventType || 'Not specified'}</span></div>
        <div class="info-row"><span class="label">Event Date:</span> <span class="value">${data.eventDate || 'Not specified'}</span></div>
        <div class="info-row"><span class="label">Location:</span> <span class="value">${data.eventLocation || 'Not specified'}</span></div>
        <div class="info-row"><span class="label">Number of Guests:</span> <span class="value">${data.guestCount || 'Not specified'}</span></div>
      </div>

      <div class="section">
        <div class="section-title">📅 RENTAL PERIOD</div>
        <div class="info-row"><span class="label">Start Date:</span> <span class="value">${data.startDate}</span></div>
        <div class="info-row"><span class="label">End Date:</span> <span class="value">${data.endDate}</span></div>
        <div class="info-row"><span class="label">Delivery Needed:</span> <span class="value">${data.needsDelivery ? '✅ Yes' : '❌ No'}</span></div>
      </div>

      <div class="section">
        <div class="section-title">📦 ITEMS REQUESTED</div>
        <div class="items-list">
          ${data.items.split('\n').map(item => `<div style="margin: 5px 0;">• ${item}</div>`).join('')}
        </div>
      </div>

      ${data.message ? `
      <div class="section">
        <div class="section-title">💬 ADDITIONAL INFORMATION</div>
        <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #ea580c;">
          ${data.message}
        </div>
      </div>
      ` : ''}

      <div class="footer">
        <p><strong>💡 Tip:</strong> Reply to this email to respond directly to the customer.</p>
        <p style="margin-top: 10px;">MK RENTALS | GPS-WS-451-7513, Pastry Close, Sawmill Down, Takoradi | 0249 536993</p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    // Close the transporter
    transporter.close();

    return NextResponse.json(
      { success: true, message: 'Quote request sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('=== EMAIL ERROR DETAILS ===');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error command:', error.command);
    console.error('Full error:', error);
    console.error('=========================');
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send quote request. Please try again or call us directly.';
    
    if (error.code === 'EAUTH') {
      console.error('⚠️ Authentication failed. Check GMAIL_USER and GMAIL_APP_PASSWORD in .env');
      console.error('⚠️ Make sure you are using a Gmail App Password, not your regular password');
      console.error('⚠️ Generate one at: https://myaccount.google.com/apppasswords');
      errorMessage = 'Email configuration error. Please contact support.';
    } else if (error.code === 'ESOCKET' || error.message?.includes('socket')) {
      console.error('⚠️ Socket connection error. Possible causes:');
      console.error('   - Invalid Gmail credentials');
      console.error('   - Network/firewall blocking port 465/587');
      console.error('   - Gmail App Password not configured');
      errorMessage = 'Connection error. Please try again.';
    } else if (error.code === 'ETIMEDOUT') {
      console.error('⚠️ Connection timeout - network may be blocking SMTP');
      errorMessage = 'Request timed out. Please try again.';
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
