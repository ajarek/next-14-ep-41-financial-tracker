'use server'

import connectToDb from './connectToDb'
import { User, Record } from './models'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

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
    revalidatePath('/dashboard/data-sheet')
    console.log({ message: `Deleted record ${id}` })
    return { message: `Deleted record ${id}` }
  } catch (err) {
    return { message: 'Failed to delete record' }
  }
}


export const updateRecord = async (formData: FormData) => {
  const id = formData.get('_id')
  const description = formData.get('description')
  const amount = formData.get('amount')
  const category = formData.get('category')
  const payment = formData.get('payment')

  try {
    await connectToDb()
    await Record.findOneAndUpdate(
      { _id: id },
      {
        description: description,
        amount: amount,
        category: category,
        payment: payment,
      }
    )
    revalidatePath(`/dashboard`)
    return { message: `Updated record ${id}` }
  } catch (err) {
    return { message: 'Failed to update to db' }
  } finally {
    redirect('/dashboard/data-sheet')
  }
}
