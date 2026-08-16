import { Form } from "react-router-dom";
import { createPortal } from "react-dom";
export default function RentalModal({ modalState, email, carID }) {
    if (!modalState) return null;
    return createPortal(<dialog>
        <h1>hello world!</h1>
        <Form>
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="carID" value={carID} />
        </Form>

    </dialog>, document.getElementById("root"))
}