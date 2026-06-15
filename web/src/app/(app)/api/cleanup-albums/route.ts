import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }
    
    // Clear albums directly
    const db = mongoose.connection.db;
    if (db) {
      const collection = db.collection('albums');
      const result = await collection.deleteMany({});
      return NextResponse.json({ success: true, message: `Deleted ${result.deletedCount} albums directly from DB` });
    }
    return NextResponse.json({ success: false, message: 'DB not found' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
