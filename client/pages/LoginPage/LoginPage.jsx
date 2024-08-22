import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from '../../utils/axios'
import NavbarLogin from "../../components/Navbar/NavbarLogin/NavbarLogin";
import alertError, { alertSuccess } from "../../utils/toastify";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <>
           <NavbarLogin />
           <div className="d-flex justify-content-center align-items-center" style={{width: '100vw', height: '100vh'}}>
            <div className="card" style={{ backgroundColor: "#F4EEE0", width: '400px' }}>
                <h5 className="card-header text-center">Login</h5>
                <div className="card-body">
                  <form onSubmit={async (event) => {
                    event.preventDefault();
                    try {
                      const { data } = await axios.post('/login', {
                        email,
                        password,
                      });

                      localStorage.setItem("access_token", data.access_token);
                      navigate("/cms");
                      alertSuccess(data?.message, "message")
                    } catch (error) {
                      alertError(error.response?.data?.message || error.message, 'error')
                      console.log(error.response.data.message);
                    }
                  }}>
                    <div className="form-outline mb-4">
                      <MDBInput
                        type="email"
                        id="email"
                        label='Email Address'
                        required
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <MDBInput
                        type="password"
                        id="password"
                        label='Password'
                        required
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-warning btn-block">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
        </>
    )
}