import React from 'react'
import axios from 'axios';
import Store from "../Store";
import { useNavigate } from 'react-router-dom';

export default function App() {    
        
    let navigate = useNavigate();

    const toUsers =     () => { navigate("library/users") }
    const toBooks =     () => { navigate("library/books") }
    const toAuthors =   () => { navigate("library/authors") }
    const toLeasings =  () => { navigate("library/leasings") }

    return (
        <div>
            <div onClick={toUsers}>Korisnici</div>
            <div onClick={toAuthors}>Autori</div>
            <div onClick={toBooks}>Knjige</div>
        </div>
    )
}
