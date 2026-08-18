export interface IEnquiry {
  id: string
  enquiryId: string
  name: string
  phone: string
  email: string
  service: string
  date: string
  location: string
  message: string
  createdAt: string
  status: 'New' | 'Contacted' | 'Booked' | 'Closed'
  source: 'Website'
  ipAddress?: string
  userAgent?: string
}

export function generateEnquiryId(): string {
  const year = new Date().getFullYear()
  const randomDigits = Math.floor(1000 + Math.random() * 9000)
  return `SRK-${year}-${randomDigits}`
}
