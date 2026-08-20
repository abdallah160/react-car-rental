import { useNavigate } from "react-router-dom";
import Modal from "./Modal";


export default function DeleteModal({ modalState, closeModal, modalRef, carID }) {
    const navigate = useNavigate();
    async function deleteCar(ID) {
        try {
            const response = await fetch(`http://localhost:5000/api/cars/${ID}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error(`Delete failed: ${response.status}`);
            }
        }
        catch (error) {
            console.error(error);
        }
        navigate("/")
    }
    return <Modal open={modalState} onClose={closeModal} modalRef={modalRef} modalID={"delete-modal"}>
        <h2>Are you sure you want to delete this car?</h2>
        <button onClick={() => deleteCar(carID)} className="delete-button">Delete</button>
    </Modal>


}