import { Link } from "react-router-dom"

import ButtonLogout from "../Button/ButtonLogout/ButtonLogout"

export default function CMSSidebar() {
    return (
        <>
            <div className="sidebar" 
                style={{ 
                width: "250px", 
                backgroundColor: '#f4eee0',
                color: 'white',
                height: '100vh',
                position: 'fixed',
                top: '0',
                left: '0',
                overflowY: 'auto',
                paddingTop: '20px'
            }}>
                <ul style={{
                    listStyleType: 'none',
                    padding: '0'
                }}>
                    <li style={{
                        padding: '10px',
                        textAlign: 'center'
                    }}>
                        <ButtonLogout />
                    </li>
                </ul>
                <ul style={{
                    listStyleType: 'none',
                    padding: '0'
                }}>
                    <li style={{
                        paddingTop: '10px',
                        paddingLeft: '35px',
                        textAlign: 'left'
                    }}>
                        <Link to="/add-staff">
                          Add a Staff
                        </Link>
                    </li>
                    <li style={{
                        paddingTop: '10px',
                        paddingLeft: '35px',
                        textAlign: 'left'
                    }}>
                        <Link to="/add-edit-cuisine">
                            Add / Edit a Cuisine
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}