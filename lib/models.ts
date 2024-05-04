import mongoose from 'mongoose'

export type User = {
  username: string
  email: string
  password: string
  img: string
  isAdmin: boolean
}
export type Record = {
  _id: string
  description: string
  amount: number
  category: string
  payment: string
  userId:string
  createdAt: Date
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, min: 3, max: 50 },
    password: { type: String, required: true, min: 6, max: 50 },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const recordSchema =new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  payment: { type: String, required: true },
  userId: { type: String, required: true },
},
  { timestamps: true }
)


export const User = mongoose.models?.User || mongoose.model('User', userSchema)
export const Record = mongoose.models?.Record || mongoose.model('Record', recordSchema)
