export default function detailsLoader({ params }) {
  return fetch(`http://localhost:5000/api/cars/${params.id}`);
}
