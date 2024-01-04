'use client'

import { useFormStatus } from 'react-dom'

interface Props {
  label: string
}

export function SubmitButton ({ label }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      aria-disabled={pending}
      className={`mt-8  text-white py-2 px-4 w-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none h-12 ${pending ? 'bg-blue-100' : 'bg-blue-500'}`}
    >
      {label}
    </button>
  )
}
