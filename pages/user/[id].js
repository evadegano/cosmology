import UserNav from '../../components/user/userNav'


export default function UserProfile({ lang }) {
  return (
    <div>
      <UserNav navLinks={lang.userNavBar.navLinks} />
      <h1>hey beautiful soul</h1>
    </div>
    
  )
}