import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex justify-center items-center w-screen h-screen bg-gradient-to-r from-indigo-500 to-purple-600'>
    <SignUp />
  </div>
}