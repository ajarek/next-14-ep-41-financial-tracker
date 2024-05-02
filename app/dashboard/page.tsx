import Link from 'next/link'

import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import FinancialForm from '@/components/FinancialForm'
const Dashboard =async () => {
  const session = await auth()

  if (!session) {
    redirect('/')
  }
  
  
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-24 gap-4 ">
     <h1> Dashboard </h1>
     <FinancialForm />
     
      </main>
  )
}

export default Dashboard