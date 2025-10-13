import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import database from './config/db.js'
import userRouter from './routes/user.route.js'
import itenaryRouter from './routes/itenary.route.js'
import eventRouter from './routes/event.route.js'
import bookingRouter from './routes/booking.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './config/eventExpire.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("DEBUG MAIL_ID:", process.env.MAIL_ID);
console.log("DEBUG MAIL_PASS:", process.env.MAIL_PASS ? "LOADED" : "MISSING");
console.log("DEBUG FRONTEND_URL:", process.env.FRONTEND_URL);

const app = express();

// CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5001",
    process.env.FRONTEND_URL,
    "https://tripon-kappa.vercel.app",
].filter(origin => origin !== undefined);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']
}));

const port = process.env.PORT || 5001;

// Middleware (MUST be before routes)
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// ========================================
// API ROUTES (MUST come before fallback)
// ========================================
app.use('/user', userRouter);
app.use('/iten', itenaryRouter);
app.use('/event', eventRouter);
app.use("/book", bookingRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
    res.json({
        frontendUrl: process.env.FRONTEND_URL,
        nodeEnv: process.env.NODE_ENV,
        port: port,
        allowedOrigins: allowedOrigins,
    });
});

// ========================================
// SERVE FRONTEND (AFTER all API routes)
// ========================================
const frontendPath = path.join(__dirname, '../frontend/dist');

// Serve static files
app.use(express.static(frontendPath));

// Fallback to index.html for React Router (MUST be LAST)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// ========================================
// START SERVER
// ========================================
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📡 CORS enabled for: ${allowedOrigins.join(', ')}`);
    database();
});
