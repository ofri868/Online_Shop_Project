import React from 'react'
import { selectAuthDetails, selectProfile } from '../slicers/authSlice'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MYSERVER } from '../env';
import { useAppSelector } from '../app/hooks';

const ViewProfile = () => {
    const profile = useAppSelector(selectProfile)
    const authDetails = useAppSelector(selectAuthDetails)

    return (
        <div>
            {profile.created ?
                <MDBContainer className="py-2" style={{ backgroundColor: 'white' }}>
                    <MDBRow className="justify-content-left align-items-center">
                        <MDBCol lg="6" style={{ width: '800px' }}>
                            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                <MDBRow className="g-0">
                                    <MDBCol md="4" className="gradient-custom text-center text-black"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <MDBCardImage src={MYSERVER + profile.image}
                                            alt={MYSERVER + "/images/profile.png"} className="my-4" style={{ width: '80px' }} fluid />
                                        <MDBTypography tag="h5">{profile.first_name} {profile.last_name}</MDBTypography>
                                        <MDBIcon far icon="edit mb-5" />
                                        <Link to="/profile/edit"><Button >Edit Profile</Button></Link>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6">Account information</MDBTypography>
                                            <hr className="mt-0 mb-3" />
                                            <MDBRow>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Username</MDBTypography>
                                                    <MDBCardText className="text-muted">{authDetails.username}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Email</MDBTypography>
                                                    <MDBCardText className="text-muted">{authDetails.email}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBTypography className='mt-2' tag="h6">Shipping information</MDBTypography>
                                            <hr className="mt-0 mb-3" />
                                            <MDBRow>
                                                <MDBCol size="4" className="mb-3">
                                                    <MDBTypography tag="h6">Address</MDBTypography>
                                                    <MDBCardText className="text-muted">{profile.address}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="4" className="mb-3">
                                                    <MDBTypography tag="h6">City</MDBTypography>
                                                    <MDBCardText className="text-muted">{profile.city}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="4" className="mb-3">
                                                    <MDBTypography tag="h6">Zip</MDBTypography>
                                                    <MDBCardText className="text-muted">{profile.zip_code}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow className='mt-3'>
                                                <MDBCol size="4" className="mb-3">
                                                    <MDBTypography tag="h6">Billing address</MDBTypography>
                                                    <MDBCardText className="text-muted">{profile.billing_address}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="4" className="mb-3">
                                                    <MDBTypography tag="h6">Billing city</MDBTypography>
                                                    <MDBCardText className="text-muted">{profile.billing_city}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="4" className="mb-3">
                                                    <MDBTypography tag="h6">Billing zip</MDBTypography>
                                                    <MDBCardText className="text-muted">{profile.billing_zip_code}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                :
                <div><br></br>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>You didn't create a profile yet</Card.Title>
                            <br></br>
                            <Link to="/profile/edit"><Button variant="primary">Create your profile</Button></Link>
                        </Card.Body>
                    </Card>
                </div>}
        </div>
    )
}

export default ViewProfile