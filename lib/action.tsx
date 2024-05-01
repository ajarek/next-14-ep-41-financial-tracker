'use server'

import connectToDb from './connectToDb'
import { User } from './models'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

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
