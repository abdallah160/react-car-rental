import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedLayout() {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData ? <Outlet /> : <Navigate to="/login" replace />;
}
