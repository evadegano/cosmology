import Link from 'next/link'
import styles from '../../styles/Home.module.css'


export default function HomeNav({ navLinks }) {
  return (
    <nav id={styles.homeNav}>
      {navLinks.map(link => {
        return <Link key={link.text} href={link.url}><a>{link.text}</a></Link>
      })}
    </nav>
  )
}