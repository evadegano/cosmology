import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import utilsStyles from '../../styles/utils.module.css'


export default function HomeHeader({ appName, headerText }) {
  return (
    <header id={styles.homeHeader}>
      <h1 className={utilsStyles.accent}>{appName}</h1>
      <p className={utilsStyles.serif}>{headerText}</p>
    </header>
  )
}