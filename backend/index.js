import express from 'express';
import dotenv from 'dotenv'
import AuthRoutes from './routes/Auth.js';
import DbConn from './utils/db.js';
dotenv.config();



const port = process.env.PORT
const app = express();
//connection of db
DbConn()


app.get('/',(req,res)=>{
res.send("hello wordl")
})
app.use(express.json())
app.use('/auth',AuthRoutes)

app.listen(port,()=>{
    console.log(`appp is running ${port}`);
})