import { useNavigate } from "react-router-dom"
import { alertSuccess } from "../../../utils/toastify";

export default function ButtonLogout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.clear();
        navigate("/");
        alertSuccess(`You're signed out.`)
        };
    
    return (
        <>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </>
    )
}