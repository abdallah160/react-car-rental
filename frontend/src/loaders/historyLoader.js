export default async function historyLoader() {
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const response = await fetch(`http://localhost:5000/api/rentals/user/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  return response.json();
}
