'use server'

interface ICurrencyData {
  [key: string]: {
    name: string;
  };
}

export const getCurrencies = async () => {
  const url = `${process.env.FREECURRENCYAPI_URL}/currencies?apikey=${process.env.FREECURRENCYAPI_KEY}`
  const dataFetch = await fetch(url)

  if (!dataFetch) return []

  try {
    const currencies: {data: ICurrencyData} = await dataFetch.json()

    const arrayCurrencies = []
    for (const [key, value] of Object.entries(currencies.data)) {
      arrayCurrencies.push({ code: key, name: value.name })
    }
    return arrayCurrencies
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getRatesCurrencies = async (baseCurrency: string, targetCurrency: string) => {
  const url = `${process.env.FREECURRENCYAPI_URL}/latest?apikey=${process.env.FREECURRENCYAPI_KEY}&base_currency=${baseCurrency}&currencies=${targetCurrency}`

  const data = await fetch(url)

  return data.json()
}
