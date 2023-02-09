import React, { useEffect } from 'react'
import { Button, Offcanvas, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env';
import { calcTotal, selectCart, selectSum, clearCart, increaseAmount, decreaseAmount, selectShown, showCart, hideCart, removeFromCart } from '../slicers/cartSlice';

const Cart = () => {
    const cart = useAppSelector(selectCart);
    const shown = useAppSelector(selectShown);
    const sum = useAppSelector(selectSum)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(calcTotal())
    }, [cart, dispatch])

    return (
        <div>
            <Offcanvas show={shown} onHide={() => dispatch(hideCart())} placement="end">
                <Offcanvas.Header style={{backgroundColor:'lightgreen'}} closeButton>
                    <Offcanvas.Title>
                        Your Cart
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart.length > 0 ?
                     <div>{cart.map((item, ind) => (
                        <div key={ind} className='d-flex align-items-center '>
                            <img src={MYSERVER + item.product.image} style={{ height: '80px', width: '100px' }} alt='placeholder.png'></img>
                            <div className='me-auto'>
                                <span className='ms-2 my-2'>{item.product.desc}</span>
                                <div className='d-flex align-items-center justify-content-center'>
                                <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='success' onClick={() => dispatch(increaseAmount(item.product))}>+</Button>
                                <span className='mx-2'>{item.amount}</span>
                                <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='danger' onClick={() => dispatch(decreaseAmount(item.product))}>-</Button>
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-center'>
                                <span className='me-2'>Price: {item.amount * item.product.price}</span>                                
                                <Button variant='outline-danger' className='align-items-center justify-content-center' onClick={() => dispatch(removeFromCart(item.product.id))}>x</Button>
                            </div>
                        </div>
                    ))}
                    <div className='d-flex align-items-center justify-content-center'>
                        <h5 className='d-flex align-items-center justify-content-start me-auto'>Total: {sum}</h5>
                        <div className='d-flex align-items-center justify-content-end'><Link to="/checkout"><Button variant="primary" onClick={() => dispatch(hideCart())} >Checkout</Button></Link></div>       
                    </div></div>
                    :
                    <div>Your Cart is empty</div>}
                    
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Cart