import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../Redux/listSlice';

function Cart() {
    const cart = useSelector((state) => state.list)
    const dispatch = useDispatch();

    const removeItem = (product) => {
        dispatch(removeFromCart(product));
    }

    const totalAmount = cart.reduce((total, product) => total + product.price, 0 )
    return (
        <div className='cart-container'>
            <h1>CART : </h1>
            {cart.map((product) => {
                <div key={product.id}>
                    <p>{product.name} - {product.price}/-</p>
                    <button onClick={removeItem}><i class="fa fa-trash-o"></i></button>
                </div>
            })}
            <h2>Total : {totalAmount}/-</h2>
        </div>
    )
}

export default Cart
