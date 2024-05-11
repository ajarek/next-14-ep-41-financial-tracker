import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className='  min-h-[calc(100vh-80px)]  flex flex-col items-center justify-center '>
      <Loader2 className='animate-spin' size={32} />
    </div>
  )
}

export default Loading