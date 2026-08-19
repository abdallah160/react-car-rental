import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom"
import RentalModal from "../components/RentalModal";

export default function CarDetails() {
    const data = useLoaderData();
    const modalRef = useRef();
    const [modalState, setModalState] = useState(false);

    function handleRentButton() {
        setModalState(true);
    }

    function closeModal() {
        setModalState(false)
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
                        <button type="submit" onClick={handleRentButton}>Rent</button>
                        <RentalModal modalState={modalState} carID={data.id} closeModal={closeModal} modalRef={modalRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}