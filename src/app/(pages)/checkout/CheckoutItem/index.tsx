import Link from 'next/link'

import { Media } from '../../../_components/Media'
import PerfumeMilSelector from '../../../_components/PerfumeMilSelector'
import { Price } from '../../../_components/Price'
import { priceBasedMil } from '../../../_utilities/priceBasedMil'

import classes from './index.module.scss'

export const CheckoutItem = ({ product, title, optionMil, metaImage, quantity, index }) => {
  return (
    <li className={classes.item} key={index}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <div className={classes.priceAndMilWrapper}>
            <div className={classes.price}>₪{priceBasedMil(product, optionMil).toFixed(2)}</div>
            <PerfumeMilSelector milOption={optionMil} isPressed={true} handleClick={() => ''} />
          </div>
        </div>
        <p className={classes.quantity}>x{quantity}</p>
      </div>

      <div className={classes.subtotal}>
        <div className={classes.price}>
          ₪{(priceBasedMil(product, optionMil) * quantity).toFixed(2)}
        </div>
      </div>
    </li>
  )
}
