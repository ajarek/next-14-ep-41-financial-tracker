import Link from 'next/link'

import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
const Dashboard =async () => {
  const session = await auth()

  if (!session) {
    redirect('/')
  }
  return (
    <div>
     <h1> Dashboard</h1>
     <Link href="/">Home</Link>
      </div>
  )
}

export default Dashboard