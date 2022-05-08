import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import utilsStyles from '../../styles/utils.module.css'
import HomeNav from './homeNav'


export default function HomeHeader({ appName, lang }) {
  return (
    <header id={styles.homeHeader}>
      <div>
        <HomeNav navLinks={lang.home.navLinks} />
        <h1 className={utilsStyles.accent} id={styles.homeTitle}>{appName}</h1>
        <h2 className={utilsStyles.serif} id={styles.homeSubTitle}>{lang.home.headerText}</h2>

        <Link href='/mygoals'><a className={utilsStyles.mainBtn}>Start</a></Link>
      </div>
      
      <div id={styles.homeHeaderImgWrapper}>
        <Image
          src="/images/desk_header_img.png"
          layout='fill'
          objectFit='contain'
          alt=""
        />
      </div>
    </header>
  )
}