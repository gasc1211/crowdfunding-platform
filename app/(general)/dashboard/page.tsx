import { getUserData } from "@/app/api/handler";


export default async function Hello() {

  const user = await getUserData()

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  )
}