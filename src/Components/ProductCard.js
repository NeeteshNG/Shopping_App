import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart, addToWishlist } from '../Redux/listSlice';

function ProductCard({ product }) {
    const { name, price, description, image } = product;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }

    const handleAddToWishlist = () => {
        dispatch(addToWishlist(product));
    }

    return (
        <div className='product-card'>
            <img src={image} alt={name}/>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Price : {price}</p>
            <button onClick={handleAddToCart}><i class="fa fa-shopping-cart"></i></button>
            <button onClick={handleAddToWishlist}><i class="fa fa-heart-o"></i></button>
        </div>
    )
}

export default ProductCard;
