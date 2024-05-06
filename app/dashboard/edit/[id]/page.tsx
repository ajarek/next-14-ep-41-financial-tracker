'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {Label}  from '@/components/ui/label'
import { Metadata } from 'next'
import { updateRecord } from '@/lib/action'
import connectToDb from '@/lib/connectToDb'
import  { Record } from '@/lib/models'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRef } from 'react'



const Update =  ({  searchParams }: { searchParams: { id: string, description: string, amount: number, category: string, payment: string }}) => {
  const ref = useRef<HTMLFormElement>(null)
const { id, description, amount, category, payment } = searchParams
  
  return (
    <form
    
    ref={ref}
    action={async (formData) => {
      await updateRecord(formData)
      ref.current?.reset()
    }}
     
  
    className='w-full flex flex-col gap-4 '
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
      <Label htmlFor='amount'>Amount:(expense with "-")</Label>
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
      <Select name='payment' defaultValue={payment}>
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
      Update Record
    </Button>
  </form>
  )
}

export default Update