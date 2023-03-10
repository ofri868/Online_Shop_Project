import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Review } from '../models/Review'
import { selectAuthDetails, selectProfile, selectToken } from '../slicers/authSlice'
import { addReviewAsync, disallowReview, loadSelectedProduct, selectAllowReview, selectReviewedOrder, selectSingleProduct } from '../slicers/shopSlice'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { MYSERVER } from '../env'

const ReviewScreen = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const selectedProduct = useAppSelector(selectSingleProduct)
    const authDetails = useAppSelector(selectAuthDetails)
    const profile = useAppSelector(selectProfile)
    const myToken = useAppSelector(selectToken)
    const reviewAllowed = useAppSelector(selectAllowReview)
    const reviewedOrder = useAppSelector(selectReviewedOrder)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [rating, setRating] = useState(-1)

    useEffect(() => {
        dispatch(loadSelectedProduct())
    }, [dispatch])

    useEffect(() => {
      console.log(reviewAllowed)
    }, [reviewAllowed])
    

    const handleReviewSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let newReview: Review = { rating: 0, title: '' }
        newReview.desc = desc
        newReview.title = title
        newReview.rating = rating
        newReview.product = selectedProduct.id
        newReview.user = profile.user
        newReview.username = authDetails.username
        dispatch(disallowReview())
        dispatch(addReviewAsync({ newReview, reviewedOrder, myToken }))
        navigate('/profile/view')
    }

    return (
        <div>
            {reviewAllowed ?
                <Card style={{ marginTop: '1rem', left: '0.5rem', width: '70%' }}>
                    <Card.Header>
                        <h4 className='d-flex justify-content-left'>Write Your Review</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleReviewSubmit}>
                            <Row className='my-3'>
                                <Form.Group>
                                    <div style={{ marginBottom: "1rem" }} className="d-flex align-items-center">
                                        <img className="d-flex flex-row bd-highlight" src={(MYSERVER + selectedProduct.image)} alt='placeholder.png' style={{ height: '100px', width: '140px', marginRight: '0.5rem' }} />
                                        <span>{selectedProduct.title}</span>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row className='my-3'>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label className="d-flex flex-row bd-highlight">Title</Form.Label>
                                    <Form.Control onChange={(e) => setTitle(e.target.value)} style={{ width: '50%' }} type="text" placeholder="Short summary of your review" />
                                </Form.Group>
                            </Row>
                            <Row className='my-3'>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label className="d-flex flex-row bd-highlight">Description</Form.Label>
                                    <Form.Control onChange={(e) => setDesc(e.target.value)} as='textarea' rows={5} style={{ width: '95%' }} placeholder="More detailed information about your experience, e.g: item came in good/bad condition, arrived on time/late" />
                                </Form.Group>
                            </Row>
                            <Row className='my-3'>
                                <Form.Group as={Col} controlId="formGridRating">
                                    <Form.Label className="d-flex flex-row bd-highlight">Rating</Form.Label>
                                    <Stack spacing={1}>
                                        <Rating
                                            style={{ width: '10%' }}
                                            value={rating}
                                            name="half-rating"
                                            defaultValue={2.5}
                                            precision={0.5}
                                            onChange={(e) => setRating(+((e.target as HTMLInputElement).value))}
                                        />
                                    </Stack>
                                </Form.Group>
                            </Row>
                            <Button variant="primary" type="submit" disabled={rating === -1 || title === ''}>
                                Submit Review
                            </Button>
                        </Form>
                    </Card.Body>
                </Card> :
                <div className='mt-2'>
                    <div>You cannot review this item right now</div>
                    <Button onClick={()=>navigate('/shop')}>Back to shop</Button>
                </div>
            }

        </div>
    )
}

export default ReviewScreen