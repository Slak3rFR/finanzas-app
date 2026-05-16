import { useEffect, useState } from 'react'

import Layout from '../components/layout/Layout'

import FixedExpenseForm from '../components/fixedExpenses/FixedExpenseForm'

import FixedExpenseList from '../components/fixedExpenses/FixedExpenseList'

import {
  getFixedExpenses,
} from '../services/fixedExpenseService'

const GastosFijos = () => {

  const [expenses, setExpenses] =
    useState([])

  const loadExpenses =
    async () => {

      const data =
        await getFixedExpenses()

      setExpenses(data)

    }

  useEffect(() => {
    loadExpenses()
  }, [])

  return (
    <Layout>

      <div className='mb-10'>

        <h1 className='text-4xl font-bold mb-3'>
          Gastos fijos
        </h1>

        <p className='text-zinc-400'>
          Administrá gastos recurrentes.
        </p>

      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>

        <div>

          <FixedExpenseForm
            reloadExpenses={
              loadExpenses
            }
          />

        </div>

        <div className='xl:col-span-2'>

          <FixedExpenseList
            expenses={expenses}
            reloadExpenses={
              loadExpenses
            }
          />

        </div>

      </div>

    </Layout>
  )
}

export default GastosFijos