import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Spinner from "react-bootstrap/Spinner"
import axios from 'axios'
import { GET_BOOK, UPDATE_BOOK, CREATE_BOOK } from '../../global/booksAPI'
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom";

function Book(props) {

    const validateBookObj = (book) => {
        // check if all the values are present in the object
        if (!book || !book.name || !book.author || !book.year_pub || !book.ISBN) {
            return false;
        }
        // validate name
        if (!isNaN(book.name) || book.name.length === 0) {
            return false
        }
        // validate author
        if (!isNaN(book.author) || book.author.length === 0) {
            return false
        }
        // validate ISBN
        if (isNaN(book.ISBN) || book.ISBN.toString().length !== 10) {
            return false
        }
        // validate year
        if (isNaN(book.year_pub) || book.year_pub.toString().length !== 4 || book.year_pub >= 2022) {
            return false
        }
        return true;
    }

    const { id } = useParams()

    const INIT_BOOK = []
    const [book, setBook] = useState(INIT_BOOK)
    const [error, setError] = useState(false)

    const navigator = useNavigate();

    React.useEffect(() => {
        if (page_path !== ADD_PATH) {
            axios.get(process.env.REACT_APP_API_URL + GET_BOOK + "/" + id).then((response) => {
                setBook(response.data)
            })
        }
    }, [id])

    const updateBook = () => {
        if (validateBookObj(book)) {
            setError(false)
            axios.put(process.env.REACT_APP_API_URL + UPDATE_BOOK + "/" + id, { data: book }).then((response) => {
                setBook(response.data)
                navigator("/")
            })
        }
        else {
            setError(true)
        }
    }

    const addBook = () => {
        if (validateBookObj(book)) {
            console.log(book)
            setError(false)
            axios.post(process.env.REACT_APP_API_URL + CREATE_BOOK, { data: book }).then((response) => {
                setBook(response.data)
                navigator("/")
            })
        }
        else {
            setError(true)
        }
    }

    const page_path = useLocation().pathname;

    const ADD_PATH = "/add";

    return (
        <>
            <Header />
            {isNaN(book.id) && page_path !== ADD_PATH ?
                <Container>
                    <center>
                        <Spinner style={{ margin: "50%" }} animation="border" variant="secondary" />
                    </center>
                </Container> :
                <Container>
                    {error ?
                        <>
                            <Alert variant="warning">Invalid Form data</Alert>
                        </> :
                        <></>}
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="Title" placeholder="The Best Title..." value={book.name} onChange={event => { setBook({ ...book, name: event.target.value }) }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicAuthor">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" placeholder="Who wrote the book?" value={book.author} onChange={event => { setBook({ ...book, author: event.target.value }) }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicYear">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control type="Number" placeholder="When was it written?" value={book.year_pub} onChange={event => { setBook({ ...book, year_pub: parseInt(event.target.value) }) }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicISBN">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control type="number" placeholder="Book ISBN (10 digits)" value={book.ISBN} onChange={event => { setBook({ ...book, ISBN: parseInt(event.target.value) }) }} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {page_path === ADD_PATH ?
                                <Button onClick={() => addBook()}>Save</Button> :
                                <Button onClick={() => updateBook()}>Update</Button>}
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <Link to="/">Cancel</Link>
                        </Col>
                    </Row>
                </Container >
            }
        </>
    )
}

export default Book