'use client'
import React, { useState } from 'react'
import classes from './index.module.scss'
import Link from 'next/link'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import Image from 'next/image'
import { RemoveFromCartButton,deleteItemFromCart } from '../../../_components/RemoveFromCartButton'
import { useCart } from '../../../_providers/Cart'
const CartItem = ({ product, title, metaImage, qty, addItemToCart }) => {
    const [quantity, setQuantity] = useState(qty)
    const { deleteItemFromCart, isProductInCart } = useCart()
    const decrementQty = () => { 
         quantity > 1 ? (
            addItemToCart({ product, quantity: Number(quantity-1)}),setQuantity(quantity-1) 
        ) :  deleteItemFromCart(product);
    }
    const incrementQty = () => { 
        
            addItemToCart({ product, quantity: Number(quantity+1)});
            setQuantity(quantity+1);
      
    }
    const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const updatedQty = Number(e.target.value);
        updatedQty >=1 ?
        (
            addItemToCart({ product, quantity: Number(updatedQty)})
            ,
            setQuantity(updatedQty)
        )
        : null
    }
    return (
        <li className={classes.item}>
            <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                {!metaImage && <span>No Image</span>}
                {metaImage && typeof metaImage !== 'string' && (
                    <Media className={classes.media} imgClassName={classes.image}
                        resource={metaImage} fill />
                )}
            </Link>

            <div className={classes.itemDetails}>
                <div className={classes.titleWrapper}>
                    <h6>{title}</h6>
                    <Price product={product} button={false} />
                </div>

                <div className={classes.quantity}>
                <div className={classes.quantityBtn} onClick={decrementQty}>
                        <Image src='/assets/icons/minus.svg' alt='minus' width={24} height={24}
                            className={classes.qtnBt} />
                    </div>
                    <input type='text' className={classes.quantityInput}
                        value={quantity} onChange={enterQty} />
                    <div className={classes.quantityBtn} onClick={incrementQty}>
                        <Image src='/assets/icons/plus.svg' alt='plus' width={24} height={24}
                            className={classes.qtnBt} />
                    </div>
                </div>
            </div>
            <div className={classes.subtotalWrapper} >
                <Price product={product} button={false} quantity={quantity}/>
                <RemoveFromCartButton product={product}/>

            </div>
        </li>
    )
}

export default CartItem