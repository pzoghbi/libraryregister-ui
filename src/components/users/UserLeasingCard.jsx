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
        <div className="UserLeasingCard BookCard">
            <h4>Naslov: {leasing.book.title}</h4>
            <h5>ID knjige: {leasing.book.id}</h5>
            <div>Autor: {leasing.book.author.name}</div>
            <div>Žanr: {leasing.book.genre}</div>
            <div>Posuđeno: {new Date(leasing.leaseDate).toDateString()}</div>
            <div>Vraćeno: 
                {
                    leasing.returnDate ? 
                    new Date(leasing.returnDate).toDateString() : 
                    (<form onSubmit={returnBook}>
                        <div>Knjiga nije vraćena</div>
                        <input type="text" placeholder="Potvrdi članski broj" name="userId" ref={userIdInputRef} />
                        <div className="btn" onClick={returnBook}>Vrati knjigu</div>
                    </form>)
                }
            </div>
        </div>
    );
}

export default UserLeasingCard;
