import express from 'express';
import postRouster from './routes/posts.routes.js'
import cors from 'cors'

 const app=express()
 app.use(cors())
app.use(express.json())

app.use('/post',postRouster)
 

export default app;