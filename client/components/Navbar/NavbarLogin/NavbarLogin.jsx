export default function NavbarLogin() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          position: "fixed",
          zIndex: "1",
          width: "100%",
          top: 0,
          backgroundColor: "#f4eee0",
        }}
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
                src="https://i.ibb.co.com/1Mb5CtB/Transportation-Rental-Logo.png"
                height="27px"
                alt="Logo"
                loading="lazy"
                style={{ marginTop: 2 }}
              />
            </a>
          </div>
          {/* END OF LEFT ELEMENTS */}
          {/* RIGHT ELEMENTS */}
          <ul className="navbar-nav flex-row">
            <div className="d-flex align-items-center">
              
            </div>
          </ul>
          {/* END OF RIGHT ELEMENTS */}
        </div>
      </nav>
    </>
  );
}
