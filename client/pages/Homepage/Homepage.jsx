import { useState, useEffect } from "react";
import axios from '../../utils/axios'

import NavbarHomepage from "../../components/Navbar/NavbarHomepage/NavbarHomepage";
import CardHomepage from '../../components/Card/CardHomepage/CardHomepage';
import Footer from '../../components/Footer/Footer';
import NavbarPagination from "../../components/Footer/Pagination";



export default function Homepage() {
    const [cuisine, setCuisines] = useState([]);
    const [search, setSearch] = useState("")
    const [pageSize] = useState(10)
    const [sort, setSort] = useState("name")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationOption, setPaginationOption] = useState(
        {
            totalData: 0,
            totalPage: 1,
            dataPerPage: 0,
        }
    )


    const fetchCuisines = async () => 
        {
            try {
                let { data } = await axios(
                    {
                        method: "GET",
                        url: '/pub/cuisines',
                        params: {
                            page: {
                                size: pageSize,
                                number: currentPage,
                            },
                            search: search,
                            filter: selectedCategory,
                            sort
                        }
                    }
                )

                
                // setCuisines(
                //     data.data.map((element) => ({
                //         id: element.id,
                //         name: element.name,
                //         description: element.description,
                //         imgUrl: element.imgUrl,
                //         price: element.price,
                //     }))
                // )
                
                let { totalData, totalPage, dataPerPage } = data
                setCuisines(data.data)
                setPaginationOption(() => ({ totalData, totalPage, dataPerPage }))
            } catch (error) {
                console.error(error)
            }
        }

        const submitSearch = () => {
            if (currentPage !== 1) {
                setCurrentPage(1)
            } else {
                fetchCuisines()
            }
        }

        useEffect(() => {
            fetchCuisines();
        }, [sort, selectedCategory, currentPage]);
    
        return (
        <>
        <NavbarHomepage 
            setSort={setSort} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            search={search} 
            setSearch={setSearch} 
            submitSearch={submitSearch} 
        />
        <div className="row row-cols-1 row-cols-md-5 g-4 ms-1 me-1" style={{ marginTop: "60px" }}>
            { cuisine.map((cuisine) => {
                return (
                    <CardHomepage 
                        key={cuisine.id}
                        id={cuisine.id}
                        name={cuisine.name}
                        description={cuisine.description}
                        imgUrl={cuisine.imgUrl}
                        price={cuisine.price}
                    />
                )
            })}
        </div>
        <NavbarPagination 
            paginationOption={paginationOption} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
        />
        <Footer />
        </>
    );
}
