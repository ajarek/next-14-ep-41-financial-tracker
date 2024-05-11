import ChartBar from '@/components/ChartBar'
import connectToDb from '@/lib/connectToDb'
import { Record } from '@/lib/models'
import { auth } from '@/app/api/auth/auth'
import ChartPieProcent from '@/components/ChartPieProcent'

const Analyzes = async () => {
  const session = await auth()
  const email = session?.user?.email
  await connectToDb()
  const records = (await Record.find({ userId: email || '' }).sort({
    _id: -1,
  })) as Record[]
  const food = records
    .filter((record) => record.category === 'Food')
    .reduce((acc, record) => acc + record.amount, 0)
  const rent = records
    .filter((record) => record.category === 'Rent')
    .reduce((acc, record) => acc + record.amount, 0)
  const utilities = records
    .filter((record) => record.category === 'Utilities')
    .reduce((acc, record) => acc + record.amount, 0)
  const entertainment = records
    .filter((record) => record.category === 'Entertainment')
    .reduce((acc, record) => acc + record.amount, 0)
  const other = records
    .filter((record) => record.category === 'Other')
    .reduce((acc, record) => acc + record.amount, 0)
  const data = [
    {
      name: 'Food',
      Category: (food * -1).toFixed(2),
    },
    {
      name: 'Rent',
      Category: (rent * -1).toFixed(2),
    },
    {
      name: 'Utilities',
      Category: (utilities * -1).toFixed(2),
    },
    {
      name: 'Entertainment',
      Category: (entertainment * -1).toFixed(2),
    },
    {
      name: 'Other',
      Category: (other * -1).toFixed(2),
    },
  ]
  const credit = records
    .filter((record) => record.payment === 'Credit Card')
    .reduce((acc, record) => acc + record.amount, 0)
  const cash = records
    .filter((record) => record.payment === 'Cash')
    .reduce((acc, record) => acc + record.amount, 0)
  const installment = records
    .filter((record) => record.payment === 'Installment')
    .reduce((acc, record) => acc + record.amount, 0)
  const bank = records
    .filter((record) => record.payment === 'Bank Transfer')
    .reduce((acc, record) => acc + record.amount, 0)
  const dataProcent = [
    { name: 'Credit Card', value: Math.abs(credit) },
    { name: 'Cash', value: Math.abs(cash) },
    { name: 'Installment', value: Math.abs(installment) },
    { name: 'Bank Transfer', value: Math.abs(bank) },
  ] 
  
  return (
    <div className='min-h-[calc(100vh-64px)] w-full grid grid-cols-2 max-lg:grid-cols-1 place-items-center '>
      <div className='h-full flex flex-col items-center justify-center   '>
        <h1>Expense Category Analyzes</h1>
        <ChartBar data={data} />
      </div>
      <div className='h-full flex flex-col items-center justify-center'>
        <h1>Payment Type Analyzes</h1>
        <ChartPieProcent data={dataProcent} />
      </div>
    </div>
  )
}

export default Analyzes
