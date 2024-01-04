'use client'
import React, { useState } from 'react'
import Selector from './selector'
import getExchange from '../lib/actions'
import { useFormState } from 'react-dom'

interface Props {
  currencies: any[]
}
const CurrenciesForm = ({ currencies } : Props) => {
  const [baseCurrency, setBaseCurrency] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')

  const initialState = { success: undefined, errors: {} }
  const [state, formAction] = useFormState(getExchange, initialState)

  const handleSwitchButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const tmp = baseCurrency
    setBaseCurrency(targetCurrency)
    setTargetCurrency(tmp)
  }

  return (
    <div className='max-w-md mx-auto rounded overflow-hidden shadow-lg my-8 p-8 bg-white'>
      <form action={formAction} className='flex flex-col items-center'>

        <Selector
          label='Base Currency'
          inputId='currencyFrom'
          placeholder='Base Currency'
          options={currencies}
          value={baseCurrency}
          setValue={setBaseCurrency}
          errorMessage={state?.errors?.currencyFrom}
        />

        <button
          className='mt-4 mb-8 text-blue-500 hover:underline focus:outline-none'
          onClick={handleSwitchButton}
        >
          Switch currencies
        </button>

        <Selector
          label='Target Currency'
          inputId='currencyTo'
          placeholder='Target Currency'
          options={currencies}
          value={targetCurrency}
          setValue={setTargetCurrency}
          errorMessage={state?.errors?.currencyTo}
        />

        <label htmlFor='amount' className='mt-4 text-sm text-gray-600'>
          Amount
        </label>
        <input
          type='number'
          step='any'
          min='0'
          id='amount'
          name='amount'
          className='w-full bg-gray-100 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
        />
        {state?.errors?.amount && <p className='text-red-500 mt-1'>{state?.errors?.amount}</p>}

        <button
          type='submit'
          className='mt-8 bg-blue-500 text-white py-2 px-4 w-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none'
        >
          Submit
        </button>

      </form>

      {state?.success && <p className='mt-4 text-green-500'>{state?.success}</p>}
    </div>
  )
}

export default CurrenciesForm
