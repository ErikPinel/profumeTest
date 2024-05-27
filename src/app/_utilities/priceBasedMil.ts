import type { Product } from '../../payload/payload-types'

export const priceBasedMil = (product: Product, optionMil: string): number => {
  if (optionMil == '2mil') return product.price2Mil
  else if (optionMil == '5mil') return product.price5Mil
  else return product.price10Mil
}
