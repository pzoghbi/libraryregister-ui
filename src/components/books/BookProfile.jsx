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
            <div>
                <h1>{book.title}</h1>
                <i>{book.author.name}</i>
            </div>
            
            {book.genre && (<div className="t-small">{book.genre}</div>)}

            <div className="mt-1">
                <div>ID: <b>{book.id}</b></div>
                
                <div className="d-flex align-center">
                    <div>Dostupno: { (book.isAvailable) ? "Da" : "Ne" }</div>

                    { !book.isAvailable && (
                        <form className="ReturnBookForm ml-auto" ref={formRef} onSubmit={returnBook}>
                            <label className="mr-1" htmlFor="bookId">Vrati knjigu:</label>
                            <input type="text" name="bookId" placeholder='Potvrdi broj knjige' />
                            <div className="btn" onClick={returnBook}>Vrati</div>
                        </form>
                    ) }
                </div>
            </div>

            {/* <div>Uredi</div>
            <div>Arhiviraj</div> */}
        </div>
    );
}

export default BookProfile;
