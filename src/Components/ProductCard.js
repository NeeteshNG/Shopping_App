import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart, addToWishlist } from '../Redux/listSlice';
import ProductDetails from './ProductDetails';

function ProductCard({ product }) {
    const { name, price, description, image } = product;
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }

    const handleAddToWishlist = () => {
        dispatch(addToWishlist(product));
    }

    const handleToggle = () => {
        setShowModal(!showModal);
    }

    return (
        <div className='product-card'>
            <img src={image} alt={name}/>
            <h2>{name}</h2>
            <p>{description.slice(0,40)}...</p>
            <p>Price : {price} /-</p>
            <button onClick={handleAddToCart}><i class="fa fa-cart-plus"></i></button>
            <button onClick={handleAddToWishlist}><i class="fa fa-heart-o"></i></button>
            <button onClick={handleToggle}><i class="fa fa-info-circle"></i></button>
            {showModal && <ProductDetails product={product} onClose={handleToggle}/>}
        </div>
    )
}

export default ProductCard;
