import styles from '../../styles/UserForm.module.css'
import Link from "next/link"


export default function FormNav({ prev }) {
  return (
    <nav id={styles.formNav}>
      <button type='button' onClick={prev}>← Back</button>
      <Link href='/'><a>Cosmology</a></Link>
      <Link href='/login'><a>Sign in</a></Link>
    </nav>
  )
}