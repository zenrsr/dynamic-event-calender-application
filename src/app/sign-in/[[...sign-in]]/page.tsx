import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex justify-center items-center w-screen h-screen bg-gradient-to-r from-purple-500 to-indigo-500'>
    <SignIn />
  </div>
}