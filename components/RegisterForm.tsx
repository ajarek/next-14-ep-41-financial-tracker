'use client'

import { useState } from 'react'
import { User } from '@/lib/models'
import { addUser } from '@/lib/action'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'

const DEFAULT_IS_ADMIN: boolean = false

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [img, setImage] = useState('')
  const [isAdmin, setIsAdmin] = useState(DEFAULT_IS_ADMIN)

  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData: User = {
      username,
      email,
      password,
      img,
      isAdmin,
    }

    try {
      await addUser(formData)
      router.push('/api/auth/signin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=''>
      <h1 className='text-3xl text-center font-bold my-4'>Register</h1>
      <form
        className='w-80  flex flex-col gap-4 p-6 shadow-xl border-2 rounded-sm'
        onSubmit={handleSubmit}
      >
        <Input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type='text'
          placeholder='image'
          value={img}
          onChange={(e) => setImage(e.target.value)}
        />
        <Input
          type='hidden'
          name='isAdmin'
          value={`${DEFAULT_IS_ADMIN}`}
        />
        <Button
          className=''
          type='submit'
        >
          Register
        </Button>
        <Link href='/api/auth/signin'>
          Have an account? <b>Login</b>
        </Link>
      </form>
    </div>
  )
}

export default RegisterForm