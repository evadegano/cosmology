import { useContext } from 'react'
import { Context } from '../../context'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'


export default function HomeNav({ navLinks }) {
  const { user } = useContext(Context)
  return (
    <nav id={styles.homeNav}>
      {
        user
        ? <Link href={`/user/${user.uid}`}><a>My profile</a></Link>
        : navLinks.map(link => {
          return <Link key={link.text} href={link.url}><a>{link.text}</a></Link>
        })
      }
    </nav>
  )
}