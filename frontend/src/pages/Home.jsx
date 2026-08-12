import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";

export default function Home() {
    const response = useLoaderData();
    return <>
        {response.map(item => <Card key={item.key} name={item.name} />)}

    </>
}
