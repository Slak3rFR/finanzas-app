import { Bell, Search } from 'lucide-react'

import { signOut } from 'firebase/auth'

import { auth } from '../../firebase/config'

const Navbar = () => {

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <header className='h-20 border-b border-zinc-800 bg-zinc-900/70 backdrop-blur-xl flex items-center justify-between px-8'>

      <div>

        <h2 className='text-2xl font-bold text-white'>
          Panel financiero
        </h2>

      </div>

      <div className='flex items-center gap-4'>

        <div className='relative'>

          <Search
            size={18}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500'
          />

          <input
            type='text'
            placeholder='Buscar...'
            className='bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-4 py-2 text-white outline-none focus:border-zinc-500 transition'
          />

        </div>

        <button className='bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-xl'>
          <Bell size={18} />
        </button>

        <button
          onClick={handleLogout}
          className='bg-white text-black px-4 py-2 rounded-xl font-semibold hover:opacity-80 transition'
        >
          Salir
        </button>

      </div>

    </header>
  )
}

export default Navbar