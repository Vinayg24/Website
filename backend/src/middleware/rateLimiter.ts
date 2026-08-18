import { Request, Response, NextFunction } from 'express'

const submissionTracker = new Map<string, number[]>()
const WINDOW_MS = 60 * 60 * 1000 // 1 hour window
const MAX_SUBMISSIONS = 5 // Max 5 submissions per IP per hour

export function enquiryRateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.headers['x-forwarded-for'] as string || 'unknown-ip'
  const now = Date.now()

  const timestamps = submissionTracker.get(ip) || []
  const recentTimestamps = timestamps.filter(t => now - t < WINDOW_MS)

  if (recentTimestamps.length >= MAX_SUBMISSIONS) {
    return res.status(429).json({
      error: 'Submission rate limit exceeded. You have sent multiple inquiries recently. Please try again in an hour or contact us directly on WhatsApp (+91 9460142572).'
    })
  }

  recentTimestamps.push(now)
  submissionTracker.set(ip, recentTimestamps)

  next()
}
