import { Link } from "react-router-dom";
import ButtonLogout from "../../Button/ButtonLogout/ButtonLogout";

export default function NavbarGeneral() {
  return (
    <>
      <nav className="navbar navbar-expand-lg"
        style={{
          position: "fixed",
          zIndex: "1",
          width: "100%",
          top: 0,
          backgroundColor: "#f4eee0",
        }}>
        <div className="container-fluid justify-content-between" style={{ backgroundColor: "#f4eee0" }}>
          {/* LEFT ELEMENTS */}
            <div className="d-flex">
            {/* LOGO BRAND */}
            <Link to={'/cms'} className="navbar-brand me-2 mb-1 d-flex align-items-center">
                <img
                    src="https://i.ibb.co.com/1Mb5CtB/Transportation-Rental-Logo.png"
                    height="27px"
                    alt="Logo"
                    loading="lazy"
                    style={{ marginTop: 2 }}
                />
            </Link>
            </div>
            {/* END OF LEFT ELEMENTS */}
            {/* RIGHT ELEMENTS */}
            <ul className="navbar-nav flex-row">
            <div className="d-flex align-items-center">
                <ButtonLogout />
            </div>
            </ul>
            {/* END OF RIGHT ELEMENTS */}
        </div>
      </nav>
    </>
  );
}
