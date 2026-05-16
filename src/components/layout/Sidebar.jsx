import {
  Link,
  useLocation,
} from 'react-router-dom'

import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Receipt,
  Landmark,
  Settings,
} from 'lucide-react'

const Sidebar = () => {

  const location =
    useLocation()

  const menuItems = [

    {
      name: 'Dashboard',
      path: '/dashboard',
      icon:
        <LayoutDashboard size={20} />,
    },

    {
      name: 'Finanzas',
      path: '/finanzas',
      icon:
        <Wallet size={20} />,
    },

    {
      name: 'Tarjetas',
      path: '/tarjetas',
      icon:
        <CreditCard size={20} />,
    },

    {
      name: 'Cuotas',
      path: '/cuotas',
      icon:
        <Receipt size={20} />,
    },

    {
      name: 'Préstamos',
      path: '/prestamos',
      icon:
        <Landmark size={20} />,
    },

    {
      name: 'Configuración',
      path: '/configuracion',
      icon:
        <Settings size={20} />,
    },

  ]

  return (
    <aside className='w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6 hidden md:flex flex-col'>

      {/* LOGO */}

      <div className='mb-10'>

        <h1 className='text-3xl font-bold text-white'>
          Finanzas
        </h1>

        <p className='text-zinc-500 text-sm mt-1'>
          Control financiero
        </p>

      </div>

      {/* MENU */}

      <nav className='flex flex-col gap-2'>

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              location.pathname ===
              item.path
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >

            {item.icon}

            <span>
              {item.name}
            </span>

          </Link>

        ))}

      </nav>

    </aside>
  )
}

export default Sidebar