import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'shree-radha-krishna-secret-key-2024'

export interface AuthRequest extends Request {
  auth?: {
    userId: string
    email: string
    role: string
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Access token required' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    ;(req as AuthRequest).auth = {
      userId: (decoded as any).sub,
      email: (decoded as any).email,
      role: (decoded as any).role
    }
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' })
  }
}

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest
    if (!authReq.auth) return res.status(401).json({ error: 'Not authenticated' })
    if (authReq.auth.role !== role) return res.status(403).json({ error: 'Insufficient permissions' })
    next()
  }
}