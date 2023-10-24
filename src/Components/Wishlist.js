import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {removeFromWishlist } from '../Redux/listSlice';

function Wishlist() {
    const wishlist = useSelector((state) => state.list.wishlist)
    const dispatch = useDispatch();

    const removeItem = (product) => {
        dispatch(removeFromWishlist(product));
    }

    const totalAmount = wishlist.reduce((total, product) => total + product.price, 0 )
    return (
        <div className='body-wish'>
            <div className='wish-container'>
                <h1 className='wish-title'>Wishlist : </h1>
                <div className='wish-contents'>
                    {wishlist.map((product) => (
                        <div key={product.id} className='wish-item'>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <button onClick={removeItem}><i className="fa fa-trash-o"></i></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist;
