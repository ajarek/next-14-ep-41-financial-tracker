import connectToDb from '@/lib/connectToDb'
import { Record } from '@/lib/models'
import { TrendingUp, TrendingDown, Wallet, X, Pencil} from 'lucide-react'
import { auth } from '@/app/api/auth/auth'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

const DataSheet = async () => {
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

      <Table>
        <TableCaption>A list of your financial transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=''>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
            <TableHead className='text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record._id}>
              <TableCell className='font-medium'>
                {record.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell className='font-medium'>
                {record.description}
              </TableCell>
              <TableCell className='font-medium'>{record.category}</TableCell>
              <TableCell className='font-medium'>{record.payment}</TableCell>
              <TableCell className='text-right font-medium'>
                {record.amount.toFixed(2)}
              </TableCell>
              <TableCell className='flex justify-center items-center gap-6 '>
                <Link href={`/dashboard/delete/${record._id}`} >
                  <X
                    size={32}
                    color='#f40606'
                    className='hover:scale-[120%] transition'
                  />
                </Link>
                <Link href={`/dashboard/edit/${record._id}`} >
                  <Pencil
                    size={32}
                    color='#068df4'
                    className='hover:scale-[120%] transition'
                  />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataSheet
