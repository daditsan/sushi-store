import { Link } from "react-router-dom"

export default function RegisterButton() {
    return (
        <>
            <Link to={"/"} className="btn btn-primary me-3">
                Register
            </Link>
        </>
    )
}