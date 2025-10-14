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
            console.log('❌ CORS blocked origin:', origin);
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']
}));

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/iten', itenaryRouter);
app.use('/event', eventRouter);
app.use('/book', bookingRouter);

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Backend is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'TripOn API Server',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            user: '/user/*',
            itinerary: '/iten/*',
            events: '/event/*',
            bookings: '/book/*'
        }
    });
});

app.get('/api/debug', (req, res) => {
    res.json({
        frontendUrl: process.env.FRONTEND_URL,
        nodeEnv: process.env.NODE_ENV,
        port: port,
        allowedOrigins: allowedOrigins,
    });
});

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.path 
    });
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📡 CORS enabled for: ${allowedOrigins.join(', ')}`);
    database();
});
