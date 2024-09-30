import mongoose from 'mongoose';

export async function getConn() {
  mongoose.connect(process.env.STRING_CONNECTION as string)
    .then(() => {
      console.log('db connected success')
    }).catch(err => {
      console.log(err)
    })
}
