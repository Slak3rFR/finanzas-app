import { useEffect, useState } from 'react'

import Layout from '../components/layout/Layout'

import InstallmentForm from '../components/cards/InstallmentForm'

import InstallmentList from '../components/cards/InstallmentList'

import {
  getInstallments,
} from '../services/installmentService'

import {
  getCards,
} from '../services/cardService'

const Cuotas = () => {

  const [installments, setInstallments] =
    useState([])

  const [cards, setCards] =
    useState([])

  const loadData = async () => {

    try {

      const installmentsData =
        await getInstallments()

      const cardsData =
        await getCards()

      setInstallments(
        installmentsData
      )

      setCards(cardsData)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    loadData()

  }, [])

  return (
    <Layout>

      <div className='mb-10'>

        <h1 className='text-4xl font-bold mb-3'>
          Cuotas
        </h1>

        <p className='text-zinc-400'>
          Administrá compras financiadas.
        </p>

      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>

        {/* FORM */}

        <div>

          <InstallmentForm
            cards={cards}
            reloadInstallments={
              loadData
            }
          />

        </div>

        {/* LISTA */}

        <div className='xl:col-span-2'>

          <InstallmentList
            installments={installments}
            cards={cards}
            reloadInstallments={
              loadData
            }
          />

        </div>

      </div>

    </Layout>
  )
}

export default Cuotas