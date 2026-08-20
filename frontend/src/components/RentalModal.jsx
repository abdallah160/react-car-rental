import { Form, useActionData } from "react-router-dom";
import Modal from "./Modal";

export default function RentalModal({ modalState, carID, closeModal, modalRef }) {
    const data = useActionData();
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Modal
            open={modalState}
            onClose={closeModal}
            modalRef={modalRef}
            label={"Set an Interval"}
        >
            <h1>Select a time period</h1>

            <Form method="post" id="full-form">
                <div id="date-form">
                    <div>
                        <label>From: </label>
                        <input type="date" name="startDate" />
                    </div>

                    <div>
                        <label>To: </label>
                        <input type="date" name="endDate" />
                    </div>
                </div>

                <p>You are signed as: {user.name}</p>

                <input type="hidden" name="userID" value={user.id} />
                <input type="hidden" name="carID" value={carID} />

                <button>Submit</button>
            </Form>

            {data === "Invalid Date" && <p>Please select a valid interval</p>}
        </Modal>
    );
}