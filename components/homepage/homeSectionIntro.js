import styles from '../../styles/Home.module.css'


export default function HomeSectionIntro({ sectionOneTitle, sectionOneText }) {
  return (
    <section id={styles.homeSectionIntro}>
      <h2>{sectionOneTitle}</h2>
      <p>{sectionOneText}</p>
    </section>
  )
}