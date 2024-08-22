import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';
import axios from '../../utils/axios'
import NavbarGeneral from "../../components/Navbar/NavbarGeneral/NavbarGeneral"
import alertError, { alertSuccess } from "../../utils/toastify"

export default function AddAStaffPage() {
    const [username, setCreateUsername] = useState('')
    const [email, setCreateEmail] = useState('')
    const [password, setCreatePassword] = useState('')
    const [phoneNumber, setCreatePhoneNumber] = useState('')
    const [address, setCreateAddress] = useState('')
    
    const navigate = useNavigate()

    const createStaff = async (event) => {
        event.preventDefault()
        try {
            let { data } = await axios(
                {
                    method: 'POST',
                    url: '/add-user',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                    data: {
                        username: username,
                        email: email,
                        password: password,
                        phoneNumber: phoneNumber,
                        address: address
                    }
                }
            )

            setCreateUsername("")
            setCreateEmail("")
            setCreatePassword("")
            setCreatePhoneNumber("")
            setCreateAddress("")
            navigate('/cms')
            alertSuccess(data?.message, "message")
        } catch (error) {
            alertError(error.response?.data?.message || error.message, "error")
            console.error(error);
        }
    }

    return (
        <>
            <NavbarGeneral />
            <div className="d-flex justify-content-center align-items-center" style={{width: '100vw', height: '100vh'}}>
                <div className="card" style={{ backgroundColor: "#F4EEE0", width: '400px' }}>
                    <div>
                        <Link to={'/cms'} type="button" className="btn btn-danger ms-4 mt-3">
                            X
                        </Link>
                        <h5 className="card-header text-center">Add a Staff</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={createStaff}>
                            <div className="form-outline mb-4">
                                <MDBInput 
                                    type="text" 
                                    id="username" 
                                    label="Username"
                                    required
                                    name="username"
                                    value={username} 
                                    onChange={(event) => {setCreateUsername(event.target.value)}}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <MDBInput 
                                    type="email" 
                                    id="email" 
                                    label="Email Address" 
                                    required
                                    name="email"
                                    value={email} 
                                    onChange={(event) => {setCreateEmail(event.target.value)}}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <MDBInput 
                                    type="password" 
                                    id="password" 
                                    label="Password"
                                    required
                                    name="password"
                                    value={password} 
                                    onChange={(event) => {setCreatePassword(event.target.value)}}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <MDBInput 
                                    type="number" 
                                    id="phoneNumber" 
                                    label='Phone Number'
                                    required
                                    name="phoneNumber"
                                    value={phoneNumber} onChange={(event) => {setCreatePhoneNumber(event.target.value)}}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <MDBInput 
                                    type="text"
                                    id="address"
                                    label="Address"
                                    required
                                    name="address"
                                    value={address} 
                                    onChange={(event) => {setCreateAddress(event.target.value)}}
                                />
                            </div>
                            <button type="submit" className="btn btn-warning btn-block">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}