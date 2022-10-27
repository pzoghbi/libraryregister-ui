import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';

const BookProfile = () => {
    let location = useLocation()
    let [book, setBook] = useState(location.state)
    let params = useParams()
    let formRef = useRef()

    let booksApiRoute = "https://localhost:7009/api/books"

    const getBook = async () => {
        let { data } = await axios.get(`${booksApiRoute}/${params.id}`)
        return data
    }

    const returnBook = async (e) => {
        e.preventDefault()
        let formData = new FormData(formRef.current)
        let _bookId = formData.get("bookId")
        let confirmedBookId = _bookId && parseInt(_bookId) === parseInt(book.id)
        if (!confirmedBookId) return
        let response = await axios.get(`${booksApiRoute}/${book.id}/return`)
        setBook(response.data)   
    }

    useEffect(() => {
        if (!book) {
            getBook().then(_book => setBook(_book))
        }
    }, []);

    return book && (
        <div className="BookProfile">
            <h2>{book.title}</h2>
            <div>Autor: {book.author.name}</div>
            <div>Id knjige: {book.id}</div>
            <div>Dostupno: { (book.isAvailable) ? "Da" : "Ne" }</div>

            { 
                !book.isAvailable &&
                (
                    <form ref={formRef} onSubmit={returnBook}>
                        <label htmlFor="bookId">Vrati knjigu: </label>
                        <input type="text" name="bookId" placeholder='Potvrdi broj knjige' />
                        <div className="btn" onClick={returnBook}>Vrati</div>
                    </form>
                )
            }

            {/* <div>Uredi</div>
            <div>Arhiviraj</div> */}
        </div>
    );
}

export default BookProfile;
