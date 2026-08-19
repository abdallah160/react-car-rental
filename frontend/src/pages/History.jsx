import { useLoaderData } from "react-router-dom"

export default function History() {
    let data = useLoaderData();
    console.log(data);
    return <table>
        <th>Car Name</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Total Price</th>
        {data.map(item => <tr key={item.id}>
            <td>{item.carName}</td>
            <td>{item.startDate}</td>
            <td>{item.endDate}</td>
            <td>${item.totalPrice}</td>
        </tr>)}

    </table>
}