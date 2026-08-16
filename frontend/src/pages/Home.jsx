import { Link, useLoaderData } from "react-router-dom";
import Card from "../components/Card";

export default function Home() {
    const response = useLoaderData();
    return <div id="all-items">
        {response.map(item => <Link key={item.id} to={`/${item.id}`} ><Card dataObj={item} /></Link>)}

    </div>
}
