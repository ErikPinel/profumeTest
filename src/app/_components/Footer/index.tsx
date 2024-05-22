/* eslint-disable simple-import-sort/imports */
/* eslint-disable prettier/prettier */
import React from 'react'
import Link from 'next/link'

import { Footer } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'
import { ThemeSelector } from '../../_providers/Theme/ThemeSelector'

import classes from './index.module.scss'
import FooterComponent from './FooterComponent'

export async function Footer() {
  let footer: Footer | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    // console.error(error)
  }

  const navItems = footer?.navItems || []

  return <>
  <FooterComponent footer={footer}/>
  </>
}
