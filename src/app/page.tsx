import CurrenciesForm from './components/currencies-form'
import { getCurrencies } from './lib/api'

export default async function Home () {
  const currencies = await getCurrencies()

  return (
    <main className='flex min-h-screen flex-col items-center p-8 lg:p-24 justify-center'>

      <div className='grow grid grid-rows-2 lg:grid-rows-1 grid-flow-col gap-4'>

        <div className='flex flex-col justify-center max-w-md'>
          <h1 className='text-4xl font-bold mb-6 text-gray-800'>Coin Convert</h1>
          <p className='text-gray-800'>
            Coin Converter facilita las conversiones monetarias. Nuestra calculadora de cambios proporciona tasas actualizadas al instante, simplificando la obtención de valores precisos entre dos monedas.
          </p>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:justify-center '>
          <CurrenciesForm currencies={currencies} />
        </div>

      </div>

    </main>
  )
}
