import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useRef } from "react";
import CarModal from "./CarModal";


export default function RootLayout() {
    const [sideBarClass, setSideBarClass] = useState(undefined);
    const [modalState, setModalState] = useState(false);

    const modalRef = useRef();


    function openModal() {
        setModalState(true);
    }

    function closeModal() {
        setModalState(false)
    }


    function toggleSideBar() {
        setSideBarClass((prev) => prev ? undefined : 'open')
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("user");
        navigate("/login");

    }
    return (
        <>
            <div id="nav-bar">
                <button onClick={toggleSideBar} id="sidebar-button">=</button>
                <header>
                    <Link to="/" ><h1>Rent.com</h1></Link>
                    {user.role === "admin" && <button onClick={openModal}>+ Add a Car</button>}
                    <CarModal modalState={modalState} closeModal={closeModal} modalRef={modalRef} type={"add"} />
                </header>
            </div>

            <div id="main-content">
                <aside className={sideBarClass}>
                    <NavLink style={({ isActive }) => isActive ? { backgroundColor: "rgb(100, 182, 71)", color: "#fff" } : undefined} id="cars-link" to="/">Cars</NavLink>
                    <NavLink style={({ isActive }) => isActive ? { backgroundColor: "rgb(100, 182, 71)", color: "#fff" } : undefined} id="history-link" to="/history"> History</NavLink>

                    <p className="logout-sentence">signed in as: {user.name}</p>
                    <button onClick={logout} className="logout">Logout</button>
                </aside>
                <div className="outlet-div"><Outlet /></div>
            </div >
        </>

    )
}