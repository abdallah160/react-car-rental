import { redirect } from "react-router-dom";

export default async function rentalAction({ request }) {
  const formData = await request.formData();
  const userId = formData.get("userID");
  const carId = formData.get("carID");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");

  console.log(userId + carId + startDate + endDate);
  const response = await fetch("http://localhost:5000/api/rentals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      carId,
      startDate,
      endDate,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    return "unable to rent";
  }

  return redirect("/history");
}
