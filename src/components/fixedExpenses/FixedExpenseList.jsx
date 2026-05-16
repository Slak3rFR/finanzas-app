import {
  deleteFixedExpense,
} from '../../services/fixedExpenseService'

const FixedExpenseList = ({
  expenses,
  reloadExpenses,
}) => {

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          '¿Eliminar gasto fijo?'
        )

      if (!confirmDelete) return

      await deleteFixedExpense(id)

      reloadExpenses()

    }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

      {expenses.map((expense) => (

        <div
          key={expense.id}
          className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'
        >

          <div className='flex justify-between items-start mb-5'>

            <div>

              <p className='text-zinc-400 text-sm'>
                Categoría
              </p>

              <h2 className='text-2xl font-bold mt-1'>
                {expense.name}
              </h2>

            </div>

            <div className='bg-white/10 px-3 py-1 rounded-full text-sm'>
              {expense.category}
            </div>

          </div>

          <div className='space-y-4'>

            <div className='flex justify-between'>

              <span className='text-zinc-400'>
                Monto
              </span>

              <span className='text-red-400 font-semibold'>
                $
                {expense.amount.toLocaleString()}
              </span>

            </div>

            <div className='flex justify-between'>

              <span className='text-zinc-400'>
                Vence
              </span>

              <span>
                Día {expense.dueDay}
              </span>

            </div>

            <button
              onClick={() =>
                handleDelete(expense.id)
              }
              className='w-full bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold mt-4'
            >
              Eliminar
            </button>

          </div>

        </div>

      ))}

    </div>
  )
}

export default FixedExpenseList