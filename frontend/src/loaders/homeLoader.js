export default async function homeLoader() {
  const response = await fetch("http://localhost:5000/api/cars");
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  return response.json();
}
