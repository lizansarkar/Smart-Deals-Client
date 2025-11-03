import React from 'react'
import LatestProducts from './LatestProducts'

const latestProductsPromise = fetch('http://localhost:3000/latests-products').then(res => res.json())

export default function Home() {
  return (
    <div>
        <h4 className='bg-secondary'>this is home</h4>
        <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
    </div>
  )
}
