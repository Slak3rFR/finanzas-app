import { useEffect, useState } from 'react'

import Layout from '../components/layout/Layout'

import CardForm from '../components/cards/CardForm'

import CardList from '../components/cards/CardList'

import { getCards } from '../services/cardService'

const Tarjetas = () => {

  const [cards, setCards] = useState([])

  const loadCards = async () => {

    try {

      const data = await getCards()

      setCards(data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {
    loadCards()
  }, [])

  return (
    <Layout>

      <div className='mb-10'>

        <h1 className='text-4xl font-bold mb-3'>
          Tarjetas
        </h1>

        <p className='text-zinc-400'>
          Administrá tus tarjetas y límites.
        </p>

      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>

        <div>

          <CardForm
            reloadCards={loadCards}
          />

        </div>

        <div className='xl:col-span-2'>

          <CardList cards={cards} />

        </div>

      </div>

    </Layout>
  )
}

export default Tarjetas