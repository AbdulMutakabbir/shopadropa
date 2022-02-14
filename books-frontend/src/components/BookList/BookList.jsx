import React from 'react'
import Row from "react-bootstrap/Row"
import BookCard from '../BookCard/BookCard'

export default function BookList(props) {

    return (
        <>
            <Row xs={1} md={2} className="justify-content-center">
                {props.books.map(book => (
                    <>
                        <BookCard id={book.id} title={book.name} author={book.author} year={book.year_pub} ISBN={book.ISBN} />
                    </>
                ))}
            </Row>
        </>
    )
}