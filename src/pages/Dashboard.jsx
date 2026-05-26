import { useEffect, useMemo, useState } from 'react'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

import Layout from '../components/layout/Layout'

import { getFinances } from '../services/financeService'
import { getInstallments } from '../services/installmentService'
import { getLoans } from '../services/loanService'

const Dashboard = () => {

  const [finances, setFinances] =
    useState([])

  const [installments, setInstallments] =
    useState([])

  const [loans, setLoans] =
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

  const loadData =
    async () => {

      try {

        const financesData =
          await getFinances()

        const installmentsData =
          await getInstallments()

        const loansData =
          await getLoans()

        setFinances(financesData || [])

        setInstallments(
          installmentsData || []
        )

        setLoans(loansData || [])

      } catch (error) {

        console.log(error)

      }

    }

  useEffect(() => {

    loadData()

  }, [])

  // =========================
  // FILTRAR FINANZAS
  // =========================

  const filteredFinances =
    useMemo(() => {

      return finances.filter(
        (item) => {

          if (!item.date)
            return false

          const [
            year,
            month,
          ] = item.date
            .split('-')
            .map(Number)

          const itemMonth =
            month - 1

          const itemYear =
            year

          return (
            itemMonth ===
              selectedMonth &&
            itemYear ===
              selectedYear
          )

        }
      )

    }, [
      finances,
      selectedMonth,
      selectedYear,
    ])

  // =========================
  // INGRESOS
  // =========================

  const incomes =
    filteredFinances.filter(
      (item) =>
        item.type
          ?.trim()
          .toLowerCase() ===
        'ingreso'
    )

  // =========================
  // GASTOS
  // =========================

  const normalExpenses =
    filteredFinances.filter(
      (item) =>
        item.type
          ?.trim()
          .toLowerCase() ===
        'gasto'
    )

  // =========================
  // CUOTAS
  // =========================

  const installmentExpenses =
    installments.map((item) => ({

      name:
        item.description ||
        'Cuota',

      amount:
        Number(
          item.installmentAmount
        ) || 0,

    }))

  // =========================
  // PRESTAMOS
  // =========================

  const loanExpenses =
    loans.map((item) => ({

      name:
        item.description ||
        'Préstamo',

      amount:
        Number(
          item.monthlyPayment
        ) || 0,

    }))

  // =========================
  // TOTALES
  // =========================

  const totalIncome =
    incomes.reduce(
      (acc, item) =>
        acc +
        Number(item.amount || 0),
      0
    )

  const totalNormalExpenses =
    normalExpenses.reduce(
      (acc, item) =>
        acc +
        Number(item.amount || 0),
      0
    )

  const totalInstallments =
    installmentExpenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  const totalLoans =
    loanExpenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  const totalExpenses =
    totalNormalExpenses +
    totalInstallments +
    totalLoans

  const balance =
    totalIncome -
    totalExpenses

  // =========================
  // GRAFICOS
  // =========================

  const expenseChartData = [

    {
      name: 'Gastos',
      value:
        totalNormalExpenses,
    },

    {
      name: 'Cuotas',
      value:
        totalInstallments,
    },

    {
      name: 'Préstamos',
      value:
        totalLoans,
    },

  ]

  const categoryData = {}

  normalExpenses.forEach(
    (item) => {

      const category =
        item.category ||
        'Otros'

      if (
        !categoryData[
          category
        ]
      ) {

        categoryData[
          category
        ] = 0

      }

      categoryData[
        category
      ] += Number(
        item.amount || 0
      )

    }
  )

  const chartData =
    Object.entries(
      categoryData
    ).map(
      ([name, value]) => ({

        name,
        value,

      })
    )

  const COLORS = [
    '#10b981',
    '#ef4444',
    '#3b82f6',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
  ]

  return (

    <Layout>

      <div className='mb-8 flex flex-wrap gap-4 items-center justify-between'>

        <div>

          <h1 className='text-4xl font-bold'>
            Dashboard
          </h1>

          <p className='text-zinc-400 mt-2'>
            Resumen financiero
          </p>

        </div>

        <div className='flex gap-4'>

          <select
            value={
              selectedMonth
            }
            onChange={(e) =>
              setSelectedMonth(
                Number(
                  e.target.value
                )
              )
            }
            className='bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3'
          >

            <option value={0}>Enero</option>
            <option value={1}>Febrero</option>
            <option value={2}>Marzo</option>
            <option value={3}>Abril</option>
            <option value={4}>Mayo</option>
            <option value={5}>Junio</option>
            <option value={6}>Julio</option>
            <option value={7}>Agosto</option>
            <option value={8}>Septiembre</option>
            <option value={9}>Octubre</option>
            <option value={10}>Noviembre</option>
            <option value={11}>Diciembre</option>

          </select>

          <input
            type='number'
            value={
              selectedYear
            }
            onChange={(e) =>
              setSelectedYear(
                Number(
                  e.target.value
                )
              )
            }
            className='bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 w-32'
          />

        </div>

      </div>

      {/* CARDS */}

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
            {totalIncome.toLocaleString()}
          </h2>

        </div>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

          <p className='text-zinc-400'>
            Gastos
          </p>

          <h2 className='text-3xl font-bold mt-2 text-red-400'>
            $
            {totalExpenses.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* GRAFICOS */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6 min-h-[420px]'>

          <h2 className='text-2xl font-bold mb-6'>
            Distribución de gastos
          </h2>

          <div className='w-full h-[300px]'>

            <ResponsiveContainer width='100%' height='100%'>

              <PieChart>

                <Pie
                  data={expenseChartData}
                  dataKey='value'
                  nameKey='name'
                  outerRadius={100}
                  label
                >

                  {expenseChartData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6 min-h-[420px]'>

          <h2 className='text-2xl font-bold mb-6'>
            Gastos por categoría
          </h2>

          <div className='w-full h-[300px]'>

            <ResponsiveContainer width='100%' height='100%'>

              <BarChart
                data={chartData}
              >

                <CartesianGrid strokeDasharray='3 3' />

                <XAxis dataKey='name' />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey='value'
                  fill='#10b981'
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </Layout>

  )
}

export default Dashboard