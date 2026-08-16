export default async function rentalAction({ request }) {
  const formData = await request.formData();
  console.log(formData.get("email"));
}
