import 'dotenv/config'
import express, { Request, Response } from 'express'
import db from './db/client'


async function testConnection() {
  try {
    const res = await db.query('SELECT NOW()')
    console.log('DB connected:', res.rows[0])
  } catch (err) {
    console.error('DB connection failed:', err)
  }
}

testConnection()

const app = express()

app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})