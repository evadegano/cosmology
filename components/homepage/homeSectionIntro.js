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
        <p>Cosmology is all about <span className={utilsStyles.primaryColor}>living in alignment with your Higher Self</span> and <span className={utilsStyles.primaryColor}>connecting with other beautiful souls.</span> As we believe that those are the two key ingredients to living a purposeful, empowered and blissful life. Hence, our mission is to make those things accessible to each and everyone.</p>
      </div>
      

      <div id={styles.features}>
        {lang.home.features.map(feat => {
          return (
            <div key={feat.title}>
              <div className={styles.featImg}>
                <Image 
                  src={feat.image}
                  width={287}
                  height={266}
                  alt=""
                />
              </div>
              <h3 className={utilsStyles.serif}>{feat.title}</h3>
              <p>{feat.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}