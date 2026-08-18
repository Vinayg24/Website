import { Router } from 'express'
import { createEnquiryController, getEnquiriesController } from '../controllers/enquiryController'
import { validateEnquiryMiddleware } from '../middleware/validateEnquiry'
import { enquiryRateLimiter } from '../middleware/rateLimiter'

const router = Router()

// POST /api/enquiries - Submit a new booking lead
router.post('/', enquiryRateLimiter, validateEnquiryMiddleware, createEnquiryController)

// GET /api/enquiries - Retrieve all leads (Admin)
router.get('/', getEnquiriesController)

export default router
