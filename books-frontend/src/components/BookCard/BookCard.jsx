import React from 'react'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
// import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { ButtonGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { DELETE_BOOK } from '../../global/booksAPI'
import axios from 'axios'

export default function BookCard(props) {
    const navigator = useNavigate()

    const delBook = () => {
        axios.delete(process.env.REACT_APP_API_URL + DELETE_BOOK + "/" + props.id).then((response) => {
            navigator("/")
            window.location.reload();
        })
    }

    return (
        <>
            <Card key={props.id} bg="dark" text="light" style={{ width: '14rem', height: '25rem', margin: "0.5rem" }} >
                {/* <Link to={`book/` + props.id} style={{ textDecoration: "none", color: "white" }}> */}
                    <Card.Body className="text-center" >
                        <br />
                        <Card.Title>{props.title}</Card.Title>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Card.Text>
                            <Alert variant="secondary" text="dark">
                                {props.author}
                                <br />
                                {props.year}
                            </Alert>
                            {props.ISBN}
                        </Card.Text>
                    </Card.Body>
                {/* </Link> */}
                <Card.Footer>
                    <center>
                    <ButtonGroup size="sm">
                        <Button variant="secondary" onClick={()=>navigator("/book/"+props.id)}>Edit</Button>
                        <Button variant="light" onClick={()=>delBook()}>Delete</Button>
                    </ButtonGroup>
                    </center>
                </Card.Footer>
            </Card>
        </>
    )
}