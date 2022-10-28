import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserCard from './UserCard'

const UsersIndex = () => {
    let navigate = useNavigate()
    let formRef = useRef(null)
    let [usersFromSearch, setusersFromSearch] = useState([])

    let usersRoute = "/users"
    let userCreateRoute = "/users/create"
    let usersApiRoute = "https://localhost:7009/api/users"

    const toUserCreate = () => { navigate(userCreateRoute) }

    const findUsers = (e) => {
        e.preventDefault()
        let userQuery = new FormData(formRef.current).get("userQuery")
        if (!userQuery.length) return

        // Only digits = assume searching by id
        let queryDigits = userQuery.replace(/[^\d+]/g, "")
        let onlyDigits = queryDigits.length === userQuery.length

        let requestUrl = `${usersApiRoute}` + (onlyDigits ? `/${queryDigits}` : '')
        let requestConfig = onlyDigits ? {} : { params: { name: userQuery } }

        axios.get(requestUrl, requestConfig)
            .then(response => {
                let _user = response.data;

                if (Array.isArray(_user)) {
                    setusersFromSearch(_user)
                } else if (_user.id) {
                    navigate(`${usersRoute}/${_user.id}/read`)
                } else {
                    console.log("User not found")
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <div className="UsersIndex">
            <form ref={formRef} onSubmit={findUsers}>
                <input type="text" name="userQuery" placeholder='Trazi clana po broju ili imenu' />
                <div className="btn" onClick={findUsers}>Trazi</div>
            </form>
            <div className="btn" onClick={toUserCreate}>Novi clan</div>
            <div className="SearchResults">
                {
                    usersFromSearch?.map((usr, i) => {
                        return (<UserCard key={i} {...usr} />)
                    })
                }
            </div>
        </div>
    )
}

export default UsersIndex;