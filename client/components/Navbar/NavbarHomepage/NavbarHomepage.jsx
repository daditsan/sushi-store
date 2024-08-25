import { Link } from "react-router-dom";
import propTypes from 'prop-types'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

export default function NavbarHomepage({ setSort, search, setSearch, submitSearch }) {
    const handleSearch = (event) => {
        event.preventDefault()
        submitSearch(search)
    }

  
    return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ position: "fixed", zIndex: "1", width: "100%", top: 0, backgroundColor: "#f4eee0" }}
      >
        <div
          className="container-fluid justify-content-between"
          style={{ backgroundColor: "#f4eee0" }}
        >
          {/* LEFT ELEMENTS */}
          <div className="d-flex">
                {/* LOGO BRAND */}
                <a
                className="navbar-brand me-2 mb-1 d-flex align-items-center"
                href="/"
                >
                    <img
                        src="https://genkisushi.co.id/wp-content/uploads/2020/02/Logo-Genki-Sushi-Indonesia-Header.png"
                        height="27px"
                        alt="Logo"
                        loading="lazy"
                        style={{ marginTop: 2 }}
                    />
                </a>
                {/* SEARCH FORM */}
                <form className="input-group w-auto my-auto d-none d-sm-flex"
                onSubmit={handleSearch} role="search"
                >
                <input
                    autoComplete="off"
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    style={{ minWidth: 125, width: '400px' }}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <button type="submit" className="btn btn-warning" data-mdb-ripple-init="">
                    <i className="fas fa-search" />
                </button>
                </form>
                {/* SORT AND FILTER */}
                    <ul style={{marginTop: '3px', marginLeft: '3px'}} className="navbar-nav flex-row d-none d-md-flex">
                        <li className="nav-item me-3 me-lg-1">
                            <button className="btn btn-warning">
                                <i className="fas fa-arrow-down-a-z fa-lg" onClick={() => setSort("name")}/>
                            </button>
                        </li>
                        <li className="nav-item dropdown me-3 me-lg-1">
                        <MDBDropdown>
                        <MDBDropdownToggle className="btn btn-warning">Category</MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem link>Sashimi</MDBDropdownItem>
                            <MDBDropdownItem link>Gunkan</MDBDropdownItem>
                            <MDBDropdownItem link>Makimono</MDBDropdownItem>
                            <MDBDropdownItem link>Nigiri</MDBDropdownItem>
                            <MDBDropdownItem link>Appetizer</MDBDropdownItem>
                        </MDBDropdownMenu>
                        </MDBDropdown>
                        </li>
                    </ul>
          </div>
            {/* END OF LEFT ELEMENTS */}
            {/* RIGHT ELEMENTS */}
                <ul className="navbar-nav flex-row">
                    <div className="d-flex align-items-center">
                    <Link to={"/login"} className="btn btn-warning me-3">
                        LOGIN
                    </Link>
                    {/* </button> */}
                    </div>
                </ul>
        {/* END OF RIGHT ELEMENTS */}
        </div>
      </nav>
    </>
  )
}

NavbarHomepage.propTypes = {
    setSort: propTypes.func,
    search: propTypes.string,
    setSearch: propTypes.func,
    submitSearch: propTypes.func
}
