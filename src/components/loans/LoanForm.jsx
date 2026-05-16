import { useState } from 'react'

import {
  addLoan,
} from '../../services/loanService'

const LoanForm = ({
  reloadLoans,
}) => {

  const [entity, setEntity] =
    useState('')

  const [
    totalAmount,
    setTotalAmount,
  ] = useState('')

  const [
    installmentAmount,
    setInstallmentAmount,
  ] = useState('')

  const [
    totalInstallments,
    setTotalInstallments,
  ] = useState('')

  const [
    paidInstallments,
    setPaidInstallments,
  ] = useState('0')

  const [startDate, setStartDate] =
    useState('')

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        await addLoan({

          entity,

          totalAmount:
            Number(totalAmount),

          installmentAmount:
            Number(
              installmentAmount
            ),

          totalInstallments:
            Number(
              totalInstallments
            ),

          paidInstallments:
            Number(
              paidInstallments
            ),

          startDate,

        })

        setEntity('')
        setTotalAmount('')
        setInstallmentAmount('')
        setTotalInstallments('')
        setPaidInstallments('0')
        setStartDate('')

        reloadLoans()

      } catch (error) {

        console.log(error)

      }

    }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'
    >

      <h2 className='text-2xl font-bold mb-6'>
        Nuevo préstamo
      </h2>

      <div className='flex flex-col gap-4'>

        <input
          type='text'
          placeholder='Entidad'
          value={entity}
          onChange={(e) =>
            setEntity(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
          required
        />

        <input
          type='number'
          placeholder='Monto total'
          value={totalAmount}
          onChange={(e) =>
            setTotalAmount(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
          required
        />

        <input
          type='number'
          placeholder='Valor cuota'
          value={installmentAmount}
          onChange={(e) =>
            setInstallmentAmount(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
          required
        />

        <input
          type='number'
          placeholder='Cantidad cuotas'
          value={totalInstallments}
          onChange={(e) =>
            setTotalInstallments(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
          required
        />

        <input
          type='number'
          placeholder='Cuotas pagadas'
          value={paidInstallments}
          onChange={(e) =>
            setPaidInstallments(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
        />

        <input
          type='date'
          value={startDate}
          onChange={(e) =>
            setStartDate(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
          required
        />

        <button
          type='submit'
          className='bg-white text-black font-semibold rounded-xl py-3'
        >
          Guardar préstamo
        </button>

      </div>

    </form>
  )
}

export default LoanForm