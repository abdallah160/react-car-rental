export default function homeLoader() {
  return fetch("http://localhost:5000/api/cars");
}
