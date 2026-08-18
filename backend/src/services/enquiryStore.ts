import fs from 'fs'
import path from 'path'
import { IEnquiry, generateEnquiryId } from '../models/Enquiry'

const DATA_DIR = path.join(process.cwd(), 'backend', 'data')
const FILE_PATH = path.join(DATA_DIR, 'enquiries.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Ensure JSON data file exists
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), 'utf-8')
}

// In-memory cache synced with disk
let enquiriesMemoryStore: IEnquiry[] = []

try {
  const fileContent = fs.readFileSync(FILE_PATH, 'utf-8')
  enquiriesMemoryStore = JSON.parse(fileContent || '[]')
} catch (err) {
  console.error('Failed to read enquiries.json, initializing empty store:', err)
  enquiriesMemoryStore = []
}

async function persistToDisk(): Promise<void> {
  try {
    await fs.promises.writeFile(FILE_PATH, JSON.stringify(enquiriesMemoryStore, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write to enquiries.json:', err)
  }
}

export async function saveEnquiry(data: Omit<IEnquiry, 'id' | 'enquiryId' | 'createdAt' | 'status' | 'source'>): Promise<IEnquiry> {
  const enquiry: IEnquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    enquiryId: generateEnquiryId(),
    ...data,
    createdAt: new Date().toISOString(),
    status: 'New',
    source: 'Website',
  }

  enquiriesMemoryStore.unshift(enquiry)
  await persistToDisk()
  return enquiry
}

export async function getAllEnquiries(): Promise<IEnquiry[]> {
  return enquiriesMemoryStore
}

export async function getEnquiryById(enquiryId: string): Promise<IEnquiry | undefined> {
  return enquiriesMemoryStore.find(e => e.enquiryId === enquiryId || e.id === enquiryId)
}
