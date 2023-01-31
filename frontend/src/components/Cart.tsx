import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env';
import { calcTotal, selectCart, selectSum, clearCart, increaseAmount, decreaseAmount, loadCart } from '../slicers/cartSlice';

const Cart = () => {
    const cart = useAppSelector(selectCart);
    const sum = useAppSelector(selectSum)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(calcTotal())
    }, [cart, dispatch])
    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])

    return (
        <div>
            Your Cart:
            {cart.map((item, ind) =>
                <div key={ind}>
                    <img src={MYSERVER + item.product.image} style={{ height: '50px', width: '50px' }} alt='placeholder.png'></img>
                    {item.product.desc}
                    <button className='btn btn-success' onClick={() => dispatch(increaseAmount(item.product))}>+</button>
                    {item.amount}
                    <button className='btn btn-danger' onClick={() => dispatch(decreaseAmount(item.product))}>-</button>
                    Price: {item.amount * item.product.price}<br />
                </div>
            )}
            Total: {sum}
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
    )
}

export default Cart