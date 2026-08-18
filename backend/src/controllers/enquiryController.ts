import { Request, Response } from 'express'
import { saveEnquiry, getAllEnquiries, getEnquiryById } from '../services/enquiryStore'
import { sendAdminNotification, sendCustomerAutoReply } from '../services/emailService'

export async function createEnquiryController(req: Request, res: Response) {
  try {
    const { name, phone, email, service, date, location, message } = req.body

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.ip || req.socket.remoteAddress || 'unknown'
    const userAgent = req.headers['user-agent'] || 'unknown'

    // Save to Persistent Store / Database
    const enquiry = await saveEnquiry({
      name,
      phone,
      email,
      service,
      date,
      location,
      message,
      ipAddress,
      userAgent,
    })

    // Asynchronously trigger email notifications
    Promise.all([
      sendAdminNotification(enquiry),
      sendCustomerAutoReply(enquiry)
    ]).catch(err => {
      console.error('Non-blocking error sending notification emails:', err)
    })

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.',
      enquiryId: enquiry.enquiryId,
      data: {
        enquiryId: enquiry.enquiryId,
        name: enquiry.name,
        service: enquiry.service,
        createdAt: enquiry.createdAt,
      }
    })
  } catch (error: any) {
    console.error('Error handling createEnquiryController:', error)
    return res.status(500).json({
      error: 'An unexpected error occurred while processing your enquiry. Please try again or call us directly at +91 9460142572.'
    })
  }
}

export async function getEnquiriesController(req: Request, res: Response) {
  try {
    const enquiries = await getAllEnquiries()
    return res.status(200).json({ success: true, count: enquiries.length, data: enquiries })
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve enquiries' })
  }
}
