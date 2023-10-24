import React from 'react'

function ProductCard({ product }) {
    const { name, price, description, image } = product;

    return (
        <div className='product-card'>
            <img src={image} alt={name}/>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Price : {price}</p>
            <button>Add to Card</button>
            <button>Add to Wishlist</button>
        </div>
    )
}

export default ProductCard;
