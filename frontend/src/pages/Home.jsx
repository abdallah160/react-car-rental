import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";

export default function Home() {
    const response = useLoaderData();
    return <div id="all-items">
        {response.map(item => <Card key={item.id} dataObj={item} />)}

    </div>
}
