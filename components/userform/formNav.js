import Link from "next/link"
import { signIn } from "next-auth/react"


export default function FormNav(props) {
  return (
    <nav>
      <Link href='/'><a>{props.appName}</a></Link>
      <button onClick={() => signIn()}>Sign in</button>
    </nav>
  )
}