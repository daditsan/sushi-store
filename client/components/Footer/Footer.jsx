import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start">
                <div
                className="text-center p-3"
                style={{ backgroundColor: "#f4eee0" }}
                >
                <Link to={`https://github.com/daditsan`} className="text-body">
                    Adytia Isanda Putra
                </Link>
                </div>
            </footer>
        </>
    )
}