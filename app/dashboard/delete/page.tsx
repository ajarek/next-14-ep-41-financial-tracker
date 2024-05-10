'use client'

import { Button } from '@/components/ui/button'
import { deleteItem } from '@/lib/action'
import { X } from 'lucide-react'

export default function DeleteItem({ _id }: { _id: number|string }) {
  return (
    <form
      action={async (formData) => {
        const res = await deleteItem(formData)
      }}
    >
      <input
        type='hidden'
        name='_id'
        value={_id}
      />

      <Button className='bg-transparent hover:bg-background transition' type='submit'>
        <X
          size={32}
          color='#f40606'
        />
      </Button>
    </form>
  )
}
