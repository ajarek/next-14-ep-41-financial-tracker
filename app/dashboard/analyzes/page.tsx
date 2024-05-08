import ChartBar from '@/components/ChartBar'
import connectToDb from '@/lib/connectToDb'
import { Record } from '@/lib/models'

import { auth } from '@/app/api/auth/auth'


const Analyzes =async  () => {
  const session = await auth()
  const email = session?.user?.email
  await connectToDb()
  const records = (await Record.find({ userId: email || '' }).sort({
    _id: -1,
  })) as Record[]
  const food = records
  .filter((record) => record.category === 'Food' )
  .reduce((acc, record) => acc + record.amount, 0)
  const rent = records
  .filter((record) => record.category === 'Rent' )
  .reduce((acc, record) => acc + record.amount, 0)
  const utilities = records
  .filter((record) => record.category === 'Utilities' )
  .reduce((acc, record) => acc + record.amount, 0)
  const entertainment = records
  .filter((record) => record.category === 'Entertainment' )
  .reduce((acc, record) => acc + record.amount, 0)
  const other = records
  .filter((record) => record.category === 'Other' )
  .reduce((acc, record) => acc + record.amount, 0)
  const data = [
    {
      name: 'Food',
      Category: food*-1,
    },
    {
      name: 'Rent',
      Category: rent*-1,
    },
    {
      name: 'Utilities',
      Category: utilities*-1,
    },
    {
      name: 'Entertainment',
      Category: entertainment*-1,
    },
    {
      name: 'Other',
      Category: other*-1,
    },
  ]
  return (
    <div>
      <ChartBar data={data}/>
    </div>
  )
}

export default Analyzes
