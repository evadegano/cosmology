import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import utilsStyles from '../../styles/utils.module.css'
import { useContext } from 'react'
import { Context } from "../../context"


export default function HomeSectionIntro() {
  const { lang } = useContext(Context)

  return (
    <section id={styles.homeSectionIntro}>
      <div>
        <h2 className={utilsStyles.serif}>{lang.home.sectionOneTitle}</h2>
        <p>{lang.home.sectionOneText}</p>
      </div>
      

      <div id={styles.features}>
        {lang.home.features.map(feat => {
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