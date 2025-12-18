import React from 'react'
import {SidebarDemo} from '@/components/sidebar'
import {PlaceholdersAndVanishInputDemo} from '@/components/placehorder'
function page() {
  return (
    <div>
        <div className="flex h-full min-h-screen w-full">
            <aside className='flex max-w-xs '>
                <SidebarDemo/>
            </aside>
            <main className='flex flex-1 items-center justify-center'>
            <PlaceholdersAndVanishInputDemo/>
            </main>
        </div>
    </div>
  )
}

export default page