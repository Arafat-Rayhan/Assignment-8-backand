import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/db/db.js'

const Port = process.env.PORT || 4000

connectDB()

if (!process.env.VERCEL) {
  app.listen(Port, () => {
    console.log(`server is running on ${Port}`)
  })
}

export default app