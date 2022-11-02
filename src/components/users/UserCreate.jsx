import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function UserCreate() {
    let formRef = useRef(null)
    let navigate = useNavigate();

    let usersApiRoute = "https://localhost:7009/api/users"

    const postUser = () => {
        let formData = new FormData(formRef.current);

        for (const key of formData.keys()) {
            // console.log(key, formData.get(key));
        }
        
        axios.post(usersApiRoute, formData)
            .then(response => {
                if (response.status === 201) {
                    let user = response.data
                    navigate(`/users/${user.id}/read`, user)
                }
                console.log("response:", response)
            })
            .catch(axiosError => {
                // console.log(axiosError)
                switch(axiosError.response?.status) {
                    case 10001:
                        console.log("Error: Duplicate e-mail address")
                        break;
                    default:
                        console.log("Unhandled error occured")
                        break;
                }
                
            })
    }

    return (
        <form className="UsersCreate" ref={formRef}>
            <h1>Novi član</h1>
            <input type="text" name="name" placeholder="Puno ime korisnika" required />
            <input type="email" name="email" placeholder="Email adresa" required />
            <div className="btn" onClick={postUser}>Dodaj člana</div>
        </form>
    )
}
