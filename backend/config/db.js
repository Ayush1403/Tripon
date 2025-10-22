import mongoose from 'mongoose';



const database = async () => {
    try {
      
        console.log('Connecting to MongoDB...');
        const connection = await mongoose.connect(process.env.DB_URI);
        
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
