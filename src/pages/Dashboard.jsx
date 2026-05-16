import { useEffect, useState } from 'react'

import Layout from '../components/layout/Layout'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  CreditCard,
  Landmark,
} from 'lucide-react'

import {
  getFinances,
} from '../services/financeService'

import {
  getInstallments,
} from '../services/installmentService'

import {
  getFixedExpenses,
} from '../services/fixedExpenseService'

import {
  getLoans,
} from '../services/loanService'

const COLORS = [
  '#22c55e',
  '#ef4444',
  '#3b82f6',
  '#f59e0b',
  '#a855f7',
  '#14b8a6',
]

const Dashboard = () => {

  const [finances, setFinances] =
    useState([])

  const [installments, setInstallments] =
    useState([])

  const [fixedExpenses, setFixedExpenses] =
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

  const loadData = async () => {

    const financesData =
      await getFinances()

    const installmentsData =
      await getInstallments()

    const fixedExpensesData =
      await getFixedExpenses()

    const loansData =
      await getLoans()

    setFinances(financesData)

    setInstallments(
      installmentsData
    )

    setFixedExpenses(
      fixedExpensesData
    )

    setLoans(loansData)

  }

  useEffect(() => {

    loadData()

  }, [])

  // FILTRAR MOVIMIENTOS

  const filteredFinances =
    finances.filter((item) => {

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

    })

  // INGRESOS

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

  // GASTOS NORMALES

  const normalExpenses =
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

  // CUOTAS

  const installmentExpenses =
    installments.reduce(
      (acc, item) => {

        return (
          acc +
          Number(
            item.installmentAmount ||
              0
          )
        )

      },
      0
    )

  // PRESTAMOS

  const loansTotal =
    loans.reduce(
      (acc, loan) => {

        return (
          acc +
          Number(
            loan.installmentAmount ||
              0
          )
        )

      },
      0
    )

  // GASTOS FIJOS

  const fixedExpensesTotal =
    fixedExpenses.reduce(
      (acc, item) =>
        acc +
        Number(item.amount || 0),
      0
    )

  // TOTAL GASTOS

  const expenseTotal =
    normalExpenses +
    installmentExpenses +
    fixedExpensesTotal +
    loansTotal

  // BALANCE

  const balance =
    incomeTotal -
    expenseTotal

  // GRAFICO

  const groupedCategories = {}

  filteredFinances
    .filter(
      (item) =>
        item.type === 'Gasto'
    )
    .forEach((item) => {

      const category =
        item.category || 'Otros'

      if (
        groupedCategories[
          category
        ]
      ) {

        groupedCategories[
          category
        ] += Number(
          item.amount || 0
        )

      } else {

        groupedCategories[
          category
        ] = Number(
          item.amount || 0
        )

      }

    })

  const categoryData =
    Object.entries(
      groupedCategories
    ).map(
      ([name, value]) => ({

        name,

        value,

      })
    )

  return (
    <Layout>

      {/* HEADER */}

      <div className='mb-8'>

        <h1 className='text-4xl font-bold'>
          Dashboard
        </h1>

      </div>

      {/* FILTROS */}

      <div className='flex gap-4 mb-8'>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              Number(e.target.value)
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
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              Number(e.target.value)
            )
          }
          className='bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 w-32'
        />

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

      {/* GRID */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

        {/* GRAFICO */}

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6 min-h-[500px]'>

          <h2 className='text-2xl font-bold mb-6'>
            Gastos por categoría
          </h2>

          {categoryData.length > 0 ? (

            <div className='w-full h-[350px]'>

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey='value'
                    nameKey='name'
                    outerRadius={120}
                    label
                  >

                    {categoryData.map(
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

          ) : (

            <div className='flex items-center justify-center h-[350px] text-zinc-500'>
              No hay gastos cargados
            </div>

          )}

        </div>

        {/* RESUMEN */}

        <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

          <h2 className='text-2xl font-bold mb-6'>
            Resumen de gastos
          </h2>

          <div className='space-y-4'>

            <div className='flex justify-between bg-zinc-950 rounded-2xl p-4'>

              <div className='flex gap-3 items-center'>
                <Receipt />
                <span>
                  Gastos normales
                </span>
              </div>

              <span>
                $
                {normalExpenses.toLocaleString()}
              </span>

            </div>

            <div className='flex justify-between bg-zinc-950 rounded-2xl p-4'>

              <div className='flex gap-3 items-center'>
                <CreditCard />
                <span>Cuotas</span>
              </div>

              <span>
                $
                {installmentExpenses.toLocaleString()}
              </span>

            </div>

            <div className='flex justify-between bg-zinc-950 rounded-2xl p-4'>

              <div className='flex gap-3 items-center'>
                <Landmark />
                <span>Préstamos</span>
              </div>

              <span>
                $
                {loansTotal.toLocaleString()}
              </span>

            </div>

            <div className='flex justify-between bg-zinc-950 rounded-2xl p-4'>

              <div className='flex gap-3 items-center'>
                <Wallet />
                <span>
                  Gastos fijos
                </span>
              </div>

              <span>
                $
                {fixedExpensesTotal.toLocaleString()}
              </span>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  )
}

export default Dashboard