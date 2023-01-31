import React, { useEffect, useState } from 'react'
import { selectProfile, selectToken } from '../slicers/authSlice'
import { Button, Card, Col, Form, Row, Image } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import { MYSERVER } from '../env';
import axios from 'axios';

const EditProfile = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(selectProfile)
    const myToken = useSelector(selectToken)
    const [billing, setBilling] = useState(false)
    const [image, setImage] = useState<File | any>(null);
    const [firstName, setfirstName] = useState(profile.firstName)
    const [lastName, setlastName] = useState(profile.lastName)
    const [address, setaddress] = useState(profile.address)
    const [city, setcity] = useState(profile.city)
    const [zipCode, setzipCode] = useState(profile.zipCode)
    const [billingAddress, setbillingAddress] = useState(profile.billingAddress)
    const [billingCity, setbillingCity] = useState(profile.billingCity)
    const [billingZipCode, setbillingZipCode] = useState(profile.billingZipCode)

    useEffect(() => {
        console.log(profile)
    }, [profile])


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.files?.item(0) ?? null);
    }
    const handleProfileUpdate = (event: { preventDefault: () => void; }) => {
        if(billing){
            setbillingAddress(address)
            setbillingCity(city)
            setbillingZipCode(zipCode)
        }

        event.preventDefault();

        const formData = new FormData();
        if(image){
            formData.append("image", image);
        }
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("zipCode", zipCode);
        formData.append("billingAddress", billingAddress);
        formData.append("billingCity", billingCity);
        formData.append("billingZipCode", billingZipCode);

        axios.put(MYSERVER+'profile', formData, {headers: {Authorization: `Bearer ${myToken}`,"content-type": "multipart/form-data",},})
        .then((res) => {console.log(res.data);})
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
                            <Form.Group as={Col} controlId="formGridFirstname">
                                <Form.Label className="d-flex flex-row bd-highlight">First name</Form.Label>
                                <Form.Control onChange={(e) => setfirstName(e.target.value)} type="text" placeholder="First name" defaultValue={profile.firstName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastname">
                                <Form.Label className="d-flex flex-row bd-highlight">Last name</Form.Label>
                                <Form.Control onChange={(e) => setlastName(e.target.value)} type="text" placeholder="Last name" defaultValue={profile.lastName} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="formGridAddress">
                                <Form.Label className="d-flex flex-row bd-highlight">Address</Form.Label>
                                <Form.Control onChange={(e) => setaddress(e.target.value)} placeholder="1234 Main St" defaultValue={profile.address} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label className="d-flex flex-row bd-highlight">City</Form.Label>
                                <Form.Select onChange={(e) => setcity(e.target.value)} defaultValue={profile.city}>
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label className="d-flex flex-row bd-highlight">Zip</Form.Label>
                                <Form.Control onChange={(e) => setzipCode(e.target.value)} defaultValue={profile.zipCode} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check onChange={() => setBilling(!billing)} className="d-flex flex-row bd-highlight" type="checkbox" label="Billing address same as shipping address" />
                        </Form.Group>
                        {!billing && <Row className="mb-3" >
                            <Form.Group className="mb-3" controlId="formGridBillingAddress">
                                <Form.Label className="d-flex flex-row bd-highlight">Billing Address</Form.Label>
                                <Form.Control onChange={(e) => setbillingAddress(e.target.value)} placeholder="1234 Main St" defaultValue={profile.billingAddress} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label className="d-flex flex-row bd-highlight">Billing City</Form.Label>
                                <Form.Select onChange={(e) => setbillingCity(e.target.value)} defaultValue={profile.billingCity} >
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label className="d-flex flex-row bd-highlight">Billing Zip</Form.Label>
                                <Form.Control onChange={(e) => setbillingZipCode(e.target.value)} defaultValue={profile.billingZipCode} />
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