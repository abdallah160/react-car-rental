import { Form } from "react-router-dom";
import { createPortal } from "react-dom";
import { useRef } from "react";
export default function RentalModal({ modalState, email, carID, closeModal, modalRef }) {

    if (!modalState) return null;
    return createPortal(<dialog id="rental-modal" ref={modalRef} open>
        <div id="upper-section">


            <h1 >Select a time period</h1>
            <button onClick={closeModal}>X</button>
        </div>
        <Form id="full-form">
            <div id="date-form">
                <div>
                    <label>From: </label>
                    <input type="date" />
                </div>
                <div>
                    <label>to: </label>
                    <input type="date" />
                </div>
            </div>
            <p>we will contact you on: {email}</p>
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="carID" value={carID} />
            <button>Submit</button>
        </Form>


    </dialog>, document.getElementById("modal"))
}