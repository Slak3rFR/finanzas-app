import { useState } from 'react'

import { auth } from '../../firebase/config'

import {
  addFixedExpense,
} from '../../services/fixedExpenseService'

const FixedExpenseForm = ({
  reloadExpenses,
}) => {

  const [name, setName] =
    useState('')

  const [amount, setAmount] =
    useState('')

  const [category, setCategory] =
    useState('Servicios')

  const [dueDay, setDueDay] =
    useState('')

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !name ||
      !amount ||
      !dueDay
    ) return

    await addFixedExpense({
      uid: auth.currentUser.uid,
      name,
      amount: Number(amount),
      category,
      dueDay: Number(dueDay),
      active: true,
      createdAt: Date.now(),
    })

    setName('')
    setAmount('')
    setDueDay('')

    reloadExpenses()

  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-5'
    >

      <h2 className='text-2xl font-bold'>
        Nuevo gasto fijo
      </h2>

      <input
        type='text'
        placeholder='Nombre'
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
      />

      <input
        type='number'
        placeholder='Monto'
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
      >

        <option>
          Servicios
        </option>

        <option>
          Hogar
        </option>

        <option>
          Entretenimiento
        </option>

        <option>
          Impuestos
        </option>

      </select>

      <div className='flex flex-col gap-2'>

        <label className='text-sm text-zinc-400'>
          Día vencimiento
        </label>

        <input
          type='number'
          min='1'
          max='31'
          value={dueDay}
          onChange={(e) =>
            setDueDay(e.target.value)
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
        />

      </div>

      <button
        type='submit'
        className='bg-white text-black rounded-xl py-3 font-semibold'
      >
        Guardar gasto fijo
      </button>

    </form>
  )
}

export default FixedExpenseForm