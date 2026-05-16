import {
  useEffect,
  useState,
} from 'react'

import Layout from '../components/layout/Layout'

import LoanForm from '../components/loans/LoanForm'

import LoanList from '../components/loans/LoanList'

import {
  getLoans,
} from '../services/loanService'

const Prestamos = () => {

  const [loans, setLoans] =
    useState([])

  const loadLoans =
    async () => {

      const data =
        await getLoans()

      setLoans(data)

    }

  useEffect(() => {

    loadLoans()

  }, [])

  return (
    <Layout>

      <div className='mb-10'>

        <h1 className='text-4xl font-bold mb-2'>
          Préstamos
        </h1>

        <p className='text-zinc-400'>
          Administrá tus deudas
        </p>

      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>

        <LoanForm
          reloadLoans={loadLoans}
        />

        <div className='xl:col-span-2'>

          <LoanList
            loans={loans}
            reloadLoans={
              loadLoans
            }
          />

        </div>

      </div>

    </Layout>
  )
}

export default Prestamos