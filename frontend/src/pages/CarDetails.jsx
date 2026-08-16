import { useLoaderData } from "react-router-dom"

export default function CarDetails() {
    const data = useLoaderData();
    console.log(data);
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
                        <input type="text" placeholder="Add a message (optional)" />
                        <button>Rent</button>
                    </div>
                </div>


            </div>



        </div>
    )
}