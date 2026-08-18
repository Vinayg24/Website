import { createClient } from '@supabase/supabase-js'
import { IEnquiry, generateEnquiryId } from '../models/Enquiry'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] SUPABASE_URL or SUPABASE_SERVICE_KEY is not set. Enquiry storage will fail.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function saveEnquiry(
  data: Omit<IEnquiry, 'id' | 'enquiryId' | 'createdAt' | 'status' | 'source'>
): Promise<IEnquiry> {
  const enquiry: IEnquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    enquiryId: generateEnquiryId(),
    ...data,
    createdAt: new Date().toISOString(),
    status: 'New',
    source: 'Website',
  }

  const { error } = await supabase.from('enquiries').insert({
    id: enquiry.id,
    enquiry_id: enquiry.enquiryId,
    name: enquiry.name,
    phone: enquiry.phone,
    email: enquiry.email,
    service: enquiry.service,
    date: enquiry.date,
    location: enquiry.location,
    message: enquiry.message,
    created_at: enquiry.createdAt,
    status: enquiry.status,
    source: enquiry.source,
    ip_address: enquiry.ipAddress,
    user_agent: enquiry.userAgent,
  })

  if (error) {
    console.error('[Supabase] Insert error:', error.message)
    throw new Error('Failed to save enquiry to database')
  }

  return enquiry
}

export async function getAllEnquiries(): Promise<IEnquiry[]> {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[Supabase] Select error:', error.message)
    return []
  }

  return (data || []).map((row) => ({
    id: row.id,
    enquiryId: row.enquiry_id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    service: row.service,
    date: row.date,
    location: row.location,
    message: row.message,
    createdAt: row.created_at,
    status: row.status,
    source: row.source,
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
  }))
}

export async function getEnquiryById(enquiryId: string): Promise<IEnquiry | undefined> {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .or(`enquiry_id.eq.${enquiryId},id.eq.${enquiryId}`)
    .maybeSingle()

  if (error || !data) return undefined

  return {
    id: data.id,
    enquiryId: data.enquiry_id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    service: data.service,
    date: data.date,
    location: data.location,
    message: data.message,
    createdAt: data.created_at,
    status: data.status,
    source: data.source,
    ipAddress: data.ip_address,
    userAgent: data.user_agent,
  }
}
