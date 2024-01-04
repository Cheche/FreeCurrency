'use client'
import React, { useEffect, useState } from 'react'
import Selector from './selector'
import getExchange from '../lib/actions'
import { useFormState } from 'react-dom'
import Image from 'next/image'

interface Props {
  currencies: any[]
}
const CurrenciesForm = ({ currencies } : Props) => {
  const [baseCurrency, setBaseCurrency] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')
  const [currencySymbol, setCurrencySymbol] = useState('')

  const initialState = { success: undefined, errors: {} }
  const [state, formAction] = useFormState(getExchange, initialState)

  useEffect(() => {
    const symbol = currencies.find((currency) => currency.code === targetCurrency)
    setCurrencySymbol(symbol?.symbol)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const handleSwitchButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const tmp = baseCurrency
    setBaseCurrency(targetCurrency)
    setTargetCurrency(tmp)
  }

  return (
    <div className='max-w-md mx-auto rounded-lg overflow-hidden shadow-lg p-8 bg-white border'>
      <form action={formAction} className='flex flex-col items-center'>

        <button
          className='flex flex-row  text-blue-500 hover:underline focus:outline-none justify-end w-full'
          onClick={handleSwitchButton}
        >
          <Image
            src='/arrows-exchange.svg'
            alt='exchange currencies'
            width={24}
            height={24}
          />
          Switch currencies
        </button>

        <Selector
          label='Base Currency'
          inputId='currencyFrom'
          placeholder='Base Currency'
          options={currencies}
          value={baseCurrency}
          setValue={setBaseCurrency}
          errorMessage={state?.errors?.currencyFrom}
        />

        <Selector
          label='Target Currency'
          inputId='currencyTo'
          placeholder='Target Currency'
          options={currencies}
          value={targetCurrency}
          setValue={setTargetCurrency}
          errorMessage={state?.errors?.currencyTo}
        />

        <div className='w-full'>
          <label htmlFor='amount' className='mt-4 text-sm text-gray-600'>
            Amount
          </label>
          <input
            type='number'
            step='any'
            min='0'
            id='amount'
            name='amount'
            className='w-full rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-12'
          />
          {state?.errors?.amount && <p className='text-red-500 mt-1'>{state?.errors?.amount}</p>}
        </div>

        <button
          type='submit'
          className='mt-8 bg-blue-500 text-white py-2 px-4 w-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none h-12'
        >
          Submit
        </button>

        {state?.success && (
          <div className='mt-4 bg-green-100 p-4 '>
            <p className='text-3xl text-green-800'>
              {currencySymbol} {state?.success}
            </p>
          </div>
        )}

      </form>

    </div>
  )
}

export default CurrenciesForm
