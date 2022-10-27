import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AuthorBooks = () => {
    let [booksByAuthor, setBooksByAuthor] = useState();

    let booksApiRoute = "https://localhost:7009/api/books"

    useEffect(() => {
        axios.get(booksApiRoute)
    })

    return (
        <div className='AuthorBooks'>
            
        </div>
    );
}

export default AuthorBooks;
