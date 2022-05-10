import styles from '../../styles/UserForm.module.css'
import { useRouter } from 'next/router'
import Link from "next/link"
import { signIn } from "next-auth/react"


export default function FormNav(props) {
  const router = useRouter()

  return (
    <nav id={styles.formNav}>
      <button type='button' onClick={() => router.back()}>← Back</button>
      <Link href='/'><a>Cosmology</a></Link>
      <Link href='/login'><a>Sign in</a></Link>
    </nav>
  )
}