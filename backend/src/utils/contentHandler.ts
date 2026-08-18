import path from 'path'
import fs from 'fs'

// In-memory content store (replace with MongoDB in production)
const contentDb = new Map<string, any>()

export interface ContentUpdate {
  section: string
  title?: string
  subtitle?: string
  description?: string
  images?: Array<{ src: string; alt: string }>
  sequence?: number
  id?: string
  name?: string
  price?: number
}

export async function createContentHandler(data: ContentUpdate) {
  const key = `${data.section}_${data.id || 'default'}`
  contentDb.set(key, {
    ...data,
    updatedAt: new Date().toISOString()
  })
  return contentDb.get(key)
}

export async function getSectionContent(section: string) {
  return Array.from(contentDb.entries())
    .filter(([key]) => key.startsWith(`${section}_`))
    .map(([, value]) => value)
}

export async function deleteContent(section: string, id: string) {
  const key = `${section}_${id}`
  contentDb.delete(key)
  return true
}