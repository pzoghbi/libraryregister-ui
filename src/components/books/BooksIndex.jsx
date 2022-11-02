import React from "react"
import { useState, useEffect, useRef } from "react"
import axios from "axios";
import BookCard from "./BookCard";
import { useNavigate } from "react-router";

export default function BooksIndex() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const searchRef = useRef();

    let booksApiRoute = "https://localhost:7009/api/books"

    const getBooks = (bookQuery) => {
        axios.get(booksApiRoute, { params: { bookSearchQuery: bookQuery || null } })
            .then(response => {
                setBooks(response.data)
                // console.log(response.data)
            })
            .catch(e => console.log(e));
    }

    const toBookCreate = () => {
        navigate("create")
    }

    const searchBooks = (e) => {
        e.preventDefault()
        let _query = searchRef.current.value
        if (!_query) return
        getBooks(_query)
    }

    return books && (
        <div className="BooksIndex">

            <form className="BooksSearch" onSubmit={searchBooks}>
                <label htmlFor="bookQuery">Pretraga: </label>
                <input 
                    type="text" 
                    name="bookQuery" 
                    placeholder="Traži knjige po autoru, naslovu..." 
                    ref={searchRef} 
                />
                <div className="btn" onClick={searchBooks}>Traži</div>
                <div onClick={toBookCreate} className="btn">Dodaj knjigu</div>
            </form>
            
            <div className="SearchResults">
                {books.map((b, id) => <BookCard key={id} {...b} />)}
            </div>
        </div>
    )
}
