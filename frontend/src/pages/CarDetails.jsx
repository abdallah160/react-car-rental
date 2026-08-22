import { useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom"
import RentalModal from "../components/RentalModal";
import CarModal from "../components/CarModal";
import DeleteModal from "../components/DeleteModal";

export default function CarDetails() {
    const data = useLoaderData();
    const rentalModalRef = useRef();
    const editModalRef = useRef();
    const deleteModalRef = useRef();
    const navigate = useNavigate();
    const [rentalModalState, setRentalModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));


    function handleRentButton() {
        setRentalModalState(true);
    }

    function closeRentModal() {
        setRentalModalState(false)
    }


    function handleEditButton() {
        setEditModalState(true)

    }
    function closeEditModal() {
        setEditModalState(false);

    }
    function handleDeleteModal() {
        setDeleteModalState(true)
    }
    function closeDeleteModal() {
        setDeleteModalState(false);
    }



    if (!data.available) return <h1>Car not available</h1>
    return (
        <div id="details-content">
            <div id="details-box">
                <div>
                    <img src={`http://localhost:5000/${data.images[0]}`} />
                </div>
                <div id="details-data">
                    <div>
                        <h2>{data.name}</h2>
                        <p>{data.description}</p>
                    </div>
                    <div>
                        <p>for only ${data.pricePerDay}/day</p>
                        {user.role === "user" && <button type="submit" onClick={handleRentButton}>Rent</button>}
                        {user.role === "admin" && <div className="buttons-div">
                            <button type="submit" onClick={handleEditButton}>Edit</button>
                            <button type="submit" onClick={handleDeleteModal}>Delete</button>
                        </div>}
                        <DeleteModal modalState={deleteModalState} closeModal={closeDeleteModal} modalRef={deleteModalRef} carID={data.id} />
                        <CarModal modalState={editModalState} closeModal={closeEditModal} modalRef={editModalRef} type={"edit"} carData={data} />
                        <RentalModal modalState={rentalModalState} carID={data.id} closeModal={closeRentModal} modalRef={rentalModalRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}