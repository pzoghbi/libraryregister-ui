import { useNavigate } from "react-router"

export default function UserCard(props) {
    let navigate = useNavigate()

    const goToUser = () => {
        navigate(`/users/${props.id}/read`)
    }

    return (
        <tr className="UserCard">
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td className="t-center"><div className="btn" onClick={goToUser}>Otvori</div></td>
        </tr>
    )
}
