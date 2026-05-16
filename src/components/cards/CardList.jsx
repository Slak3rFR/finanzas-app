const CardList = ({ cards }) => {

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

      {cards.map((card) => (

        <div
          key={card.id}
          className='bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6'
        >

          <div className='flex justify-between items-start mb-8'>

            <div>

              <p className='text-zinc-400 text-sm mb-1'>
                Tarjeta
              </p>

              <h2 className='text-2xl font-bold'>
                {card.name}
              </h2>

            </div>

            <div className='bg-white/10 px-3 py-1 rounded-full text-sm'>
              Crédito
            </div>

          </div>

          <div className='space-y-3'>

            <div className='flex justify-between'>

              <span className='text-zinc-400'>
                Límite
              </span>

              <span className='font-semibold'>
                ${card.limit.toLocaleString()}
              </span>

            </div>

            <div className='flex justify-between'>

              <span className='text-zinc-400'>
                Cierre
              </span>

              <span>
                Día {card.closingDay}
              </span>

            </div>

            <div className='flex justify-between'>

              <span className='text-zinc-400'>
                Vencimiento
              </span>

              <span>
                Día {card.dueDay}
              </span>

            </div>

          </div>

        </div>

      ))}

    </div>
  )
}

export default CardList