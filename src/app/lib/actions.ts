'use server'
import { revalidatePath } from 'next/cache'
import { getRatesCurrencies } from './api'
import { z } from 'zod'

const currencyFormSchema = z.object({
  currencyFrom: z.string({
    invalid_type_error: 'Enter a currency'
  }).min(3),
  currencyTo: z.string({
    invalid_type_error: 'Enter a currency'
  }).min(3),
  amount: z.number({
    required_error: 'You must enter an amount of money to be converted',
    invalid_type_error: 'Enter a number'
  }).positive('The amount must be greater than 0 (zero).')
})

type State = {
  errors?: {
    currencyFrom?: string[] | string;
    currencyTo?: string[] | string;
    amount?: string[] | string;
  } | null;
  success?: {
    from: string;
    to: string;
    rate: string
  } | null
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

    const numberRate = Number(Object.values(rate.data).flat()[0])
    const calc = numberRate * amount

    response.errors = null
    response.success = { from: amount.toFixed(2), to: calc.toFixed(2), rate: numberRate.toFixed(2) }

    return response
  } catch (e) {
    console.log(e)
    response.errors = null
    response.success = null
    return prevState
  }
}
