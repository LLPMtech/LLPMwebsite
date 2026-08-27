import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

async function createHubSpotContact(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const [firstname, ...rest] = data.name.trim().split(' ');
  const lastname = rest.join(' ') || '';

  // Create or update contact
  const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HUBSPOT_API_KEY}`,
    },
    body: JSON.stringify({
      properties: {
        firstname,
        lastname,
        email: data.email,
        phone: data.phone || '',
        hs_lead_status: 'NEW',
        message: data.message,
      },
    }),
  });

  const contact = await contactRes.json();
  console.log('HubSpot contact response:', JSON.stringify(contact));
  const contactId = contact.id;

  if (!contactId) return;

  // Log the message as a note on the contact
  await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HUBSPOT_API_KEY}`,
    },
    body: JSON.stringify({
      properties: {
        hs_note_body: `Subject: ${data.subject}\n\n${data.message}`,
        hs_timestamp: new Date().toISOString(),
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
        },
      ],
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Send email via Resend
    await resend.emails.send({
      from: 'LLPM Website <noreply@lifelongpropertymanagement.com>',
      to: ['pm@lifelongpm.com'],
      cc: ['lindsey@lifelongpropertymanagement.com'],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1F3A5F; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
            <p style="color: #ccc; margin: 4px 0 0;">Life Long Property Management Website</p>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #eee; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1F3A5F; width: 120px;">Name:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1F3A5F;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1F3A5F;">Phone:</td>
                <td style="padding: 8px 0;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1F3A5F;">Subject:</td>
                <td style="padding: 8px 0;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 6px; border: 1px solid #eee;">
              <p style="font-weight: bold; color: #1F3A5F; margin: 0 0 8px;">Message:</p>
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 16px; color: #999; font-size: 12px;">Sent from lifelongpropertymanagement.com</p>
          </div>
        </div>
      `,
    });

    // Send auto-reply
    await resend.emails.send({
      from: 'Life Long Property Management <noreply@lifelongpropertymanagement.com>',
      to: [email],
      subject: 'We received your message — Life Long Property Management',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1F3A5F; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Thank You, ${name}!</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #eee; border-radius: 0 0 8px 8px;">
            <p>We've received your message and will be in touch shortly.</p>
            <p>If you need immediate assistance, please contact us directly:</p>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 4px 0;">📞 <strong>(512) 892-6001</strong></li>
              <li style="padding: 4px 0;">✉️ <strong>pm@lifelongpm.com</strong></li>
              <li style="padding: 4px 0;">📍 <strong>5716 Hwy 290 West #200, Austin, TX 78735</strong></li>
            </ul>
            <p style="color: #999; font-size: 12px; margin-top: 24px;">Life Long Property Management | lifelongpropertymanagement.com</p>
          </div>
        </div>
      `,
    });

    // Create HubSpot contact
    await createHubSpotContact({ name, email, phone, subject, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
