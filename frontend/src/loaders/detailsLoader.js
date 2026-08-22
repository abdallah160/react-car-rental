export default async function detailsLoader({ params }) {
  const response = await fetch(`http://localhost:5000/api/cars/${params.id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch car details");
  }

  return response.json();
}
