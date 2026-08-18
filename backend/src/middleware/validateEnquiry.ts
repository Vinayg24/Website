import { Request, Response, NextFunction } from 'express'

function sanitizeInput(text: string): string {
  if (typeof text !== 'string') return ''
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

export function validateEnquiryMiddleware(req: Request, res: Response, next: NextFunction) {
  const { name, phone, email, service, date, location, message } = req.body

  // Sanitize fields
  const cleanName = sanitizeInput(name)
  const cleanPhone = sanitizeInput(phone)
  const cleanEmail = sanitizeInput(email)
  const cleanService = sanitizeInput(service)
  const cleanLocation = sanitizeInput(location)
  const cleanMessage = sanitizeInput(message)

  // 1. Check required fields
  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ error: 'Please enter a valid full name (minimum 2 characters).' })
  }

  if (!cleanPhone) {
    return res.status(400).json({ error: 'Phone number is required.' })
  }

  // Validate phone number format (must have at least 7 digits)
  const phoneDigitsOnly = cleanPhone.replace(/\D/g, '')
  if (phoneDigitsOnly.length < 7 || phoneDigitsOnly.length > 15) {
    return res.status(400).json({ error: 'Please enter a valid phone number (7 to 15 digits).' })
  }

  if (!cleanEmail) {
    return res.status(400).json({ error: 'Email address is required.' })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address (e.g. name@example.com).' })
  }

  if (!cleanService) {
    return res.status(400).json({ error: 'Please select a service.' })
  }

  // Validate event date (past dates not allowed)
  if (date && date.trim() !== '') {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid event date format.' })
    }

    if (selectedDate < today) {
      return res.status(400).json({ error: 'Event date cannot be in the past. Please select today or a future date.' })
    }
  }

  // Attach sanitized data to request body
  req.body = {
    name: cleanName,
    phone: cleanPhone,
    email: cleanEmail,
    service: cleanService,
    date: date ? sanitizeInput(date) : '',
    location: cleanLocation,
    message: cleanMessage,
  }

  next()
}
