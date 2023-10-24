import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../Redux/listSlice';

function Cart() {
    const cart = useSelector((state) => state.list.cart)
    const dispatch = useDispatch();

    const removeItem = (product) => {
        dispatch(removeFromCart(product));
    }

    return (
        <div className='body-cart'>
            <div className='cart-container'>
                <h1 className='cart-title'>CART : </h1>
                <div className='cart-contents'>
                    {cart.map((product) => (
                        <div key={product.id} className='cart-item'>
                            <p>{product.name} - {product.price}/-</p>
                            <button onClick={removeItem}><i className="fa fa-trash-o"></i></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Cart
