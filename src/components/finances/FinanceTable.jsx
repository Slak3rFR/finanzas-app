import { useMemo, useState } from 'react'

import {
  Trash2,
  FileSpreadsheet,
  Download,
} from 'lucide-react'

import {
  deleteFinance,
} from '../../services/financeService'

import {
  exportToExcel,
  exportToPDF,
} from '../../utils/exportData'

const FinanceTable = ({
  finances,
}) => {

  const [search, setSearch] =
    useState('')

  const [typeFilter, setTypeFilter] =
    useState('Todos')

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState('Todas')

  const [sortBy, setSortBy] =
    useState('date')

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          '¿Eliminar movimiento?'
        )

      if (!confirmDelete)
        return

      await deleteFinance(id)

      window.location.reload()

    }

  const filteredData =
    useMemo(() => {

      let data = [...finances]

      // BUSQUEDA

      data = data.filter(
        (item) => {

          const text =
            `
            ${item.description}
            ${item.category}
            ${item.type}
          `
              .toLowerCase()

          return text.includes(
            search.toLowerCase()
          )

        }
      )

      // FILTRO TIPO

      if (
        typeFilter !== 'Todos'
      ) {

        data = data.filter(
          (item) =>
            item.type ===
            typeFilter
        )

      }

      // FILTRO CATEGORIA

      if (
        categoryFilter !==
        'Todas'
      ) {

        data = data.filter(
          (item) =>
            item.category ===
            categoryFilter
        )

      }

      // ORDEN

      switch (sortBy) {

        case 'amount':

          data.sort(
            (a, b) =>
              b.amount -
              a.amount
          )

          break

        case 'name':

          data.sort((a, b) =>
            a.description.localeCompare(
              b.description
            )
          )

          break

        case 'date':

        default:

          data.sort(
            (a, b) =>
              new Date(
                b.date
              ) -
              new Date(a.date)
          )

      }

      return data

    }, [
      finances,
      search,
      typeFilter,
      categoryFilter,
      sortBy,
    ])

  return (

    <div className='bg-zinc-900 border border-zinc-800 rounded-3xl p-6'>

      {/* FILTROS */}

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>

        <input
          type='text'
          placeholder='Buscar...'
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        />

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        >

          <option>
            Todos
          </option>

          <option>
            Ingreso
          </option>

          <option>
            Gasto
          </option>

        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        >

          <option>
            Todas
          </option>

          <option>
            Comida
          </option>

          <option>
            Transporte
          </option>

          <option>
            Impuestos
          </option>

          <option>
            Salud
          </option>

          <option>
            Entretenimiento
          </option>

          <option>
            Servicios
          </option>

          <option>
            Otros
          </option>

        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className='bg-zinc-950 border border-zinc-800 rounded-xl p-3'
        >

          <option value='date'>
            Ordenar por fecha
          </option>

          <option value='amount'>
            Ordenar por monto
          </option>

          <option value='name'>
            Ordenar por nombre
          </option>

        </select>

      </div>

      {/* EXPORTAR */}

      <div className='flex gap-4 mb-6 flex-wrap'>

        <button
          onClick={() =>
            exportToExcel(
              filteredData
            )
          }
          className='bg-emerald-500 hover:bg-emerald-600 transition-all px-5 py-3 rounded-xl flex items-center gap-2 font-semibold'
        >

          <FileSpreadsheet
            size={18}
          />

          Exportar Excel

        </button>

        <button
          onClick={() =>
            exportToPDF(
              filteredData
            )
          }
          className='bg-red-500 hover:bg-red-600 transition-all px-5 py-3 rounded-xl flex items-center gap-2 font-semibold'
        >

          <Download size={18} />

          Exportar PDF

        </button>

      </div>

      {/* TABLA */}

      <div className='overflow-x-auto'>

        <table className='w-full'>

          <thead>

            <tr className='border-b border-zinc-800 text-zinc-400'>

              <th className='text-left p-4'>
                Fecha
              </th>

              <th className='text-left p-4'>
                Tipo
              </th>

              <th className='text-left p-4'>
                Categoría
              </th>

              <th className='text-left p-4'>
                Descripción
              </th>

              <th className='text-left p-4'>
                Monto
              </th>

              <th className='text-left p-4'>
                Acción
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredData.map(
              (item) => (

                <tr
                  key={item.id}
                  className='border-b border-zinc-800 hover:bg-zinc-950 transition-all'
                >

                  <td className='p-4'>
                    {item.date}
                  </td>

                  <td className='p-4'>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.type ===
                        'Ingreso'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >

                      {item.type}

                    </span>

                  </td>

                  <td className='p-4'>
                    {item.category}
                  </td>

                  <td className='p-4'>
                    {
                      item.description
                    }
                  </td>

                  <td className='p-4 font-semibold'>

                    $
                    {Number(
                      item.amount
                    ).toLocaleString()}

                  </td>

                  <td className='p-4'>

                    <button
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                      className='bg-red-500/20 hover:bg-red-500/30 transition-all p-2 rounded-xl'
                    >

                      <Trash2
                        size={18}
                      />

                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  )
}

export default FinanceTable