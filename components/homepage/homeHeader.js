import Link from 'next/link'
import styles from '../../styles/Home.module.css'


export default function HomeHeader({ appName, headerText }) {
  return (
    <header id={styles.homeHeader}>
      <h1 id={styles.homeTitle}>{appName}</h1>
      <p>{headerText}</p>
    </header>
  )
}