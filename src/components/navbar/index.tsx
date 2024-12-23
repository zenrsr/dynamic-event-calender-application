'use client'

import { useAuth, UserButton } from '@clerk/nextjs'


export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <div>
        <h1 className="text-xl font-semibold">Event Calendar</h1>
      </div>
      <div>
        {isSignedIn && (
          <div className="flex items-center space-x-4">
            <UserButton/>
          </div>
        )}
      </div>
    </nav>
  )
}
