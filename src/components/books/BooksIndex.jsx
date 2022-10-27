import React from 'react'
import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import BookCard from './BookCard';
import { useNavigate } from 'react-router';

export default function BooksIndex() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const searchRef = useRef();

    useEffect(() => {
        getBooks();
    }, [])

    let booksApiRoute = "https://localhost:7009/api/books"

    const getBooks = (qBookSearch) => {
        axios.get(booksApiRoute, { params: { bookSearchQuery: qBookSearch || null } })
            .then(response => {
                setBooks(response.data);
                console.log(response.data)
            })
            .catch(e => console.log(e));
    }

    const toBookCreate = () => {
        navigate("create")
    }

    const searchBooks = () => {
        let _query = searchRef.current.value
        if (!_query) return
        getBooks(_query)
    }

    return books && (
        <div className="BooksIndex">
            <h3>Books</h3>
            <div onClick={toBookCreate} className='btn'>Dodaj knjigu</div>
            <input type="text" placeholder="Traži knjige po autoru, naslovu..." name="qBookSearch" ref={searchRef} />
            <div className="btn" onClick={searchBooks}>Traži</div>
            <div className="Books">
                {books.map((b, id) => <BookCard key={id} {...b} />)}
            </div>
        </div>
    )
}
