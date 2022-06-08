import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Footer.module.css'
import utilsStyles from '../../styles/utils.module.css'


export default function Footer({ appName, lang }) {
  return (
    <footer id={styles.footer}>
      <div>
        {/* nav links */}
        <div id={styles.footerNavLinks}>
          <h3 className={styles.footerTitle}>Legal</h3>

          {lang.navLinks.map(link => {
            return <Link key={link.text} href={link.url}><a>{link.text}</a></Link>
          })}
        </div>

        <p id={styles.copyright}>{lang.copyright}</p>
      </div>
      
      <div>
        {/* social links */}
        <div>
          <h3 className={styles.footerTitle}>{lang.socialTitle}</h3>
          <div id={styles.socials}>
            {lang.socialLinks.map(link => {
              return (
                <Link key={link.text} href={link.url}>
                  <a target='_blank'>
                    <Image 
                      src={link.image}
                      height={30}
                      width={30}
                      alt={link.text}
                    />
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
        
        {/* newsletter form 
        <div>
          <h3>Bring the good vibes to your inbox</h3>
          <form id={styles.nlForm}>
            <input type="email" placeholder='your.email@gmail.com' />
            <button type="submit" className={utilsStyles.mainBtn}>{lang.newsletterButton}</button>
          </form>
          <p>Receive our weekly positive affirmations</p>
        </div>
        */}
      </div>
    </footer>
  )
}