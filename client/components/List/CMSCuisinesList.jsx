import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

import propTypes from "prop-types"
import axios from '../../utils/axios'
import alertError, { alertSuccess } from "../../utils/toastify";

function formatToRupiah(price) {
    return "Rp" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

export default function CMSCuisineList(props) {
    const { cuisine, fetchCuisine } = props;
    // const {id} = useParams();

    const deleteCuisineById = async () => {
        try {
            let { data } = await axios ({
                method: "DELETE",
                url: `/cuisines/${cuisine.id}`,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                }
              })

              fetchCuisine()
              alertSuccess(data?.message, "message")
        } catch (error) {
            alertError(error.response?.data?.message || error.message, 'error')
            console.error(error);
        }
    }

    return (
        <>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-dark">
                    <tr>
                        <th style={{ backgroundColor: '#f4eee0', border:'none' }}>No.</th>
                        <th style={{ backgroundColor: '#f4eee0', border:'none' }}>Image</th>
                        <th style={{ backgroundColor: '#f4eee0', border:'none' }}>Name</th>
                        <th style={{ backgroundColor: '#f4eee0', border:'none' }}>Description</th>
                        <th style={{ backgroundColor: '#f4eee0', border:'none' }}>Price</th>
                        <th style={{ backgroundColor: '#f4eee0', border:'none' }}>Author</th>
                        <th style={{ backgroundColor: '#f4eee0', border:'none' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: 'none' }}>{cuisine.id}</td>
                        <td style={{ border: 'none' }}>
                            <img
                                src={cuisine.imgUrl}
                                alt=""
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                className="rounded-circle"
                            />
                        </td>
                        <td style={{ border: 'none' }}>
                            <p className="fw-bold mb-1">{cuisine.name}</p>
                        </td>
                        <td style={{ border: 'none' }}>{cuisine.description}</td>
                        <td style={{ border: 'none' }}>{formatToRupiah(cuisine.price)}</td>
                        <td style={{ border: 'none' }}>{cuisine.authorId}</td>
                        <td style={{ border: "none" }}>
                            <Link to={`/change-cuisine-image/${cuisine.id}`} type="button" className="btn btn-link btn-sm btn-rounded">
                                Change Image
                            </Link>
                            <Link to={`/add-edit-cuisine/${cuisine.id}`}  type="button" className="btn btn-link btn-sm btn-rounded">
                                Edit
                            </Link>
                            <button
                            onClick={() => deleteCuisineById(cuisine.id)}
                            type="button"
                            className="btn btn-link btn-rounded btn-sm fw-bold"
                            data-mdb-ripple-color="dark"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

CMSCuisineList.propTypes = {
    cuisine: propTypes.object,
    id: propTypes.number,
    name: propTypes.string,
    description: propTypes.string,
    imgUrl: propTypes.string,
    price: propTypes.string,
    fetchCuisine: propTypes.func
}