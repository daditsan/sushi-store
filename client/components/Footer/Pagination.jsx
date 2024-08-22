import propTypes from 'prop-types'
import { useState } from 'react';

export default function NavbarPagination({ paginationOption, currentPage, setCurrentPage }) {
    const { totalPage } = paginationOption

    const handleChangePage = (page) => {
        if (page < 1 ||  page > totalPage) 
            return;
        setCurrentPage(page)
    }

    const pageNumber = () => {
        let numbers = []

        for (let i = 1; i <= totalPage; i++) {
            numbers.push(
                <li className='page-item' key={i}>
                    <button className={'page-link ' + (currentPage === i ? "fw-semibold link-underline-primary" : "")}
                    onClick={() => handleChangePage(i)}>
                        {i}
                    </button>
                </li>
            )
        }
        return numbers
    }    

    return (
        <>
            <nav className="mt-4">
                <div className="container-fluid justify-content-between" style={{ backgroundColor: "#fcb900" }}>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            {/* <a className="page-link" href="#" style={{ color: "#f4eee0" }}>
                            1
                            </a> */}
                            <button className='page-link' onClick={() => handleChangePage(currentPage - 1)}>
                                Previous
                            </button>
                        </li>
                        {currentPage > 1 ? (
                        <li className="page-item">
                            <button className='page-link' onClick={() => handleChangePage(currentPage - 1)}>
                                {currentPage - 1}
                            </button>
                        </li>

                        ) : (<li></li>)} 
                        <li className="page-item">
                            <a className="page-link" href="#" style={{ color: "#f4eee0" }}>
                            {currentPage}
                            </a>
                        </li>
                        {currentPage < 3 ? (
                        <li className="page-item">
                            <button className='page-link' onClick={() => handleChangePage(currentPage + 1)}>
                                {currentPage + 1}
                            </button>
                        </li>
                        ) : (<li></li>)}
                        <li className="page-item">
                            <button className='page-link' onClick={() => handleChangePage(currentPage + 1)}>
                                Next
                            </button>
                        </li>
                    </ul>
                </div>
          </nav>
        </>
    )
}