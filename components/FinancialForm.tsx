'use client'

import { useRef } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from '@/components/ui/label'
import { createRecord } from '@/lib/action'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FinancialForm = () => {
  const ref = useRef<HTMLFormElement>(null)
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await createRecord(formData)
        ref.current?.reset()
      }}
      className='w-full flex flex-col gap-4 '
    >
      <div className='flex flex-col gap-4'>
        <Label htmlFor='description'>Description:</Label>
        <Input
          type='text'
          name='description'
          required
          className=''
        />
      </div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='amount'>Amount:</Label>
        <Input
          type='number'
          name='amount'
          required
          className=''
        />
      </div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='category'>Category:</Label>
        <Select
          defaultValue=''
          name='category'
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
        <Select name='payment'>
          <SelectTrigger className=''>
            <SelectValue placeholder='Select a Payment Method' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Credit Card'>Credit Card</SelectItem>
            <SelectItem value='Cash'>Cash</SelectItem>
            <SelectItem value='Salary'>Salary</SelectItem>
            <SelectItem value='Bank Transfer'>Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type='submit'
        className=''
      >
        Add Record
      </Button>
    </form>
  )
}

export default FinancialForm
