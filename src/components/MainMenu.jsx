import React from 'react'
import { useNavigate } from 'react-router'

export default function MainMenu() {
    
    let navigate = useNavigate();

    const toUsers =     () => { navigate("users") }
    const toBooks =     () => { navigate("books") }
    const toAuthors =     () => { navigate("authors") }
    const toLeasings =  () => { navigate("leasings") }

    return (
        <div className="MainMenu">
            <div onClick={toUsers}>Clanovi</div>
            <div onClick={toBooks}>Knjige</div>
            <div onClick={toAuthors}>Autori</div>
            <div onClick={toLeasings}>Zaduzenja</div>
        </div>
    )
}
