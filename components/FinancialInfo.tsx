import connectToDb from '@/lib/connectToDb'
import { Record } from '@/lib/models'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { auth } from '@/app/api/auth/auth'
import ChartPie from './ChartPie'

const FinancialInfo = async () => {
  const session = await auth()
  const email = session?.user?.email
  await connectToDb()
  const records = (await Record.find({ userId: email || '' }).sort({
    _id: -1,
  })) as Record[]
  const balance = records.reduce((acc, record) => acc + record.amount, 0)
  const income = records
    .filter((record) => record.amount > 0)
    .reduce((acc, record) => acc + record.amount, 0)
  const expense = records
    .filter((record) => record.amount < 0)
    .reduce((acc, record) => acc + record.amount, 0)
  const data = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense * -1 },
  ]
  return (
    <div>
      <div className='w-full grid grid-cols-3 gap-2 place-items-center mb-4'>
        <div className='flex gap-2 items-center'>
          <TrendingUp
            color='green'
            size={32}
          />
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Income:</p>{' '}
            <span className='text-xl'>${income.toFixed(2)}</span>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <TrendingDown
            color='red'
            size={32}
          />
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Expense:</p>{' '}
            <span className='text-xl'>${expense.toFixed(2)}</span>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <Wallet
            color='violet'
            size={32}
          />
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Balance:</p>{' '}
            <span className='text-xl'>${balance.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {records?.length > 0 ? (
        <div className='w-full flex justify-center  '>
          <ChartPie data={data} />
        </div>
      ) : (
        <p className='text-center text-xl'>No records found</p>
      )}
    </div>
  )
}

export default FinancialInfo
