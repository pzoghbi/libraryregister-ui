import axios from 'axios';
import React, { useRef, useState } from 'react';

const UserLeasingCard = (props) => {
    let userIdInputRef = useRef()
    let [leasing, setLeasing] = useState(props)

    let leasingsApiRoute = "https://localhost:7009/api/leasings"

    const returnBook = async (e) => {
        e.preventDefault()
        let _userId = userIdInputRef.current.value;
        let confirmedUserId = _userId && parseInt(_userId) === parseInt(leasing.userId)
        if (!confirmedUserId) return
        let response = await axios.get(`${leasingsApiRoute}/${leasing.id}/return`)
        setLeasing(response.data)
    }
    
    return (
        <div className="UserLeasingCard">
            <div className="mb-1">
                <h3>{leasing.book.title}</h3>
                <i>{leasing.book.author.name}</i>
                <div className="t-small">ID knjige: {leasing.book.id}</div>
            </div>

            {leasing.book.genre && (<div>Žanr: {leasing.book.genre}</div>)}

            { leasing.returnDate ? (
                <div>
                    Vraćeno: {new Date(leasing.returnDate).toDateString()}
                </div>
                ) : (
                <form className="ReturnBookForm" onSubmit={returnBook}>
                    <div>
                        <div>Posuđeno: {new Date(leasing.leaseDate).toDateString()}</div>
                    </div>

                    <input 
                        className="ml-auto"
                        type="text" 
                        name="userId" 
                        ref={userIdInputRef} 
                        placeholder="Potvrdi članski broj" 
                    />
                    <div className="btn" onClick={returnBook}>Vrati knjigu</div>
                </form>
                )
            }
        </div>
    );
}

export default UserLeasingCard;
