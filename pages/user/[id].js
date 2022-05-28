const user = req.session.get("user")

export default function UserProfile() {
  return <h1>hey beautiful {user.name}</h1>
}