import {
  deleteInstallment,
} from '../../services/installmentService'

const InstallmentList = ({
  installments,
  cards,
  reloadInstallments,
}) => {

  const getCardName = (cardId) => {

    const card = cards.find(
      (c) => c.id === cardId
    )

    return card?.name || 'Sin tarjeta'

  }

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        '¿Eliminar esta cuota?'
      )

    if (!confirmDelete) return

    try {

      await deleteInstallment(id)

      reloadInstallments()

    } catch (error) {

      console.log(error)

    }

  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

      {installments.map((item) => {

        const remaining =
          item.installments -
          item.currentInstallment

        const remainingDebt =
          remaining *
          item.installmentAmount

        const progress =
          (item.currentInstallment /
            item.installments) *
          100

        return (

          <div
            key={item.id}
            className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'
          >

            <div className='flex justify-between items-start mb-6'>

              <div>

                <p className='text-zinc-400 text-sm mb-1'>
                  Compra
                </p>

                <h2 className='text-2xl font-bold'>
                  {item.description}
                </h2>

              </div>

              <div className='bg-white/10 px-3 py-1 rounded-full text-sm'>
                {
                  getCardName(item.cardId)
                }
              </div>

            </div>

            <div className='space-y-4'>

              <div className='flex justify-between'>

                <span className='text-zinc-400'>
                  Total
                </span>

                <span className='font-semibold'>
                  $
                  {item.totalAmount.toLocaleString()}
                </span>

              </div>

              <div className='flex justify-between'>

                <span className='text-zinc-400'>
                  Cuota actual
                </span>

                <span>
                  {
                    item.currentInstallment
                  }
                  /
                  {item.installments}
                </span>

              </div>

              <div className='flex justify-between'>

                <span className='text-zinc-400'>
                  Valor cuota
                </span>

                <span>
                  $
                  {Math.round(
                    item.installmentAmount
                  ).toLocaleString()}
                </span>

              </div>

              <div className='flex justify-between'>

                <span className='text-zinc-400'>
                  Restante
                </span>

                <span className='text-red-400 font-semibold'>
                  $
                  {Math.round(
                    remainingDebt
                  ).toLocaleString()}
                </span>

              </div>

              <div>

                <div className='flex justify-between text-sm mb-2'>

                  <span className='text-zinc-400'>
                    Progreso
                  </span>

                  <span>
                    {Math.round(progress)}%
                  </span>

                </div>

                <div className='w-full h-3 bg-zinc-800 rounded-full overflow-hidden'>

                  <div
                    style={{
                      width: `${progress}%`,
                    }}
                    className='h-full bg-white rounded-full'
                  />

                </div>

              </div>

              <div className='flex gap-3 pt-4'>

                <button
                  className='flex-1 bg-zinc-800 hover:bg-zinc-700 transition rounded-xl py-3'
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className='flex-1 bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold'
                >
                  Eliminar
                </button>

              </div>

            </div>

          </div>

        )

      })}

    </div>
  )
}

export default InstallmentList