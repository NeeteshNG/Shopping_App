import React from 'react'
import ProductCard from './ProductCard';

function Products({products}) {
    return (
      <div className='body-cards'>
        <div className='grid-container'>
            {products.map((product) => {
                return <ProductCard  className='grid-item' key={product.id} product={product}/>
            })}
        </div>
      </div>
    );
}

export default Products
