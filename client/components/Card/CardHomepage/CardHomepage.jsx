import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

function formatToRupiah(price) {
    return "Rp" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function CardHomepage(props) {
    const { id, imgUrl, name, description, price } = props

    return (
        <>
            <div className="col">
                <div className="card h-100">
                    <Link to={`/detail/${id}`}>
                        <img
                        src={imgUrl}
                        className="card-img-top"
                        alt="Cuisine Image"
                        style={{ height: "190px", width: "100%", objectFit: "cover" }}
                        />
                    </Link>
                    <div className="card-body custom-card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-warning" style={{ textAlign: "center" }}>
                        <h5 style={{ color: "#626262" }}>
                            <strong>{formatToRupiah(price)}</strong>
                        </h5>
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}

CardHomepage.propTypes = {
    id: propTypes.number,
    imgUrl: propTypes.string,
    name: propTypes.string,
    description: propTypes.string,
    price: propTypes.number
}