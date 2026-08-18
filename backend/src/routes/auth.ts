import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'shree-radha-krishna-secret-key-2024'

// In-memory admin store
const admins = [
  {
    id: '1',
    email: 'admin@shree-radha-krishna.art',
    passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'admin'
  }
]

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    const admin = admins.find(a => a.email === email)
    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash)
    if (!isValid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = jwt.sign(
      { sub: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /api/auth/verify
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      res.status(401).json({ error: 'Token required' })
      return
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    res.json({ user: decoded })
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
})

export default router