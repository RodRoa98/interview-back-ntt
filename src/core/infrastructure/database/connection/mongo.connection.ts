import mongoose from 'mongoose';

export async function mongooseConnect() {
    try {
        const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;
        await mongoose.connect(url);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('BD Conection failed', error);
    }
}