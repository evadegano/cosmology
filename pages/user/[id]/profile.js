import UserLayout from '../../../components/user/userLayout'
import SavedPins from '../../../components/profile/savedPins'


export default function Profile() {
  return (
    <UserLayout>
      <div>
        <SavedPins />
      </div>
    </UserLayout>
  )
}