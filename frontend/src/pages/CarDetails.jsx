import { useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom"
import RentalModal from "../components/RentalModal";

export default function CarDetails() {
    const data = useLoaderData();
    const modalRef = useRef();

    const [modalState, setModalState] = useState(false);
    const [email, setEmail] = useState();
    function handleEmailChange(e) {
        setEmail(e.target.value);

    }
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
                        {/*<Form method="post">*/}
                        <input type="email" placeholder="Enter your email" name="email" required onChange={handleEmailChange} />
                        <input type="hidden" name="car" value={data.id} />
                        <button type="submit" onClick={handleRentButton}>Rent</button>
                        {/*</Form>*/}
                        <RentalModal modalState={modalState} email={email} carID={data.id} closeModal={closeModal} modalRef={modalRef} />

                    </div>
                </div>


            </div>



        </div>
    )
}