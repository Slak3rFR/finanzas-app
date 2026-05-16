const MonthFilter = ({
  selectedMonth,
  setSelectedMonth,
}) => {

  return (
    <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className='bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white'
    >

    <option value='all'>
    Todos los meses
    </option>

    <option value='0'>Enero</option>
    <option value='1'>Febrero</option>
    <option value='2'>Marzo</option>
    <option value='3'>Abril</option>
    <option value='4'>Mayo</option>
    <option value='5'>Junio</option>
    <option value='6'>Julio</option>
    <option value='7'>Agosto</option>
    <option value='8'>Septiembre</option>
    <option value='9'>Octubre</option>
    <option value='10'>Noviembre</option>
    <option value='11'>Diciembre</option>

    </select>
    )
}

export default MonthFilter