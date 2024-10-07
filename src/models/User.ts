import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  image: string;
}

const UserSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6
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
    required: true 
  }
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema, 'users');