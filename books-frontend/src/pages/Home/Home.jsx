import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Spinner from "react-bootstrap/Spinner"
import BookList from '../../components/BookList/BookList'
import axios from 'axios'
import { GET_BOOKS } from '../../global/booksAPI'


function Home(props) {

    const INIT_BOOKS = []
    const [books, setBooks] = useState(INIT_BOOKS)

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + GET_BOOKS).then((response) => {
            setBooks(response.data)
        })
    }, [])

    return (
        <>
            <Header />
            {books.length === 0 ?
                <Spinner animation="border" variant="secondary" /> :
                <BookList books={books} />
            } 


        </>
    )
}

export default Home