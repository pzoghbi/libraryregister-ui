import React from 'react'
import { useNavigate } from 'react-router'

export default function BookCard(props) {
    let navigate = useNavigate();

    const toBookProfile = () => {
        navigate(`/library/books/${props.id}/read`, { state: props })
    }

    return (
        <div className="BookCard">
            <div>{props.title}</div>
            <div>{props.author.name}</div>
            <div>{props.genre}</div>
            <div>Dostupno: {props.isAvailable ? "Da" : "Ne"}</div>
            <div className="btn" onClick={toBookProfile}>Pregled</div>
        </div>
    )
}
