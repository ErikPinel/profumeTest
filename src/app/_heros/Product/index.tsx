'use client'
import React, { Fragment, useState } from 'react'

import { Category, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import PerfumeMilSelector from '../../_components/PerfumeMilSelector'

// import { Price } from '../../_components/Price'
import classes from './index.module.scss'

const milOptions = ['2mil', '5mil', '10mil']

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    title,
    categories,
    price2Mil,
    price5Mil,
    price10Mil,
    meta: { image: metaImage, description } = {},
  } = product
  const [isPressed, setIsPressed] = useState('2mil')

  const handleClick = val => {
    setIsPressed(val)
  }

  function handlePriceMil(): number {
    let price: number

    if (isPressed === '2mil') {
      price = Number(price2Mil.toFixed(2))
    } else if (isPressed === '5mil') {
      price = Number(price5Mil.toFixed(2))
    } else {
      price = Number(price10Mil.toFixed(2))
    }

    return price
  }

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName={classes.image} resource={metaImage} fill />
        )}
      </div>

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>

        <div className={classes.detailsContentRow}>
          <div className={classes.categoryWrapper}>
            <div className={classes.categories}>
              {categories?.map((category, index) => {
                const { title: categoryTitle } = category as Category

                const titleToUse = categoryTitle || 'Generic'
                const isLast = index === categories.length - 1

                return (
                  <p key={index} className={classes.category}>
                    {titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}
                    <span className={classes.separator}>|</span>
                  </p>
                )
              })}
            </div>
            <p className={classes.stock}> In stock </p>
          </div>
          <div className={classes.milOptionsContainer}>
            {milOptions.map((milOption, index) => (
              <PerfumeMilSelector
                handleClick={handleClick}
                key={index}
                milOption={milOption}
                isPressed={isPressed == milOption}
              />
            ))}
          </div>
        </div>

        {/* <Price product={product} button={false} /> */}
        <div className={classes.price}>₪{handlePriceMil()}</div>

        <div className={classes.description}>
          <h6>Description</h6>
          <p>{description}</p>
        </div>

        <AddToCartButton
          product={product}
          optionMil={isPressed}
          className={classes.addToCartButton}
        />
      </div>
    </Gutter>
  )
}
