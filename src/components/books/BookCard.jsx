import React from 'react'
import { useNavigate } from 'react-router'

export default function BookCard(props) {
    let navigate = useNavigate();

    const toBookProfile = () => {
        navigate(`/books/${props.id}/read`, { state: props })
    }

    return (
        <div className="BookCard">
            <div className="mb-1">
                <h3>{props.title}</h3>
                <i>{props.author.name}</i>
                <div className="t-small">
                    {props.genre && (<div>{props.genre}</div>)}
                </div>
            </div>

            <div className="d-flex align-center">
                <div>Dostupno: <b>{props.isAvailable ? "Da" : "Ne"}</b></div>
                <div className="btn ml-auto" onClick={toBookProfile}>Pregled</div>
            </div>
        </div>
    )
}
