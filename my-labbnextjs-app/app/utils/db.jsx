// utils/db.jsx
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/LABORATORIO_NextJS';

export async function connectDB() {
  if (mongoose.connections[0].readyState) return; // ya conectado
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
