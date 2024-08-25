import { Link } from "react-router-dom";

export default function NavbarDetailPage() {
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
          </div>
            <ul className="navbar-nav flex-row">
                <div className="d-flex align-items-center">
                <Link to={"/login"} className="btn btn-warning me-3">
                    LOGIN
                </Link>
                </div>
            </ul>
        </div>
      </nav>
    </>
  )
}
