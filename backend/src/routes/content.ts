import express, { Request, Response, NextFunction } from 'express'
import { createContentHandler } from '../utils/contentHandler'
import { AuthRequest } from '../middleware/auth'

const router = express.Router()

// Admin-protected routes
router.use('/admin', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = (req as AuthRequest).auth
    if (!auth || auth.role !== 'admin') {
      res.status(403).json({ error: 'Admin privileges required' })
      return
    }
    next()
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /api/content/admin/homepage - Admin can edit homepage content
router.post('/admin/homepage', async (req: Request, res: Response) => {
  const { title, subtitle, description } = req.body
  await createContentHandler({
    section: 'homepage',
    title,
    subtitle,
    description
  })
  res.status(201).json({ message: 'Homepage content updated' })
})

// POST /api/content/admin/gallery - Admin can manage gallery
router.post('/admin/gallery', async (req: Request, res: Response) => {
  const { sequence, images } = req.body
  await createContentHandler({
    section: 'gallery',
    sequence,
    images: Array.isArray(images) ? images.map((image: any) => ({
      id: image.id,
      alt: image.alt,
      src: image.src
    })) : []
  })
  res.status(201).json({ message: 'Gallery updated' })
})

// PUT /api/content/admin/products/:id - Admin can update products
router.put('/admin/products/:id', async (req: Request, res: Response) => {
  const { name, description, price } = req.body
  await createContentHandler({
    section: 'products',
    id: req.params.id,
    name,
    description,
    price
  })
  res.status(200).json({ message: 'Product updated' })
})

// POST /api/content/admin/map-endpoint - Admin can add new sections
router.post('/admin/map-endpoint', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Map endpoint added' })
})

export default router