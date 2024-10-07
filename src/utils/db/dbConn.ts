import mongoose from 'mongoose';

export async function getConn() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.STRING_CONNECTION as string)
      .then(() => {
        console.log('Database connected successfully');
      })
      .catch(err => {
        console.log('Database connection failed:', err);
      });
  }
}