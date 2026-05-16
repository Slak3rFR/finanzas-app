import { useState } from 'react'

import {
  addInstallment,
} from '../../services/installmentService'

const InstallmentForm = ({
  cards,
  reloadInstallments,
}) => {

  const [description, setDescription] =
    useState('')

  const [totalAmount, setTotalAmount] =
    useState('')

  const [installments, setInstallments] =
    useState('')

  const [cardId, setCardId] =
    useState('')

  const [startDate, setStartDate] =
    useState('')

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        const installmentAmount =
          Number(totalAmount) /
          Number(installments)

        await addInstallment({

          description,

          totalAmount:
            Number(totalAmount),

          installments:
            Number(installments),

          installmentAmount,

          cardId,

          startDate,

        })

        setDescription('')
        setTotalAmount('')
        setInstallments('')
        setCardId('')
        setStartDate('')

        reloadInstallments()

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
        Nueva compra
      </h2>

      <div className='flex flex-col gap-4'>

        <input
          type='text'
          placeholder='Descripción'
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none'
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
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none'
          required
        />

        <input
          type='number'
          placeholder='Cantidad de cuotas'
          value={installments}
          onChange={(e) =>
            setInstallments(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none'
          required
        />

        <select
          value={cardId}
          onChange={(e) =>
            setCardId(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none'
          required
        >

          <option value=''>
            Seleccionar tarjeta
          </option>

          {cards.map((card) => (

            <option
              key={card.id}
              value={card.id}
            >
              {card.name}
            </option>

          ))}

        </select>

        <div>

          <label className='text-sm text-zinc-400 mb-2 block'>
            Fecha de inicio
          </label>

          <input
            type='date'
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none w-full'
            required
          />

        </div>

        <button
          type='submit'
          className='bg-white text-black font-semibold rounded-xl py-3 hover:opacity-90 transition'
        >
          Guardar compra
        </button>

      </div>

    </form>
  )
}

export default InstallmentForm