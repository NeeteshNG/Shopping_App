import React from 'react'
import ProductCard from './ProductCard';

const products = [
    {
      id: 1,
      name: 'Product A',
      price: 19.99,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 2,
      name: 'Product B',
      price: 29.99,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 3,
      name: 'Product C',
      price: 15.49,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 4,
      name: 'Product D',
      price: 34.99,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 5,
      name: 'Product E',
      price: 49.99,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 6,
      name: 'Product F',
      price: 22.99,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 7,
      name: 'Product G',
      price: 18.75,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 8,
      name: 'Product H',
      price: 27.99,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 9,
      name: 'Product I',
      price: 39.99,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
    {
      id: 10,
      name: 'Product J',
      price: 45.00,
      description: 'Description of the Product',
      image: 'https://picsum.photos/200',
    },
  ];

function Products() {
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
