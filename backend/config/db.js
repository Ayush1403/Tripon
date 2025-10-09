import mongoose from 'mongoose';

// Cache the database connection
let cachedConnection = null;

const database = async () => {
    try {
        // Return cached connection if exists and is connected
        if (cachedConnection && mongoose.connection.readyState === 1) {
            console.log('Using cached database connection');
            return cachedConnection;
        }

        // Close any stale connections
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        const options = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 1,
            retryWrites: true,
            retryReads: true,
        };

        console.log('Connecting to MongoDB...');
        const connection = await mongoose.connect(process.env.DB_URI, options);
        
        cachedConnection = connection;
        console.log('MongoDB connected successfully');

        return connection;

    } catch (error) {
        console.error('Database Connection Failed:', error.message);
        // Don't exit process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        throw error;
    }
};

export default database;