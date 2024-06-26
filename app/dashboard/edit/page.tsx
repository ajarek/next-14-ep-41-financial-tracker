'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateRecord } from '@/lib/action'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRef } from 'react'

const Update = ({
  searchParams,
}: {
  searchParams: {
    id: string | number
    description: string
    amount: number
    category: string
    payment: string
  }
}) => {
  const ref = useRef<HTMLFormElement>(null)
  const { id, description, amount, category, payment } = searchParams

  return (
    <div className='min-h-[calc(100vh-64px)] w-full flex flex-col  justify-center items-center max-sm:justify-start  px-24 max-sm:px-4 gap-4 '>
      <h1 className='text-xl font-semibold '>Edit and Update Record</h1>
      <form
        ref={ref}
        action={async (formData) => {
          await updateRecord(formData)
          ref.current?.reset()
        }}
        className=' w-full flex flex-col gap-4 '
      >
        <input
          type='hidden'
          name='_id'
          value={id}
        />
        <div className='flex flex-col gap-4'>
          <Label htmlFor='description'>Description:</Label>
          <Input
            type='text'
            name='description'
            required
            className=''
            defaultValue={description}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='amount'>Amount:(expense with &quot - &quot)</Label>
          <Input
            type='number'
            name='amount'
            required
            className=''
            step='0.01'
            defaultValue={amount}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='category'>Category:</Label>
          <Select
            name='category'
            defaultValue={category}
          >
            <SelectTrigger className=''>
              <SelectValue placeholder='Select a Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Food'>Food</SelectItem>
              <SelectItem value='Rent'>Rent</SelectItem>
              <SelectItem value='Salary'>Salary</SelectItem>
              <SelectItem value='Utilities'>Utilities</SelectItem>
              <SelectItem value='Entertainment'>Entertainment</SelectItem>
              <SelectItem value='Other'>Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='payment'>Payment Method:</Label>
          <Select
            name='payment'
            defaultValue={payment}
          >
            <SelectTrigger className=''>
              <SelectValue placeholder='Select a Payment Method' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Credit Card'>Credit Card</SelectItem>
              <SelectItem value='Cash'>Cash</SelectItem>
              <SelectItem value='Installment'>Installment</SelectItem>
              <SelectItem value='Bank Transfer'>Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type='submit'
          className=''
        >
          Update Record
        </Button>
      </form>
    </div>
  )
}

export default Update
