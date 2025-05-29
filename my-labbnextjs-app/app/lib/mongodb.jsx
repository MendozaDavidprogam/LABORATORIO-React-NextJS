
/*import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/LABORATORIO_NextJS';

if (!MONGODB_URI) {
  throw new Error('Por favor define la variable MONGODB_URI en lib/mongodb.js');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
*/

import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://mendozadavidprogramacion20:PhAW0YuVob0mOTNX@bd.boulctk.mongodb.net/LABORATORIO_NextJS?retryWrites=true&w=majority&appName=bd';

if (!MONGODB_URI) {
  throw new Error('Por favor define la variable MONGODB_URI en lib/mongodb.js');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
