import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env';
import { CartItem } from '../models/CartItem';
import { selectLogged, selectToken } from '../slicers/authSlice';
import { calcTotal, selectCart, selectSum, clearCart, increaseAmount, decreaseAmount, loadCart, checkoutAsync } from '../slicers/cartSlice';

const CheckoutScreen = () => {
    const logged = useAppSelector(selectLogged)
    const myToken = useAppSelector(selectToken)
    const cart = useAppSelector(selectCart);
    const sum = useAppSelector(selectSum)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(calcTotal())
    }, [cart, dispatch])

    const handleCheckout = (cart: CartItem[]) => {
        let order = []
        for (let i = 0; i < cart.length; i++) {
            order.push({ "product": cart[i].product.id, "amount": cart[i].amount })
        }
        dispatch(checkoutAsync({ order, myToken }))
    }
    return (
        <div>
            <Card style={{width:'60%', margin: 'auto'}}>
                <Card.Header><h3>Your Cart:</h3></Card.Header>
                {logged ? <div>
                    {cart.map((item, ind) =>
                        <div key={ind} className='mb-2'>
                            <img src={MYSERVER + item.product.image} style={{ height: '80px', width: '100px' }} alt='placeholder.png'></img>
                            {item.product.desc}
                            <button className='btn btn-success' onClick={() => dispatch(increaseAmount(item.product))}>+</button>
                            {item.amount}
                            <button className='btn btn-danger' onClick={() => dispatch(decreaseAmount(item.product))}>-</button>
                            Price: {item.amount * item.product.price}<br />
                        </div>
                    )
                    }
                    <hr></hr>
                    Total: {sum}
                    <Button variant='outline-danger' className='mx-2' onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                    <Button variant='primary' onClick={() => handleCheckout(cart)}>Checkout</Button>
                </div>

                    :
                    <div>
                        You need to be logged in to checkout<br></br>
                        <Link to="/login"><Button variant="outline-success" >Log in</Button></Link>
                    </div>}
            </Card>

        </div >
    )
}

export default CheckoutScreen