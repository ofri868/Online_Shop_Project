import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MYSERVER, PAYPAL_CLIENT_ID } from '../env';
import { CartItem } from '../models/CartItem';
import { selectLogged, selectProfile, selectToken } from '../slicers/authSlice';
import { calcTotal, selectCart, selectSum, clearCart, increaseAmount, decreaseAmount, checkoutAsync, removeFromCart } from '../slicers/cartSlice';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Order } from '../models/Order';
import { selectOrder, setOrderAddress } from '../slicers/shopSlice';


const CheckoutScreen = () => {
    const logged = useAppSelector(selectLogged)
    const myToken = useAppSelector(selectToken)
    const cart = useAppSelector(selectCart);
    const sum = useAppSelector(selectSum)
    const profile = useAppSelector(selectProfile)
    const order = useAppSelector(selectOrder)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [key, setKey] = useState('review')
    const [billing, setBilling] = useState(false)
    const [savedAddress, setSavedAddress] = useState(false)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [billingAddress, setBillingAddress] = useState('')
    const [billingCity, setBillingCity] = useState('')
    const [billingZipCode, setBillingZipCode] = useState('')
    const [approved, setApproved] = useState(false)

    const initialOptions = {
        "client-id": PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
    };

    const SwitchKey = (key: string | null) => {
        if (key) {
            setKey(key)
        }
    }

    useEffect(() => {
        dispatch(calcTotal())
    }, [cart, dispatch])

    useEffect(() => {
        if (savedAddress) {
            setAddress(profile.address)
            setCity(profile.city)
            setZipCode(profile.zip_code)
        }
        else {
            setAddress('')
            setCity('')
            setZipCode('')
        }
    }, [savedAddress])

    useEffect(() => {
        if (billing) {
            setBillingAddress(address)
            setBillingCity(city)
            setBillingZipCode(zipCode)
        }
        else {
            setBillingAddress('')
            setBillingCity('')
            setBillingZipCode('')
        }
    }, [billing])

    useEffect(() => {
        if (approved) {
            handleCheckout()
        }
    }, [approved])


    const handleShipping = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const tempOrder: Order = { address: '', city: '', zip_code: '', billing_address: '', billing_city: '', billing_zip_code: '' }
        tempOrder['address'] = address
        tempOrder['city'] = city
        tempOrder['zip_code'] = zipCode
        tempOrder['billing_address'] = billingAddress
        tempOrder['billing_city'] = billingCity
        tempOrder['billing_zip_code'] = billingZipCode
        dispatch(setOrderAddress(tempOrder))
    }

    const checkFormFill = () => {
        if (address && city && zipCode && billingAddress && billingCity && billingZipCode) {
            return true
        }
        else {
            return false
        }
    }

    const handleCheckout = () => {
        let orderDetails = []
        for (let i = 0; i < cart.length; i++) {
            orderDetails.push({ "product": cart[i].product.id, "amount": cart[i].amount })
        }
        dispatch(checkoutAsync({ orderDetails, order, myToken }))
        navigate('/')
    }
    return (
        <div>
            {logged ?
                <div>
                    <Card className='mt-2' style={{ width: '80%', margin: 'auto' }}>
                        <Tabs activeKey={key} onSelect={(k) => SwitchKey(k)} className="mb-3">
                            {/* Cart review tab */}
                            <Tab eventKey='review' title="Review Your Order" >
                                <Card.Body>{cart.length > 0 ?
                                    <div>
                                        {cart.map((item: CartItem, ind: number) =>
                                            <div key={ind} className='mb-2 d-flex align-items-center'>
                                                <img src={MYSERVER + item.product.image} style={{ height: '80px', width: '100px' }} alt='placeholder.png'></img>
                                                <div className='me-auto'>
                                                    <span className='ms-2 my-2'>{item.product.title}</span>
                                                    <div className='d-flex align-items-center justify-content-start ms-2'>
                                                        <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='success' onClick={() => dispatch(increaseAmount(item.product))}>+</Button>
                                                        <span className='mx-2'>{item.amount}</span>
                                                        <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='danger' onClick={() => dispatch(decreaseAmount(item.product))}>-</Button>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <span className='me-2'>Price: ${item.amount * item.product.price}</span>
                                                    <Button variant='outline-danger' className='align-items-center justify-content-center' onClick={() => dispatch(removeFromCart(item.product.id))}>x</Button>
                                                </div>
                                            </div>
                                        )
                                        }
                                        <div className='d-flex align-items-center justify-content-center mb-4'>
                                            <div className='d-flex align-items-center me-auto fs-6'>Shipping:</div>
                                            <div>$10</div>
                                        </div>
                                        <Card.Footer>
                                            Total: ${sum}
                                            <Button variant='outline-danger' className='mx-2' onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                                            <Button variant='primary' onClick={() => setKey('shipping')}>Confirm and Continue</Button>
                                        </Card.Footer>
                                    </div>
                                    :
                                    <div>
                                        <div className='mb-4'>You have no items in your cart</div>
                                        <Link to="/shop"><Button variant="primary" >Back to Shop</Button></Link>
                                    </div>}
                                </Card.Body>
                            </Tab>
                            {/* Billing and shipping addresses tab */}
                            <Tab eventKey='shipping' title="Billing & Shipping" disabled={key === 'review'}>
                                <Card.Body>
                                    <Form onSubmit={handleShipping}>
                                        {profile.address && profile.city && profile.zip_code &&
                                            <Row>
                                                <Form.Group className="mb-3" id="formGridCheckbox">
                                                    <Form.Check onChange={() => setSavedAddress(!savedAddress)} className="d-flex flex-row bd-highlight" type="checkbox" label="Use my saved address" value={+savedAddress} />
                                                </Form.Group>
                                            </Row>
                                        }

                                        {!savedAddress &&
                                            <Row className="mb-3">
                                                <Form.Group className="mb-3" controlId="formGridAddress">
                                                    <Form.Label className="d-flex flex-row bd-highlight">Address</Form.Label>
                                                    <Form.Control onChange={(e) => setAddress(e.target.value)} placeholder="1234 Main St" />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label className="d-flex flex-row bd-highlight">City</Form.Label>
                                                    <Form.Control type='text' onChange={(e) => setCity(e.target.value)} placeholder="City" />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridZip">
                                                    <Form.Label className="d-flex flex-row bd-highlight">Zip</Form.Label>
                                                    <Form.Control onChange={(e) => setZipCode(e.target.value)} />
                                                </Form.Group>
                                            </Row>
                                        }

                                        <Form.Group className="mb-3" id="formGridCheckbox">
                                            <Form.Check onChange={() => setBilling(!billing)} className="d-flex flex-row bd-highlight" type="checkbox" label="Billing address same as shipping address" value={+billing} />
                                        </Form.Group>
                                        {!billing &&
                                            <Row className="mb-3" >
                                                <Form.Group className="mb-3" controlId="formGridBilling Address">
                                                    <Form.Label className="d-flex flex-row bd-highlight">Billing Address</Form.Label>
                                                    <Form.Control onChange={(e) => setBillingAddress(e.target.value)} placeholder="1234 Main St" />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridBilling City">
                                                    <Form.Label className="d-flex flex-row bd-highlight">Billing City</Form.Label>
                                                    <Form.Control onChange={(e) => setBillingCity(e.target.value)} />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridBilling Zip">
                                                    <Form.Label className="d-flex flex-row bd-highlight">Billing Zip</Form.Label>
                                                    <Form.Control onChange={(e) => setBillingZipCode(e.target.value)} />
                                                </Form.Group>
                                            </Row>
                                        }

                                        <Button onClick={() => setKey('payment')} variant="primary" type="submit" disabled={!checkFormFill()}>
                                            Save changes
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Tab>
                            {/* Payment tab */}
                            <Tab eventKey='payment' title="Payment" disabled={(key === 'review') || (key === 'shipping')} >
                                <div className='d-flex justify-content-center px-3'>
                                    <div>
                                        <h4 style={{ textAlign: 'left' }}>Summary:</h4>
                                        <div>
                                            {cart.map((item: CartItem, ind: number) =>
                                                <div key={ind} className='mb-2 d-flex align-items-center'>
                                                    <img src={MYSERVER + item.product.image} style={{ height: '80px', width: '100px' }} alt='placeholder.png'></img>
                                                    <div className='me-auto'>
                                                        <span className='ms-2 my-2'>{item.product.title}</span>
                                                        <div className='d-flex align-items-center justify-content-start ms-2'>
                                                            <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='success' onClick={() => dispatch(increaseAmount(item.product))}>+</Button>
                                                            <span className='mx-2'>{item.amount}</span>
                                                            <Button className='d-flex align-items-center justify-content-center' style={{ width: '1.5rem', height: '1.5rem' }} variant='danger' onClick={() => dispatch(decreaseAmount(item.product))}>-</Button>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        <span className='ms-4 me-2'>Price: ${item.amount * item.product.price}</span>
                                                    </div>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                    <div className='ms-auto'>
                                        <div className='ms-2'>
                                            <div className='d-flex justify-content-start fw-bold'>Address:</div>
                                            <div className='d-flex justify-content-start mb-3'>{address}, {city}, {zipCode}</div>
                                            <div className='d-flex justify-content-start fw-bold'>Billing address:</div>
                                            <div className='d-flex justify-content-start mb-3'>{billingAddress}, {billingCity}, {billingZipCode}</div>
                                            <hr />
                                            <h5 className='d-flex justify-content-start mb-3'>Total: ${sum}</h5>
                                        </div>
                                        <div>
                                            <PayPalScriptProvider options={initialOptions} >
                                                <PayPalButtons
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [{
                                                                amount: {
                                                                    value: sum.toString()
                                                                }
                                                            }]
                                                        })
                                                    }}
                                                    onApprove={async (data, actions) => {
                                                        const details = await actions.order?.capture();
                                                        const name = details?.payer.name?.given_name
                                                        setApproved(true)
                                                    }}
                                                />
                                            </PayPalScriptProvider>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
                :
                <div>
                    You need to be logged in to checkout<br></br>
                    <Link to="/login"><Button variant="outline-success" >Log in</Button></Link>
                </div>
            }
        </div >
    )
}

export default CheckoutScreen