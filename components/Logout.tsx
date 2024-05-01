import Link from 'next/link'
import LogoutBtn from './LogoutBtn'

const Logout = async ({ session }: any) => {
  console.log(session);
  
  return (
    <>
      {session ? (
        <LogoutBtn />
      ) : (
        <Link
          className='px-4 py-1 bg-primary text-primary-foreground rounded-sm'
          href={'/register'}
        >
          Login
        </Link>
      )}
      {session && (
        <span className='px-4 max-lg:hidden'>{session.user?.email}</span>
      )}
    </>
  )
}

export default Logout