import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from '../../utils/axios'
import NavbarGeneral from "../../components/Navbar/NavbarGeneral/NavbarGeneral"

export default function ChangeImagePage() {
    const [file, setFile] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    const uploadImage = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('imgUrl', file)

        try {
            const { data } = await axios.patch(`/cuisines/${cuisine.id}/img`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            navigate('/cms')
        } catch (error) {
            console.error(error)
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
                <h5 className="card-header text-center">Change Image</h5>
              </div>
              <div className="card-body">
                <form onSubmit={uploadImage}>
                  <div className="form-outline mb-4">
                    <input
                      type="file"
                      id="imgUrl"
                      className="form-control"
                      required
                      name="imgUrl"
                      onChange={(event) => setFile(event.target.files[0])}
                    />
                  </div>
                  <button type="submit" className="btn btn-warning btn-block">
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
    )
}