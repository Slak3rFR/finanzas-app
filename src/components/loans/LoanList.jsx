import {
  deleteLoan,
} from '../../services/loanService'

const LoanList = ({
  loans,
  reloadLoans,
}) => {

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          '¿Eliminar préstamo?'
        )

      if (!confirmDelete)
        return

      await deleteLoan(id)

      reloadLoans()

    }

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

      <h2 className='text-2xl font-bold mb-6'>
        Préstamos
      </h2>

      <div className='flex flex-col gap-4'>

        {loans.map((loan) => {

          const remaining =
            loan.totalInstallments -
            loan.paidInstallments

          return (
            <div
              key={loan.id}
              className='bg-zinc-950 rounded-2xl p-5 border border-zinc-800'
            >

              <div className='flex justify-between items-start'>

                <div>

                  <h3 className='font-bold text-lg'>
                    {loan.entity}
                  </h3>

                  <p className='text-zinc-400 text-sm'>
                    $
                    {loan.installmentAmount.toLocaleString()}/mes
                  </p>

                  <p className='text-zinc-500 text-sm mt-2'>
                    {loan.paidInstallments}
                    /
                    {loan.totalInstallments} cuotas pagadas
                  </p>

                </div>

                <div className='text-right'>

                  <p className='text-red-400 font-bold'>
                    {remaining} cuotas restantes
                  </p>

                  <button
                    onClick={() =>
                      handleDelete(
                        loan.id
                      )
                    }
                    className='mt-3 bg-red-500 px-4 py-2 rounded-xl text-sm'
                  >
                    Eliminar
                  </button>

                </div>

              </div>

            </div>
          )

        })}

      </div>

    </div>
  )
}

export default LoanList