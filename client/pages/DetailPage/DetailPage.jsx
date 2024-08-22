import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../utils/axios'
import NavbarHomepage from "../../components/Navbar/NavbarHomepage/NavbarHomepage";
import NavbarDetailPage from "../../components/Navbar/NavbarDetailPage/NavbarDetailPage";

// function formatToRupiah(price) {
//     return "Rp" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// }

export default function DetailPage() {
    const { id } = useParams();
    const [cuisine, setCuisine] = useState({})

    const fetchCuisine = async () => 
        {
            try {
                let { data } = await axios(
                    {
                        method: "GET",
                        url: `/pub/cuisines/${id}`
                    }
                )
    
                setCuisine(data)
            } catch (error) {
                console.error(error)
            }
        }
    
        useEffect(() => {
            fetchCuisine();
        }, []);
    
    return (
        <>
            <NavbarDetailPage />
            <div style={{ width: '100%', }}>
                <div className="col" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                    <div style={{ height: '100vh', width: '50vw'}}>
                        <div style={{ height: '100vh', width: '25vw' }}>
                            <div style={{ height: '100vh', width: '50%' }}>
                                <img src={cuisine.imgUrl} alt="Cuisine Image"
                                style={{ marginTop: '250px', marginLeft: '200px'}}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '100vh', width: '50vw', backgroundColor: '#fcb900' }}>
                        <div style={{ marginTop: '250px', marginLeft: '100px' }}>
                            <div className="mb-3">
                                <a href="">
                                <span className="badge bg-dark me-1">{cuisine.categoryId}</span>
                                </a>
                            </div>
                            <p className="lead">
                                <span>{cuisine.price}</span>
                            </p>
                            <strong>
                                <p style={{ fontSize: 30 }}>{cuisine.name}</p>
                            </strong>
                            <strong>
                                <p style={{ fontSize: 20 }}>Description</p>
                            </strong>
                            <p>
                                {cuisine.description}
                            </p>
                            <div>
                                <p style={{ fontSize: 20 }}>
                                    <strong>Author: </strong>{cuisine.authorId}
                                </p>
                            </div>
                            <form className="d-flex justify-content-left">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
