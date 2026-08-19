import { Form } from "react-router-dom";
import { createPortal } from "react-dom";

export default function RentalModal({ modalState, email, carID, closeModal, modalRef }) {

    if (!modalState) return null;
    const user = JSON.parse(localStorage.getItem("user"))
    return createPortal(<dialog id="rental-modal" ref={modalRef} open>
        <div id="upper-section">
            <h1 >Select a time period</h1>
            <button onClick={closeModal}>X</button>
        </div>

        <Form method="post" id="full-form">
            <div id="date-form">
                <div>
                    <label>From: </label>
                    <input type="date" name="startDate" />
                </div>
                <div>
                    <label>to: </label>
                    <input type="date" name="endDate" />
                </div>
            </div>
            <p>you are signed as: {user.name}</p>
            <input type="hidden" name="userID" value={user.id} />
            <input type="hidden" name="carID" value={carID} />
            <button>Submit</button>
        </Form>


    </dialog>, document.getElementById("modal"))
}