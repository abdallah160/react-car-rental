export default function Card({ dataObj }) {
    let availability;
    let addedClass;

    if (!dataObj.available) {
        availability = " (unavailable)";
        addedClass = "unavailable";

    }
    else {
        availability = null;
        addedClass = null;

    }


    return <div className={`card ${addedClass}`}>
        <p className="name">{dataObj.name}  {availability}  </p>


        <img src={`http://localhost:5000${dataObj.images[0]}`} />
        <p className="description">{dataObj.description}</p>
        <p className="price">${dataObj.pricePerDay}</p>

    </div>
}