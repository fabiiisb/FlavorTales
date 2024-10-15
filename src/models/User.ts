import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
  username: string
  image: string
}

const UserSchema: Schema = new Schema({
  email: { 
    type: String,
    required: true,
    unique: true,
    maxlength: 320
  },
  password: { 
    type: String,
    required: true,
    minlength: 8
  },
  username: { 
    type: String, 
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 25
  },
  image: { 
    type: String,
    required: false,
    default: 'https://res.cloudinary.com/dpwjyqrss/image/upload/v1718032802/UserPlaceholder.jpg'
  }
})

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema, 'users')