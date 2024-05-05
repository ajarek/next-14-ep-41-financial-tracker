'use client'

import { Button } from '@/components/ui/button'
import { editItem } from '@/lib/action'
import { Pencil } from 'lucide-react'

export default function EditItem({ _id }: { _id: string }) {
  return (
    <form
      action={async (formData) => {
        const res = await editItem(formData)
      }}
    >
      <input
        type='hidden'
        name='_id'
        value={_id}
      />

      <Button className='bg-transparent' type='submit'>
        <Pencil
          size={32}
          color='blue'
        />
      </Button>
    </form>
  )
}
