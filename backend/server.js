import express from 'express'
import  dotenv  from 'dotenv'
import database  from './config/db.js'
import userRouter from './routes/user.route.js'
import itenaryRouter from './routes/itenary.route.js'
import eventRouter from './routes/event.route.js'
import bookingRouter from './routes/booking.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './config/eventExpire.js'
dotenv.config();
console.log("DEBUG MAIL_ID:", process.env.MAIL_ID);
console.log("DEBUG MAIL_PASS:", process.env.MAIL_PASS ? "LOADED" : "MISSING");

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET','POST','DELETE','PUT']
}))
const port = process.env.PORT;
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser())

app.use('/user',userRouter)
app.use('/iten',itenaryRouter)
app.use('/event',eventRouter)
app.use("/book", bookingRouter)
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
    database();
})
