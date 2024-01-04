import CurrenciesForm from './components/currencies-form'
import { getCurrencies } from './lib/api'

export default async function Home () {
  const currencies = await getCurrencies()

  return (
    <main className='flex min-h-screen flex-col items-center p-8 lg:p-24 justify-center'>

      {/* <div className='grid grid-rows-2 lg:grid-rows-1 lg:grid-flow-col'> */}
      <div className='flex flex-col lg:flex-row'>

        <div className='flex flex-col max-w-md  max-h-none'>
          <h1 className='text-4xl font-bold mb-6 text-gray-800 flex'>FreeCurrency</h1>
          <p className='text-gray-800 pr-4 lg:pr-12 mb-7'>
            Free-Currency makes currency conversions easy. Our exchange rate calculator provides instantly updated rates, making it simple to obtain accurate values between two currencies.
          </p>
        </div>

        <div className='flex flex-col md:flex-row  md:justify-center'>
          <CurrenciesForm currencies={currencies} />
        </div>

      </div>

    </main>
  )
}
