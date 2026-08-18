import { Link, NavLink, Outlet } from "react-router-dom"
import { useState } from "react";
export default function RootLayout() {
    const [sideBarClass, setSideBarClass] = useState(undefined);
    function toggleSideBar() {
        setSideBarClass((prev) => prev ? undefined : 'open')
    }

    return (
        <>
            <div id="nav-bar">
                <button onClick={toggleSideBar} id="sidebar-button">=</button>
                <header>
                    <Link to="/" ><h1>Rent.com</h1></Link>
                </header>
            </div>

            <div id="main-content">
                <aside className={sideBarClass}>
                    <NavLink style={({ isActive }) => isActive ? { backgroundColor: "rgb(100, 182, 71)", color: "#fff" } : undefined} id="cars-link" to="/">Cars</NavLink>
                    <NavLink style={({ isActive }) => isActive ? { backgroundColor: "rgb(100, 182, 71)", color: "#fff" } : undefined} id="history-link" to="/history"> History</NavLink>
                </aside>
                <Outlet />
            </div >
        </>

    )
}