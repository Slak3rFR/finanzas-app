import { useState } from 'react'

import { addCard } from '../../services/cardService'

import { auth } from '../../firebase/config'

const CardForm = ({ reloadCards }) => {

  const [name, setName] = useState('')

  const [limit, setLimit] = useState('')

  const [closingDay, setClosingDay] = useState('')

  const [dueDay, setDueDay] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !name ||
      !limit ||
      !closingDay ||
      !dueDay
    ) return

    try {

      await addCard({
        uid: auth.currentUser.uid,
        name,
        limit: Number(limit),
        closingDay: Number(closingDay),
        dueDay: Number(dueDay),
        createdAt: Date.now(),
      })

      setName('')
      setLimit('')
      setClosingDay('')
      setDueDay('')

      reloadCards()

    } catch (error) {

      console.log(error)

      alert('Error al guardar tarjeta')

    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-5'
    >

      <h2 className='text-2xl font-bold'>
        Nueva tarjeta
      </h2>

      <input
        type='text'
        placeholder='Nombre tarjeta'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
      />

      <input
        type='number'
        placeholder='Límite'
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
      />

      <div className='flex flex-col gap-2'>

        <label className='text-sm text-zinc-400'>
          Día de cierre
        </label>

        <input
          type='number'
          min='1'
          max='31'
          value={closingDay}
          onChange={(e) => setClosingDay(e.target.value)}
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
        />

      </div>

      <div className='flex flex-col gap-2'>

        <label className='text-sm text-zinc-400'>
          Día de vencimiento
        </label>

        <input
          type='number'
          min='1'
          max='31'
          value={dueDay}
          onChange={(e) => setDueDay(e.target.value)}
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3'
        />

      </div>

      <button
        type='submit'
        className='bg-white text-black rounded-xl py-3 font-semibold hover:opacity-80 transition'
      >
        Guardar tarjeta
      </button>

    </form>
  )
}

export default CardForm