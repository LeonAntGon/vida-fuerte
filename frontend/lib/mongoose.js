import mongoose from "mongoose";

const cached = global.mongoose || { conn: null, promise: null };

export async function mongooseConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Esto evita el error de "buffering timed out"
        };
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((m) => m);
    }
    
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    global.mongoose = cached;
    return cached.conn;
}