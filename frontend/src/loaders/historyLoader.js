export default function historyLoader() {
  const userId = JSON.parse(localStorage.getItem("user")).id;

  return fetch(`http://localhost:5000/api/rentals/user/${userId}`);
}
