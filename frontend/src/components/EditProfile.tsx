import React, { useEffect, useState } from 'react'
import { changeProfile, selectProfile, selectToken, setMessage } from '../slicers/authSlice'
import { Button, Card, Col, Form, Row, Image } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { MYSERVER } from '../env';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const profile = useAppSelector(selectProfile)
    const myToken = useAppSelector(selectToken)
    const [billing, setBilling] = useState(false)
    const [image, setImage] = useState<File | any>(null);
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [address, setaddress] = useState('')
    const [city, setcity] = useState('')
    const [zipCode, setzipCode] = useState('')
    const [billingAddress, setbillingAddress] = useState('')
    const [billingCity, setbillingCity] = useState('')
    const [billingZipCode, setbillingZipCode] = useState('')

    useEffect(() => {
        if (profile.created) {
            setfirstName(profile.first_name)
            setlastName(profile.last_name)
            setaddress(profile.address)
            setcity(profile.city)
            setzipCode(profile.zip_code)
            setbillingAddress(profile.billing_address)
            setbillingCity(profile.billing_city)
            setbillingZipCode(profile.billing_zip_code)
        }
    }, [profile])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.files?.item(0) ?? null);
    }
    const handleProfileUpdate = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("created", '1')
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("zip_code", zipCode);
        if (billing) {
            formData.append("billing_address", address);
            formData.append("billing_city", city);
            formData.append("billing_zip_code", zipCode);
        }
        else {
            formData.append("billing_address", billingAddress);
            formData.append("billing_city", billingCity);
            formData.append("billing_zip_code", billingZipCode);
        }


        axios.put(MYSERVER + '/profile', formData, { headers: { Authorization: `Bearer ${myToken}`, "content-type": "multipart/form-data", }, })
            .then((res) => {
                dispatch(changeProfile(res.data['profile']))
                dispatch(setMessage(res.data['message']))
            })
            .then(() =>navigate('/profile/view'))
    }

    return (
        <div>
            <Card style={{ width: '500px' }}>
                <Card.Header ><h2>Your Profile</h2></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleProfileUpdate}>
                        <Row>
                            <Form.Group as={Col} controlId="formGridFirstname">
                                <Image className="d-flex flex-row bd-highlight" src={image ? (URL.createObjectURL(image)) : (MYSERVER + profile.image)} placeholder='placeholder.png' style={{ height: '100px', width: '100px' }}></Image>
                                <Form.Control onChange={handleImageChange} type="file" placeholder="Choose Photo" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFirst name">
                                <Form.Label className="d-flex flex-row bd-highlight">First name</Form.Label>
                                <Form.Control onChange={(e) => setfirstName(e.target.value)} type="text" placeholder="First name" defaultValue={profile.first_name} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLast name">
                                <Form.Label className="d-flex flex-row bd-highlight">Last name</Form.Label>
                                <Form.Control onChange={(e) => setlastName(e.target.value)} type="text" placeholder="Last name" defaultValue={profile.last_name} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="formGridAddress">
                                <Form.Label className="d-flex flex-row bd-highlight">Address</Form.Label>
                                <Form.Control onChange={(e) => setaddress(e.target.value)} placeholder="1234 Main St" defaultValue={profile.address} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label className="d-flex flex-row bd-highlight">City</Form.Label>
                                <Form.Control type='text' onChange={(e) => setcity(e.target.value)} placeholder="City" defaultValue={profile.city} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label className="d-flex flex-row bd-highlight">Zip</Form.Label>
                                <Form.Control onChange={(e) => setzipCode(e.target.value)} defaultValue={profile.zip_code} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check onChange={() => setBilling(!billing)} className="d-flex flex-row bd-highlight" type="checkbox" label="Billing address same as shipping address" />
                        </Form.Group>
                        {!billing && <Row className="mb-3" >
                            <Form.Group className="mb-3" controlId="formGridBilling Address">
                                <Form.Label className="d-flex flex-row bd-highlight">Billing Address</Form.Label>
                                <Form.Control onChange={(e) => setbillingAddress(e.target.value)} placeholder="1234 Main St" defaultValue={profile.billing_address} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridBilling City">
                                <Form.Label className="d-flex flex-row bd-highlight">Billing City</Form.Label>
                                <Form.Control onChange={(e) => setbillingCity(e.target.value)} defaultValue={profile.billing_city} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridBilling Zip">
                                <Form.Label className="d-flex flex-row bd-highlight">Billing Zip</Form.Label>
                                <Form.Control onChange={(e) => setbillingZipCode(e.target.value)} defaultValue={profile.billing_zip_code} />
                            </Form.Group>
                        </Row>}


                        <Button variant="primary" type="submit">
                            Save changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default EditProfile