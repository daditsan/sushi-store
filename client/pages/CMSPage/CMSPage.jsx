import axios from '../../utils/axios'
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import CMSCategoryList from "../../components/List/CMSCategoryList";
import CMSCuisineList from "../../components/List/CMSCuisinesList";
import CMSSidebar from "../../components/Sidebar/CMSSidebar";

export default function CMSPage() {
    const [cuisine, setCuisine] = useState([]);
    const [category, setCategory] = useState([]);
    // const { id } = useParams();

    const fetchCuisine = async () => {
        try {
            let { data } = await axios(
                {
                    method: 'GET',
                    url: `/pub/cuisines`
                }
            )

            setCuisine(data.data).map((element) => ({
                id: element.id,
                name: element.name,
                description: element.description,
                imgUrl: element.imgUrl,
                price: element.price
            }))
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCategory = async () => {
        try {
            let { data } = await axios(
                {
                    method: 'GET',
                    url: '/categories',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            )

            setCategory(data.map((category) => ({
                id: category.id,
                name: category.name
            })))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCuisine()
    }, [])

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <>
            <CMSSidebar />
            <div className="main-content"
            style={{
                marginLeft: '250px',
                padding: '20px',
                boxSizing: 'border-box',
                width: '83%',
                backgroundColor: '#fcb900',
                color: 'white'
            }}>
                {cuisine.map((cuisine) => {
                return (
                        <CMSCuisineList key={cuisine.id} cuisine={cuisine} fetchCuisine={fetchCuisine}/>
                    )
                })}
                <table className="table caption-top types-table">
                    <caption style={{ color: "white" }}>
                        <strong> LIST OF CUISINE CATEGORIES </strong>
                    </caption>
                    <thead>
                        <tr>
                        <th scope="col" style={{ backgroundColor: '#f4eee0', border:'none' }}>No.</th>
                        <th scope="col" style={{ backgroundColor: '#f4eee0', border:'none' }}>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((category) => {
                        return <CMSCategoryList key={category.id} category={category} />;
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}