import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <div className='mt-3' style={{ width: '100%' }}>
            <Row className='d-flex justify-content-center py-3' style={{ backgroundColor: '#222831', color: 'white' }}>
                <Col style={{ maxWidth: '300px' }}>
                    <div className='d-flex align-items-center justify-content-start my-1 fs-4'>About</div>
                    <div className='footer-divider mt-2 mb-3'></div>
                    <div className='footer-text'>Ofri's Model Cars offers the best quality models at great prices, without compromising on customer service.</div>
                </Col>
                <Col style={{ maxWidth: '300px' }}>
                    <div className='d-flex align-items-center justify-content-start my-1 fs-4'>Contact us</div>
                    <div className='footer-divider mt-2 mb-3'></div>
                    <ul className='footer-text' style={{paddingLeft:'16px'}}>
                        <li>Phone: 054-6827715</li>
                        <li>Email: ofri0101@gmail.com</li>
                    </ul>
                </Col>
                <Col style={{ maxWidth: '300px' }}>
                    <div className='d-flex align-items-center justify-content-start my-1 fs-4'>Sign up to our newsletter</div>
                    <div className='footer-divider mt-2 mb-3'></div>
                </Col>
            </Row>
        </div>
    )
}

export default Footer