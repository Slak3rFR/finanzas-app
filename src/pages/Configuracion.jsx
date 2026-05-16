import Layout from '../components/layout/Layout'

const Configuracion = () => {

  return (
    <Layout>

      <div className='mb-8'>

        <h1 className='text-4xl font-bold text-white'>
          Configuración
        </h1>

        <p className='text-zinc-400 mt-2'>
          Próximamente vas a poder configurar:
        </p>

      </div>

      <div className='grid gap-6'>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

          <h2 className='text-xl font-semibold mb-3'>
            Perfil
          </h2>

          <p className='text-zinc-400'>
            Datos del usuario y seguridad.
          </p>

        </div>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

          <h2 className='text-xl font-semibold mb-3'>
            Exportaciones
          </h2>

          <p className='text-zinc-400'>
            Exportar Excel y PDF.
          </p>

        </div>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

          <h2 className='text-xl font-semibold mb-3'>
            Tema
          </h2>

          <p className='text-zinc-400'>
            Configuración visual de la app.
          </p>

        </div>

      </div>

    </Layout>
  )
}

export default Configuracion