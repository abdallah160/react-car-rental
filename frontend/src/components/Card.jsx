export default function Card({ dataObj }) {
    return <>
        <p>{dataObj.name}</p>
        <p>{dataObj.description}</p>
        <p>{dataObj.pricePerDay}</p>
        <p>{dataObj.image}</p>
        <p>{dataObj.available}</p>
    </>
}