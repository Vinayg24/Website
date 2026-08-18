import { IEnquiry } from '../models/Enquiry'

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const SMTP_FROM = process.env.SMTP_FROM || ''
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ''

const STUDIO_PHONE = '+91 9460142572'
const STUDIO_WHATSAPP = 'https://wa.me/919460142572'

/**
 * Creates Nodemailer Transporter using Gmail SMTP credentials
 */
async function getTransporter() {
  try {
    const nodemailer = await import('nodemailer')
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // TLS via port 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  } catch (err) {
    console.error('Nodemailer import error:', err)
    return null
  }
}

/**
 * Send notification email to admin (ajeetdigitallab@gmail.com)
 * Includes Reply-To header set to the customer's email.
 */
export async function sendAdminNotification(enquiry: IEnquiry): Promise<boolean> {
  const subject = `New Website Enquiry - ${enquiry.name}`

  const textContent = `
==================================================
NEW WEBSITE ENQUIRY RECEIVED
==================================================
Enquiry ID:      ${enquiry.enquiryId}
Customer Name:   ${enquiry.name}
Phone Number:    ${enquiry.phone}
Email Address:   ${enquiry.email}
Selected Service: ${enquiry.service}
Event Date:      ${enquiry.date || 'Not specified'}
Location / City: ${enquiry.location || 'Not specified'}
Submission Time: ${new Date(enquiry.createdAt).toLocaleString()}
Source:          ${enquiry.source}

Customer Message / Vision:
--------------------------------------------------
${enquiry.message || 'No additional details provided.'}
==================================================
`

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #D4AF37; background: #080808; color: #FFFFFF; border-radius: 16px; margin: 0 auto;">
      <div style="border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #D4AF37; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">New Website Lead Received</h2>
        <p style="color: #F5E6B3; margin: 4px 0 0 0; font-size: 13px;">Shree Radha Krishna Studio Inquiry System</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #AAAAAA; width: 140px;">Enquiry ID:</td>
          <td style="padding: 8px 0; color: #F5E6B3; font-weight: bold;">${enquiry.enquiryId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #AAAAAA;">Customer Name:</td>
          <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${enquiry.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #AAAAAA;">Phone Number:</td>
          <td style="padding: 8px 0;"><a href="tel:${enquiry.phone}" style="color: #D4AF37; text-decoration: none; font-weight: bold;">${enquiry.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #AAAAAA;">Email Address:</td>
          <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}" style="color: #D4AF37; text-decoration: none; font-weight: bold;">${enquiry.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #AAAAAA;">Selected Service:</td>
          <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.service}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #AAAAAA;">Event Date:</td>
          <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.date || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #AAAAAA;">Location:</td>
          <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.location || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #AAAAAA;">Submission Time:</td>
          <td style="padding: 8px 0; color: #AAAAAA;">${new Date(enquiry.createdAt).toLocaleString()}</td>
        </tr>
      </table>

      <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-left: 3px solid #D4AF37; border-radius: 6px; margin-bottom: 20px;">
        <p style="margin: 0 0 8px 0; color: #F5E6B3; font-weight: bold; font-size: 12px; text-transform: uppercase;">Customer Message / Vision:</p>
        <p style="margin: 0; color: #E0E0E0; font-size: 14px; line-height: 1.6;">${enquiry.message || 'No additional details provided.'}</p>
      </div>

      <div style="background: rgba(212, 175, 53, 0.1); padding: 12px; border-radius: 8px; text-align: center; font-size: 12px; color: #F5E6B3;">
        💡 <strong>Quick Reply Tip:</strong> Click "Reply" in your email client to respond directly to <strong>${enquiry.email}</strong>.
      </div>
    </div>
  `

  try {
    const transporter = await getTransporter()
    if (!transporter) {
      console.warn('Transporter unavailable, logging notification text to console.')
      return false
    }

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: ADMIN_EMAIL,
      replyTo: enquiry.email, // Reply directly to customer email!
      subject,
      text: textContent,
      html: htmlContent,
    })

    console.log(`[SMTP SUCCESS] Admin notification sent to ${ADMIN_EMAIL} (Message ID: ${info.messageId})`)
    return true
  } catch (err) {
    console.error(`[SMTP ERROR] Failed to send admin email to ${ADMIN_EMAIL}:`, err)
    return false
  }
}

/**
 * Send auto-reply confirmation email to customer
 */
export async function sendCustomerAutoReply(enquiry: IEnquiry): Promise<boolean> {
  const subject = `Thank You for Contacting Shree Radha Krishna Studio`

  const textContent = `
Dear ${enquiry.name},

Thank you for contacting Shree Radha Krishna Studio.

We have received your enquiry (Enquiry ID: ${enquiry.enquiryId}) for ${enquiry.service}.

Our lead coordinator will review your request and contact you shortly.

Studio Contact Information:
• Studio Name: Shree Radha Krishna Studio
• Phone: ${STUDIO_PHONE}
• WhatsApp: ${STUDIO_WHATSAPP}
• Email: ${ADMIN_EMAIL}
• Address: 44 A, Ved Vatika, Ramnagar Extension, Sodala, Jaipur, Rajasthan 302019

Warm Regards,
Shree Radha Krishna Studio Team
`

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #D4AF37; background: #080808; color: #FFFFFF; border-radius: 16px; margin: 0 auto;">
      <div style="text-align: center; border-bottom: 1px solid rgba(212,175,53,0.3); padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #D4AF37; margin: 0 0 4px 0; font-family: Georgia, serif; font-size: 22px;">Shree Radha Krishna Studio</h2>
        <p style="color: #F5E6B3; margin: 0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;">Luxury Photography & Cinematography</p>
      </div>

      <p style="font-size: 15px; color: #FFFFFF; margin-bottom: 12px;">Dear <strong>${enquiry.name}</strong>,</p>

      <p style="font-size: 14px; color: #D0D0D0; line-height: 1.6;">
        Thank you for reaching out to us. We have received your inquiry for <strong>${enquiry.service}</strong> successfully.
      </p>

      <div style="background: rgba(212, 175, 53, 0.12); padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(212,175,53,0.35); margin: 20px 0;">
        <p style="margin: 0; font-size: 13px; color: #F5E6B3;">
          Enquiry Reference ID: <strong style="color: #FFFFFF; font-size: 15px; letter-spacing: 1px;">${enquiry.enquiryId}</strong>
        </p>
      </div>

      <p style="font-size: 14px; color: #D0D0D0; line-height: 1.6;">
        Our lead coordinator is reviewing your event details and will contact you shortly to discuss availability, customized packages, and logistics.
      </p>

      <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />

      <h4 style="color: #F5E6B3; margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Studio Direct Contact Details</h4>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #CCCCCC;">
        <tr>
          <td style="padding: 6px 0; width: 100px;">📞 Phone:</td>
          <td style="padding: 6px 0;"><a href="tel:${STUDIO_PHONE}" style="color: #D4AF37; text-decoration: none; font-weight: bold;">${STUDIO_PHONE}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0;">💬 WhatsApp:</td>
          <td style="padding: 6px 0;"><a href="${STUDIO_WHATSAPP}" style="color: #25D366; text-decoration: none; font-weight: bold;">Chat on WhatsApp</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0;">✉️ Email:</td>
          <td style="padding: 6px 0;"><a href="mailto:${ADMIN_EMAIL}" style="color: #D4AF37; text-decoration: none;">${ADMIN_EMAIL}</a></td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; font-size: 11px; color: #777777;">
        © ${new Date().getFullYear()} Shree Radha Krishna Studio. All Rights Reserved.
      </div>
    </div>
  `

  try {
    const transporter = await getTransporter()
    if (!transporter) return false

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: enquiry.email,
      subject,
      text: textContent,
      html: htmlContent,
    })

    console.log(`[SMTP SUCCESS] Auto-reply confirmation sent to ${enquiry.email} (Message ID: ${info.messageId})`)
    return true
  } catch (err) {
    console.error(`[SMTP ERROR] Failed to send auto-reply to ${enquiry.email}:`, err)
    return false
  }
}
