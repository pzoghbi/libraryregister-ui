import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

export default function App() {
    let location = useLocation()
    let navigate = useNavigate()
    let path = location.pathname.split("/")[1]
    
    return (
        <div className="App">
            <div className="Navigation">
                <div onClick={() => navigate("users")}
                    className={path === "users" ? "active" : ""}
                    >Clanovi</div>
                <div onClick={() => navigate("books")}
                    className={path === "books" ? "active" : ""}
                    >Knjige</div>
                <div onClick={() => navigate("authors")}
                    className={path === "authors" ? "active" : ""}
                    >Autori</div>
            </div>

            <div className="Content">
                <Outlet />
            </div>
        </div>
    )
}
