import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import FinancialForm from '@/components/FinancialForm'
import FinancialInfo from '@/components/FinancialInfo'
const Dashboard = async () => {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return (
    <main className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-24 gap-4 '>
      <h1 className='text-xl font-semibold capitalize'> Welcome <span className='font-bold'>{(session?.user?.email)?.split('@')[0]}</span> ! Here Are Your Finances:</h1>
      <div className='w-full grid grid-cols-2 max-sm:grid-cols-1 gap-4 '>

      <FinancialForm />
      <FinancialInfo/>
      </div>
    </main>
  )
}

export default Dashboard
