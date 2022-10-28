import React from "react"
import { useState, useRef } from "react"
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

export default function BooksCreate() {
    const [authors, setAuthors] = useState([])
    let formRef = useRef()
    let inputRef = useRef()
    let location = useLocation()
    let navigate = useNavigate()
    let selectedAuthor = location.state?.author

    let authorsApiRoute = "https://localhost:7009/api/authors"
    let booksApiRoute = "https://localhost:7009/api/books"
    let booksViewRoute = "/books"

    const getAuthors = () => {
        let _search = inputRef.current.value
        if (!_search) { 
            setAuthors([])
            return 
        }
        axios.get(`${authorsApiRoute}/search`, { params: { name : _search } })
            .then(response => {
                setAuthors(response.data)
            })
            .catch(e => console.log(e))
    }

    const postBook = (e) => {
        e.preventDefault()
        let formData = new FormData(formRef.current)

        let authorName = formData.get("authorName")
        let selectedOption = formRef.current.querySelector(`option[value="${authorName}"]`)

        // Todo Alert autor ne postoji
        if (!selectedOption) return

        let authorId = parseInt(selectedOption.innerHTML)
        if (!authorId) return

        formData.set("authorId", authorId)
        // for (const key of formData.keys()) {
        //     console.log(key, formData.get(key))
        // }

        axios.post(booksApiRoute, formData)
            .then(response => {
                let book = response.data;
                navigate(`${booksViewRoute}/${book.id}/read`)
            })
            .catch(e => console.log(e))
    }

    return (
        <form className="BooksCreate" ref={formRef} onSubmit={postBook}>
            <h3>Unos knjige u sustav</h3>
            <input type="text" placeholder="Title" name="title" />
            <input type="text" placeholder="Genre" name="genre" />

            <input 
                ref={inputRef} 
                name="authorName" 
                list="authorsList"  
                defaultValue={selectedAuthor?.name ?? ""} 
                onChange={getAuthors} 
            />

            <datalist id="authorsList" onChange={(e) => { console.log(e.target.value) }}>
                { authors?.map((author, i) => 
                    { return (
                        <option value={author.name} key={i}>{author.id}</option>) 
                    }
                ) }
            </datalist>

            <div onClick={postBook} className="btn-submit">Spremi knjigu</div>
        </form>
    )
}
