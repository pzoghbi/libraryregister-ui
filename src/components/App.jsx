import React from 'react'
import { Outlet, useNavigate } from 'react-router'

export default function App() {

    let navigate = useNavigate();

    const activateLink = (e, link) => {
        let _links = document.querySelectorAll(".Navigation > div")
        _links.forEach(_link => _link.classList.remove("active"))
        e.target.classList.add("active")
        navigate(link)
    }

    return (
        <div className="App">
            <div className="Navigation">
                <div onClick={(e) => activateLink(e, "users")}>Clanovi</div>
                <div onClick={(e) => activateLink(e, "books")}>Knjige</div>
                <div onClick={(e) => activateLink(e, "authors")}>Autori</div>
            </div>
            <Outlet />
        </div>
    )
}
