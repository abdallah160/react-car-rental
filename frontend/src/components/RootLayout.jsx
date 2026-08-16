import { Link, NavLink, Outlet } from "react-router-dom"
import img from '../assets/gray-user-profile-icon-png-fP8Q1P.png'
export default function RootLayout() {
    return (
        <>
            <div id="nav-bar">
                <header>
                    <Link to="/" ><h1>Rent.com</h1></Link>
                </header>
            </div>

            <div id="main-content">
                <aside>
                    <NavLink style={({ isActive }) => isActive ? { backgroundColor: "rgb(100, 182, 71)", color: "#fff" } : undefined} id="cars-link" to="/">Cars</NavLink>
                    <NavLink style={({ isActive }) => isActive ? { backgroundColor: "rgb(100, 182, 71)", color: "#fff" } : undefined} id="history-link" to="/history"> History</NavLink>
                </aside>
                <Outlet />
            </div >
        </>

    )
}