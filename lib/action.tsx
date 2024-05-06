'use server'

import connectToDb from './connectToDb'
import { User, Record } from './models'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { auth } from '@/app/api/auth/auth'

export const addUser = async (formData: User) => {
  const { username, email, password, img, isAdmin } = formData
  const hashedPassword = await bcrypt.hash(password, 5)
  try {
    connectToDb()
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin,
    })
    await newUser.save()
    console.log('saved' + newUser)
    revalidatePath('/')
  } catch (err) {
    console.log(err)
  }
}

export const createRecord = async (formData: FormData) => {
  const session = await auth()
  const rawFormData = {
    description: formData.get('description'),
    amount: formData.get('amount'),
    category: formData.get('category'),
    payment: formData.get('payment'),
    userId: session?.user?.email,
  }

  try {
    await connectToDb()
    const newRecord = new Record(rawFormData)
    await newRecord.save()
    console.log('saved' + newRecord)
    revalidatePath('/dashboard')
  } catch (err) {
    console.log(err)
  }
}

export const deleteItem = async (formData: FormData) => {
  const id = formData.get('_id')

  try {
    await connectToDb()
    await Record.findOneAndDelete({ _id: id })
    revalidatePath('/dashboard')
    console.log({ message: `Deleted record ${id}` })
    return { message: `Deleted record ${id}` }
  } catch (err) {
    return { message: 'Failed to delete record' }
  }
}
export const editItem = (formData: FormData) => {}
