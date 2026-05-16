import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-black text-white overflow-hidden'>

      <Sidebar />

      <div className='flex-1 flex flex-col'>

        <Navbar />

        <main className='flex-1 p-8 overflow-y-auto'>
          {children}
        </main>

      </div>

    </div>
  )
}

export default Layout