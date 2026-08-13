export default function Card({ dataObj }) {
    return <div className="card">
        <p className="name">{dataObj.name}</p>


        <img src={`http://localhost:5000${dataObj.images[0]}`} />
        <p className="description">{dataObj.description}</p>
        <p className="price">${dataObj.pricePerDay}</p>
    </div>
}