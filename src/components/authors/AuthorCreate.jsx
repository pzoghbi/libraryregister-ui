import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';


const AuthorCreate = () => {
    const navigate = useNavigate()
    let formRef = useRef(null)
    let authorsApiRoute = "https://localhost:7009/api/authors"
    let booksCreate = "/books/create"

    const postAuthor = (e) => {
        e.preventDefault()

        axios.post(`${authorsApiRoute}`, new FormData(formRef.current))
            .then(response => {
                // goto add book
                navigate(booksCreate, { state : { author: response.data } })
            })
            .catch(e => console.log(e))
    }
    
    const setLettersOnly = (e) => {
        let input = e.target.value
        let serializedInput = input.replace(/[\d]/gi, "")
        e.target.value = serializedInput
    }

    return (
        <form 
            className="AuthorCreate" 
            onSubmit={postAuthor}
            ref={formRef} 
        >
            <h2>Novi autor</h2>
            <input 
                type="text" 
                placeholder="Ime autora" 
                name="name" 
                onChange={setLettersOnly}
                required
            />

            <div className="btn" onClick={postAuthor}>Dodaj autora</div>
        </form>
    );
}

export default AuthorCreate;
