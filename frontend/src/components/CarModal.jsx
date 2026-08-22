import { Form, useActionData, useParams, useNavigation } from "react-router-dom";
import Modal from "./Modal";
import { useEffect, useState } from "react";


export default function CarModal({ modalState, closeModal, modalRef, type, carData }) {
    const params = useParams();
    const actionData = useActionData();
    const navigation = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (navigation.state === "submitting" || navigation.state === "loading") {
            setIsSubmitting(true);
        } else if (navigation.state === "idle" && isSubmitting) {
            setIsSubmitting(false);
            if (actionData !== "Invalid data") {
                closeModal();
            }
        }
    }, [navigation.state, actionData, isSubmitting, closeModal]);

    return <>
        <Modal open={modalState} onClose={closeModal} modalRef={modalRef} label={type === "add" ? "Add a Car" : "Edit Details"}>
            <Form method="post" action="/">

                <div className="input-element">
                    <label>Car Name: </label>
                    <input type="text" name="name" defaultValue={carData?.name || ""} />
                </div>
                <div className="input-element">
                    <label>Price Per Day: </label>
                    <input type="number" name="price" defaultValue={carData?.pricePerDay || ""} />
                </div>
                <div className="input-element">
                    <label>Image URL: </label>
                    <input type="text" name="images" defaultValue={carData?.images?.[0] || ""} />
                </div>
                <div className="input-element">
                    <label>Description: </label>
                    <input type="text" name="description" defaultValue={carData?.description || ""} />
                </div>
                <input type="hidden" name="action" value={type} />
                <input type="hidden" name="paramsID" value={params.id || ""} />
                <div className="input-element">
                    <button>Submit</button>
                </div>

            </Form>

        </Modal>
    </>

}