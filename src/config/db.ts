import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const fullMongoUri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;
    await mongoose.connect(fullMongoUri);

    console.log('✅ MongoDB Connected');
  } catch (error : any) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
