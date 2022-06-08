import UserLayout from "../../components/user/userLayout"
import Feed from "../api/user/[id]/feed"

export default function UserProfile() { 
  return (
    <UserLayout >
      <Feed />
    </UserLayout>
  )
}