import  Lamp  from "@/components/ui/lamp";
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'


const Home = async ()=> {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Lamp/>
    </main>
  );
}
export default Home