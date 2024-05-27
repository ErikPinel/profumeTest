'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Product } from '../../../../payload/payload-types'
import { Media } from '../../../_components/Media'
import PerfumeMilSelector from '../../../_components/PerfumeMilSelector'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { priceBasedMil } from '../../../_utilities/priceBasedMil'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, addItemToCart, optionMil }) => {
  const [quantity, setQuantity] = useState(qty)
  const { deleteItemFromCart, isProductInCart } = useCart()
  const { user, status: authStatus } = useAuth()
  useEffect(() => {
    console.log(quantity, ' ', optionMil)
  }, [quantity, user])

  const decrementQty = () => {
    const incomingOptionMil = optionMil // Correct deleteItem Prop
    if (quantity > 1) {
      addItemToCart({ product, quantity: Number(quantity - 1), optionMil })
      setQuantity(quantity - 1)
    } else {
      deleteItemFromCart(product, incomingOptionMil)
    }
  }
  const incrementQty = () => {
    addItemToCart({ product, quantity: Number(quantity + 1), optionMil })
    setQuantity(quantity + 1)
  }
  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('enterQty', quantity)
    const updatedQty = Number(e.target.value)
    updatedQty >= 1
      ? (addItemToCart({ product, quantity: Number(updatedQty), optionMil }),
        setQuantity(updatedQty))
      : null
  }
  return (
    <li className={classes.item}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No Image</span>}
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

        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src="/assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
          <input
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />
          <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image
              src="/assets/icons/plus.svg"
              alt="plus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
        </div>
      </div>
      <div className={classes.subtotalWrapper}>
        {/* <Price product={product} button={false} quantity={quantity} /> */}
        <div className={classes.price}>
          ₪{(priceBasedMil(product, optionMil) * quantity).toFixed(2)}
        </div>
        <RemoveFromCartButton product={product} incomingOptionMil={optionMil} />
      </div>
    </li>
  )
}

export default CartItem
