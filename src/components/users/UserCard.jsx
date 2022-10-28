import { useNavigate } from "react-router"

export default function UserCard(props) {
    let navigate = useNavigate()

    const goToUser = () => {
        navigate(`/users/${props.id}/read`)
    }

    return (
        <div className="UserCard" onClick={goToUser}>
            <div>{props.id}, {props.name}, {props.email}</div>
        </div>
    )
}
