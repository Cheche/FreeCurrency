'use client'
import React from 'react'

interface Props {
  label: string;
  inputId: string;
  placeholder: string;
  options: any[]
  value: any
  setValue: (value: any) => void;
  errorMessage?: string | string[] | undefined
}

const Selector = ({ label, inputId, placeholder, options, value, setValue, errorMessage }:Props) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    setValue(selectedValue)
  }

  return (
    <div className='relative mb-4'>

      <label htmlFor={inputId} className='leading-7 text-sm text-gray-600'>{label}</label>

      <select
        id={inputId}
        name={inputId}
        onChange={handleSelectChange}
        value={value}
        className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
      >

        <option disabled value=''>{placeholder}</option>

        {options.map((opt, index) => (
          <option
            key={index}
            value={opt.code}
          >
            {opt.code}: {opt.name}
          </option>
        ))}
      </select>

      {errorMessage && <p>{errorMessage}</p>}

    </div>
  )
}

export default Selector
