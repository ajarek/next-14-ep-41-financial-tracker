import connectToDb from '@/lib/connectToDb'
import { Record } from '@/lib/models'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
const FinancialInfo = async () => {
  await connectToDb()
  const records = (await Record.find({}).sort({
    _id: -1,
  })) as Record[]
  const balance = records.reduce((acc, record) => acc + record.amount, 0)
  const income = records
    .filter((record) => record.amount > 0)
    .reduce((acc, record) => acc + record.amount, 0)
  const expense = records
    .filter((record) => record.amount < 0)
    .reduce((acc, record) => acc + record.amount, 0)
  return (
    <div>
      <div className='w-full grid grid-cols-3 gap-2 place-items-center mb-4'>
        <div className='flex gap-2 items-center'>
          <TrendingUp
            color='green'
            size={32}
          />
          <div className='flex flex-col gap-1'>
            
            <p className='text-sm'>Income:</p> <span className='text-xl'>${income}</span>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <TrendingDown
            color='red'
            size={32}
          />
          <div className='flex flex-col gap-1'>
            
            <p className='text-sm'>Expense:</p> <span className='text-xl'>${expense}</span>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <Wallet
            color='violet'
            size={32}
          />
          <div className='flex flex-col gap-1'>
            
            <p className='text-sm'>Balance:</p> <span className='text-xl'>${balance}</span>
          </div>
        </div>
      </div>

      <div className='flex justify-center flex-col items-center  gap-4 '>
        {records.map((record) => (
          <div
            key={record._id}
            className='w-full grid grid-cols-4 gap-2 place-items-center'
          >
            <p>
              {record.createdAt
                ?.toISOString()
                .split('T')[0]
                }
            </p>
            <p>{record.description}</p>
            <p>{record.category}</p>
            <p>{record.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FinancialInfo
