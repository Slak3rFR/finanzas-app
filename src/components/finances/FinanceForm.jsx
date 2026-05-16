import { useState } from 'react'

const FinanceForm = ({
  onAdd,
}) => {

  const [form, setForm] =
    useState({

      type: 'Gasto',

      category: 'Comida',

      description: '',

      amount: '',

      date: '',

    })

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    })

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    if (
      !form.description ||
      !form.amount ||
      !form.date
    ) {
      return
    }

    onAdd({

      ...form,

      amount: Number(
        form.amount
      ),

    })

    setForm({

      type: 'Gasto',

      category: 'Comida',

      description: '',

      amount: '',

      date: '',

    })

  }

  return (

    <form
      onSubmit={handleSubmit}
      className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8'
    >

      <h2 className='text-2xl font-bold mb-6'>
        Nuevo movimiento
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

        <select
          name='type'
          value={form.type}
          onChange={handleChange}
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        >

          <option value='Ingreso'>
            Ingreso
          </option>

          <option value='Gasto'>
            Gasto
          </option>

        </select>

        <select
          name='category'
          value={form.category}
          onChange={handleChange}
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        >

          <option value='Comida'>
            Comida
          </option>

          <option value='Transporte'>
            Transporte
          </option>

          <option value='Impuestos'>
            Impuestos
          </option>

          <option value='Salud'>
            Salud
          </option>

          <option value='Entretenimiento'>
            Entretenimiento
          </option>

          <option value='Servicios'>
            Servicios
          </option>

          <option value='Otros'>
            Otros
          </option>

        </select>

        <input
          type='text'
          name='description'
          placeholder='Descripción'
          value={form.description}
          onChange={handleChange}
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        />

        <input
          type='number'
          name='amount'
          placeholder='Monto'
          value={form.amount}
          onChange={handleChange}
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        />

        <input
          type='date'
          name='date'
          value={form.date}
          onChange={handleChange}
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        />

      </div>

      <button
        type='submit'
        className='mt-6 bg-emerald-500 hover:bg-emerald-600 transition-all px-6 py-3 rounded-xl font-semibold'
      >

        Guardar movimiento

      </button>

    </form>

  )
}

export default FinanceForm