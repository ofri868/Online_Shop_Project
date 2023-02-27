import React, { useEffect } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER } from '../env';
import { CartItem } from '../models/CartItem';
import { calcTotal, selectCart, selectSum, increaseAmount, decreaseAmount, selectShown, hideCart, removeFromCart } from '../slicers/cartSlice';

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
                <Offcanvas.Header style={{ backgroundColor: 'lightgreen' }} closeButton>
                    <Offcanvas.Title>
                        Your Cart
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart.length > 0 ?
                        <div>
                            <div>
                                {cart.map((item: CartItem, ind: number) => (
                                    <div>
                                        <div key={ind} className='d-flex align-items-center mb-2'>
                                            <img src={MYSERVER + item.product.image} style={{ height: '80px', width: '100px' }} alt='placeholder.png'></img>
                                            <div className='ms-2 me-auto'>
                                                <div>{item.product.title}</div>
                                                <div className='d-flex align-items-center justify-content-start'>
                                                    <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='success' onClick={() => dispatch(increaseAmount(item.product))}>+</Button>
                                                    <span className='mx-2'>{item.amount}</span>
                                                    <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='danger' onClick={() => dispatch(decreaseAmount(item.product))}>-</Button>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <div className='me-2'>${item.amount * item.product.price}</div>
                                                <Button variant='outline-danger' style={{ paddingTop: '1px' }} className='align-items-center justify-content-center' onClick={() => dispatch(removeFromCart(item.product.id))}>x</Button>
                                            </div>
                                        </div>
                                        {ind !== cart.length - 1 && <hr />}
                                    </div>
                                ))}
                            </div>
                            <div className='d-flex align-items-center justify-content-center mb-4'>
                                <div className='d-flex align-items-center me-auto fs-6'>Shipping:</div>
                                <div>$10</div>
                            </div>
                            <div className='d-flex align-items-center justify-content-center'>
                                <div className='d-flex align-items-center me-auto fs-5 fw-bold'>Total: ${sum}</div>
                                <div><Link to="/checkout"><Button variant="primary" onClick={() => dispatch(hideCart())} >Checkout</Button></Link></div>
                            </div>
                        </div>
                        :
                        <div>Your Cart is empty</div>}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Cart