import express, { Request, Response } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'

// Configuration for disk storage
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadDir = path.join(__dirname, '..', 'uploads')
    fs.mkdirSync(uploadDir, { recursive: true })
    cb(null, uploadDir)
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const ext = path.extname(file.originalname)
    const baseName = path.basename(file.originalname, ext)
    cb(null, `${Date.now()}-${baseName}${ext}`)
  }
})

// File type filter
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'application/pdf']
  if (!allowedMimes.includes(file.mimetype)) {
    cb(new Error('Only JPG, PNG, GIF, WebP, MP4, and PDF files are supported'))
    return
  }
  cb(null, true)
}

// Multer upload middleware instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
})

// Process upload helper
const processUpload = (file: Express.Multer.File) => {
  return {
    path: path.relative(process.cwd(), file.path),
    name: file.originalname,
    size: file.size,
    type: file.mimetype
  }
}

// Express Router
const router = express.Router()

// POST /api/upload
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' })
    return
  }
  try {
    const processed = processUpload(req.file)
    res.json(processed)
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' })
  }
})

// GET /api/uploads
router.get('/uploads', (_req: Request, res: Response) => {
  const uploadDir = path.join(__dirname, '..', 'uploads')
  if (!fs.existsSync(uploadDir)) {
    res.status(404).json({ error: 'No uploads found' })
    return
  }
  const files = fs.readdirSync(uploadDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(file => file.name)

  res.json(files)
})

export default router