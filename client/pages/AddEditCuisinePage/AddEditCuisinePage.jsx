import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
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

export default function AddEditCuisinePage() {
    const [name, setCreateName] = useState('')
    const [description, setCreateDescription] = useState('')
    const [price, setCreatePrice] = useState('')
    const [imgUrl, setCreateImgUrl] = useState('')
    const [categoryId, setCreateCategoryId] = useState(0)
    const [categories, setCategories] = useState([])
    const { id } = useParams()
    
    const navigate = useNavigate();

    const addCuisine = async (event) => {
        event.preventDefault()

        try {
            let { data } = await axios(
                {
                    method: "POST",
                    url: '/cuisines',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                    data: {
                        name: name,
                        description: description,
                        imgUrl: imgUrl,
                        price: price,
                        categoryId: categoryId,
                    }
                }
            )

            setCreateName('');
            setCreateDescription('')
            setCreateImgUrl('')
            setCreatePrice('')
            setCreateCategoryId('')
            navigate('/cms')
            alertSuccess(data?.message, "message")
        } catch (error) {
            alertError(error.response?.data?.message || error.message, "error")
            console.error(error)
        }
    }

    const getCategory = async () => {
        try {
            let { data } = await axios(
                {
                    method: "GET",
                    url: '/categories',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                }
            )

            setCategories(data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCuisineById = async () => {
        try {
            let { data } = await axios(
                {
                    method: "GET",
                    url: `pub/cuisines/${id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                }
            )

            setCreateName(`${data.name}`)
            setCreateDescription(`${data.description}`)
            setCreateImgUrl(`${data.imgUrl}`)
            setCreatePrice(`${data.price}`)
            setCreateCategoryId(`${data.categoryId}`)
        } catch (error) {
            alertError(error.response?.data?.message || error.message, "error")
            console.error(error);
        }
    }

    const editCuisineById = async (event) => {
        event.preventDefault()
        try {
            let { data } = await axios(
                {
                    method: "PUT",
                    url: `cuisines/${id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                    data: {
                        name: name,
                        description: description,
                        imgUrl: imgUrl,
                        price: price,
                        categoryId: categoryId
                    }
                }
            )

            setCreateName('')
            setCreateDescription('')
            setCreateImgUrl('')
            setCreatePrice('')
            setCreateCategoryId('')
            navigate('/cms')
            alertSuccess(data?.message, "message")
        } catch (error) {
            alertError(error.response?.data?.message || error.message, "error")
            console.error(error)
        }
    }

    useEffect(() => {
        getCategory()
        if (id) fetchCuisineById();
    }, [])

    return (
        <>
            <NavbarGeneral />
            <div className="d-flex justify-content-center align-items-center" style={{width: '100vw', height: '100vh'}}>
                <div className="card" style={{backgroundColor: '#F4EEE0', width: '600px'}}>
                    <div>
                    <Link to={'/cms'} type="button" className="btn btn-danger ms-4 mt-3">
                    X
                    </Link>
                    <h5 className="card-header text-center">Add / Edit Cuisine</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={id ? editCuisineById : addCuisine}>
                            <div className="form-outline mb-4">
                                <MDBInput
                                    type="text"
                                    id="name"
                                    label="Cuisine Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(event) => {
                                    setCreateName(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <MDBInput
                                    type="textarea"
                                    id="description"
                                    label="Cuisine Description"
                                    required
                                    name="description"
                                    value={description}
                                    onChange={(event) => {
                                    setCreateDescription(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <MDBInput
                                    type="number"
                                    id="price"
                                    label="Cuisine Price"
                                    required
                                    name="price"
                                    value={price}
                                    onChange={(event) => {
                                    setCreatePrice(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <select
                                    className="form-select"
                                    required
                                    style={{ backgroundColor: '#F4EEE0'}}
                                    value={categoryId}
                                    onChange={(event) => {
                                    setCreateCategoryId(event.target.value);
                                    }}
                                >
                                <option selected="" disabled="">
                                    Category
                                </option>
                                {categories.map((category, index) => {
                                    return <option key={index} value={category.id}>{category.name}</option>;
                                })}
                                </select>
                            </div>
                            <div className="form-outline mb-4">
                            <MDBInput
                                type="text"
                                label="Cuisine Image Url"
                                required
                                name="imgUrl"
                                value={imgUrl}
                                onChange={(event) => {
                                setCreateImgUrl(event.target.value);
                                }}
                            />
                            </div>
                            <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-warning btn-block"
                            >
                                Submit
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}