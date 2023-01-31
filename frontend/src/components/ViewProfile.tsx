import React from 'react'
import { useSelector } from 'react-redux'
import { selectProfile } from '../slicers/authSlice'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewProfile = () => {
    const profile = useSelector(selectProfile)

    return (
        <div>
            {profile.created ? <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="6" className="mb-4 mb-lg-0">
                            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                <MDBRow className="g-0">
                                    <MDBCol md="4" className="gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                        <MDBTypography tag="h5">{profile.firstName} {profile.lastName}</MDBTypography>
                                        <MDBCardText>Web Designer</MDBCardText>
                                        <MDBIcon far icon="edit mb-5" />
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6">Information</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Email</MDBTypography>
                                                    <MDBCardText className="text-muted">info@example.com</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Phone</MDBTypography>
                                                    <MDBCardText className="text-muted">123 456 789</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBTypography tag="h6">Information</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Email</MDBTypography>
                                                    <MDBCardText className="text-muted">info@example.com</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Phone</MDBTypography>
                                                    <MDBCardText className="text-muted">123 456 789</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <div className="d-flex justify-content-start">
                                                <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                                <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                                <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section> :
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