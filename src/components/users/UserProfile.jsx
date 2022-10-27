import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import UserLeasingCard from './UserLeasingCard';

const UserProfile = () => {
    let [user, setUser] = useState({});
    let [membership, setMembership] = useState({});
    let params = useParams();
    let inputRef = useRef()

    let usersApiRoute = "https://localhost:7009/api/users"
    let membershipsApiRoute = "https://localhost:7009/api/memberships"
    let leasingsApiRoute = "https://localhost:7009/api/leasings"

    const getUser = async () => {
        // Get user
        await axios.get(`${usersApiRoute}/${params.id}`)
            .then(response => {
                let _user = response.data
                setUser(_user)
                getMembership(_user.id)
            })
            .catch(e => console.log(e))
    }

    const getMembership = async (userId) => {
        // Get membership
        await axios.get(`${membershipsApiRoute}/${userId}`)
            .then(response => {
                setMembership(response.data)
            })
    }

    const leaseBook = async (e) => {
        e.preventDefault()
        let inputBookId = inputRef.current.value
        let response = await axios.post(`${leasingsApiRoute}`, { bookId : inputBookId, userId : user.id })
        console.log("response", response)

        // Todo Tidy up w/ BE
        if (response.status === 201) {
            setUser({...user, leasings: [...user.leasings, response.data]})
            inputRef.current.value = ""
        } else if (response.data === 10004) {
            alert("Korisnik je vec posudio maksimalan broj knjiga")
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const createMembership = () => {
        axios.post(`${membershipsApiRoute}`, { userid: params.id })
            .then(response => {
                setMembership(response.data)
            })
    }

    return (
        <div className='UserProfile'>
            <h2>Clanski profil</h2>
            <div>Ime: {user.name}</div>
            <div>Clanski broj: {user.id}</div>
            <div>Email adresa: {user.email}</div>
            <div>Clanstvo do: {
                membership ?
                    (<span>{new Date(membership.validUntil).toDateString()}</span>) :
                    (<span> Nema clanarinu <span onClick={createMembership}>[Izradi clanarinu]</span></span>)
            }
            </div>
            <div className='UserLeasings'>
                <form className="LeaseBook" onSubmit={leaseBook}>
                    <label htmlFor="bookId">Posudi knjigu</label>
                    <input type="text" name="bookId" placeholder="Unesi broj knjige" ref={inputRef} />
                    <div className="btn" onClick={leaseBook}>Posudi</div>
                </form>
                { user.leasings?.map((leasing, i) => (<UserLeasingCard key={i} {...leasing} />)) }
            </div>
        </div>
    );
}

export default UserProfile;