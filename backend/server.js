import express from 'express'
import dotenv from 'dotenv'
import database from './config/db.js'
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
console.log("DEBUG FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("DEBUG NODE_ENV:", process.env.NODE_ENV);

const app = express();

// Better CORS configuration
const allowedOrigins = [
    "http://localhost:5173",           // Local dev
    "http://localhost:3000",           // Local dev alternative
    "http://localhost:5001",           // Local full-stack
    process.env.FRONTEND_URL,          // Production frontend from .env
    "https://tripon-kappa.vercel.app", // Your Vercel app
];

// Filter out undefined values
const validOrigins = allowedOrigins.filter(origin => origin !== undefined);

console.log("✅ Allowed CORS Origins:", validOrigins);

app.use(cors({
    origin: (origin, callback) => {
        console.log("🔍 CORS Check - Origin:", origin);
        
        // Allow requests with no origin (mobile, curl, Postman)
        if (!origin) {
            console.log("✅ No origin (Postman/Mobile) - ALLOWED");
            return callback(null, true);
        }
        
        // Check if origin is in allowed list
        if (validOrigins.includes(origin)) {
            console.log("✅ Origin allowed");
            return callback(null, true);
        }
        
        console.log("❌ Origin NOT allowed:", origin);
        return callback(new Error('CORS not allowed for origin: ' + origin));
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser())

// Health check endpoint (no auth needed)
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Backend is running',
        port: port,
        nodeEnv: process.env.NODE_ENV
    });
});

// API Routes
app.use('/user', userRouter)
app.use('/iten', itenaryRouter)
app.use('/event', eventRouter)
app.use("/book", bookingRouter)

// Debug route to check environment
app.get('/api/debug', (req, res) => {
    res.json({
        frontendUrl: process.env.FRONTEND_URL,
        nodeEnv: process.env.NODE_ENV,
        port: port,
        allowedOrigins: validOrigins,
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
    console.log(`📡 CORS enabled for: ${validOrigins.join(', ')}`)
    database();
})
