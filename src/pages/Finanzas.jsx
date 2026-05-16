import { useEffect, useMemo, useState } from 'react'

import Layout from '../components/layout/Layout'

import FinanceForm from '../components/finances/FinanceForm'

import FinanceTable from '../components/finances/FinanceTable'

import {
  addFinance,
  getFinances,
} from '../services/financeService'

const Finanzas = () => {

  const [finances, setFinances] =
    useState([])

  const currentDate =
    new Date()

  const [selectedMonth, setSelectedMonth] =
    useState(
      currentDate.getMonth()
    )

  const [selectedYear, setSelectedYear] =
    useState(
      currentDate.getFullYear()
    )

  const loadFinances =
    async () => {

      const data =
        await getFinances()

      setFinances(data)

    }

  useEffect(() => {

    loadFinances()

  }, [])

  const handleAdd =
    async (finance) => {

      await addFinance(finance)

      await loadFinances()

    }

  // FILTRAR POR MES

  const filteredFinances =
    useMemo(() => {

      return finances.filter(
        (item) => {

          if (!item.date)
            return false

          const [year, month] =
            item.date.split('-')

          return (
            Number(month) - 1 ===
              selectedMonth &&
            Number(year) ===
              selectedYear
          )

        }
      )

    }, [
      finances,
      selectedMonth,
      selectedYear,
    ])

  // TOTALES

  const incomeTotal =
    filteredFinances
      .filter(
        (item) =>
          item.type ===
          'Ingreso'
      )
      .reduce(
        (acc, item) =>
          acc +
          Number(item.amount || 0),
        0
      )

  const expenseTotal =
    filteredFinances
      .filter(
        (item) =>
          item.type ===
          'Gasto'
      )
      .reduce(
        (acc, item) =>
          acc +
          Number(item.amount || 0),
        0
      )

  const balance =
    incomeTotal -
    expenseTotal

  return (

    <Layout>

      {/* HEADER */}

      <div className='mb-8'>

        <h1 className='text-4xl font-bold'>
          Finanzas
        </h1>

      </div>

      {/* RESUMEN */}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

          <p className='text-zinc-400'>
            Balance
          </p>

          <h2 className='text-3xl font-bold mt-2'>
            $
            {balance.toLocaleString()}
          </h2>

        </div>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

          <p className='text-zinc-400'>
            Ingresos
          </p>

          <h2 className='text-3xl font-bold mt-2 text-emerald-400'>
            $
            {incomeTotal.toLocaleString()}
          </h2>

        </div>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

          <p className='text-zinc-400'>
            Gastos
          </p>

          <h2 className='text-3xl font-bold mt-2 text-red-400'>
            $
            {expenseTotal.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* FILTROS MES */}

      <div className='flex gap-4 mb-8 flex-wrap'>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              Number(e.target.value)
            )
          }
          className='bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3'
        >

          <option value={0}>
            Enero
          </option>

          <option value={1}>
            Febrero
          </option>

          <option value={2}>
            Marzo
          </option>

          <option value={3}>
            Abril
          </option>

          <option value={4}>
            Mayo
          </option>

          <option value={5}>
            Junio
          </option>

          <option value={6}>
            Julio
          </option>

          <option value={7}>
            Agosto
          </option>

          <option value={8}>
            Septiembre
          </option>

          <option value={9}>
            Octubre
          </option>

          <option value={10}>
            Noviembre
          </option>

          <option value={11}>
            Diciembre
          </option>

        </select>

        <input
          type='number'
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              Number(e.target.value)
            )
          }
          className='bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 w-32'
        />

      </div>

      {/* FORM */}

      <FinanceForm
        onAdd={handleAdd}
      />

      {/* TABLA */}

      <FinanceTable
        finances={
          filteredFinances
        }
      />

    </Layout>

  )
}

export default Finanzas