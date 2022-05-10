import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import utilsStyles from '../../styles/utils.module.css'


export default function HomeSectionIntro({ lang }) {
  return (
    <section id={styles.homeSectionIntro}>
      <div>
        <h2 className={utilsStyles.serif}>{lang.sectionOneTitle}</h2>
        <p>{lang.sectionOneText}</p>
      </div>
      

      <div id={styles.features}>
        {lang.features.map(feat => {
          return (
            <div key={feat.title}>
              <Image 
                src={feat.image}
                width={287}
                height={266}
                alt=""
              />
              <h3>{feat.title}</h3>
              <p>{feat.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}