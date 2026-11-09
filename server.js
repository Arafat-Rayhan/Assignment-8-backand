import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/db/db.js'

const Port = process.env.Port||4000;

connectDB().then(()=>{
app.listen(Port,()=>{
    console.log(`server is runing on ${Port}`)
})
}
);