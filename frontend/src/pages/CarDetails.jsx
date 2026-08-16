import { Form, useLoaderData } from "react-router-dom"

export default function CarDetails() {
    const data = useLoaderData();
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
                        <input type="email" placeholder="Enter your email" name="email" required />
                        <input type="hidden" name="car" value={data.id} />
                        <button type="submit">Rent</button>
                        {/*</Form>*/}

                    </div>
                </div>


            </div>



        </div>
    )
}