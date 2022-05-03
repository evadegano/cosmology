import styles from '../../styles/Home.module.css'
import utilsStyles from '../../styles/utils.module.css'


export default function HomeSectionIntro({ sectionOneTitle, sectionOneText }) {
  return (
    <section id={styles.homeSectionIntro}>
      <h2 className={utilsStyles.serif}>{sectionOneTitle}</h2>
      <p>{sectionOneText}</p>
    </section>
  )
}