import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import authRouter from './routes/auth'
import uploadRouter from './routes/upload'
import contentRouter from './routes/content'
import enquiriesRouter from './routes/enquiries'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/content', contentRouter)
app.use('/api/enquiries', enquiriesRouter)
app.use('/api/contact', enquiriesRouter)

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})