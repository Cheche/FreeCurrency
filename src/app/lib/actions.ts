'use server'
import { revalidatePath } from 'next/cache'
import { getRatesCurrencies } from './api'
import { z } from 'zod'

const currencyFormSchema = z.object({
  currencyFrom: z.string().min(3),
  currencyTo: z.string().min(3),
  amount: z.number({
    required_error: 'Debw ingresar la cantidad de dinero a convertir',
    invalid_type_error: 'La cantidad debe ser un número'
  }).positive('La cantidad debe ser mayor a 0 (cero)')
})

type State = {
  errors?: {
    currencyFrom?: string[] | string;
    currencyTo?: string[] | string;
    amount?: string[] | string;
  } | null;
  success?: number | null
};

export default async function getExchange (prevState: State, formData: FormData) {
  const currencyFrom = formData.get('currencyFrom') as string
  const currencyTo = formData.get('currencyTo') as string
  const amount = Number(formData.get('amount') as string)

  revalidatePath('/')

  const response : State = {}

  const validateFields = currencyFormSchema.safeParse({
    currencyFrom,
    currencyTo,
    amount
  })

  if (!validateFields.success) {
    response.errors = validateFields.error.flatten().fieldErrors
    response.success = null
    return response
  }

  try {
    const rate = await getRatesCurrencies(currencyFrom, currencyTo)

    const calc = Number(Object.values(rate.data).flat()[0]) * amount

    response.errors = null
    response.success = Number(calc.toFixed(2))

    return response
  } catch (e) {
    console.log(e)
    response.errors = null
    response.success = null
    return prevState
  }
}
