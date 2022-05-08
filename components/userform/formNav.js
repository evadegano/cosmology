import Link from "next/link"
import { signIn } from "next-auth/react"


export default function FormNav(props) {
  return (
    <nav>
      <Link href='/'><a>Cosmology</a></Link>
      <Link href='/login'><a>Sign in</a></Link>
    </nav>
  )
}