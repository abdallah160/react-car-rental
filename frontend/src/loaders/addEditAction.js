import { redirect } from "react-router-dom";

export default async function addEditAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");
  const carName = formData.get("name");
  const carImages = formData.get("images");
  const carPrice = formData.get("price");
  const carDescription = formData.get("description");
  let fullURL = "http://localhost:5000/api/cars/";
  if (action === "edit") {
    const paramsID = formData.get("paramsID");
    fullURL = "http://localhost:5000/api/cars/" + paramsID;
  }

  const response = await fetch(fullURL, {
    method: action === "add" ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: carName,
      description: carDescription,
      pricePerDay: Number(carPrice),
      images: Array.isArray(carImages) ? carImages : [],
      available: true,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    return "Invalid data";
  }
  return redirect(`/${data.id}`);
}
