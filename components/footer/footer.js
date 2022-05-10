import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Footer.module.css'


export default function Footer({ appName, lang }) {
  return (
    <footer id={styles.footer}>
      {/* nav links */}
      <div id={styles.footerNavLinks}>

        {lang.navLinks.map(link => {
          return <Link key={link.text} href={link.url}><a>{link.text}</a></Link>
        })}

        <p>{lang.copyright}</p>
        
      </div>

      <div>
        {/* social links */}
        <div>{lang.socialTitle}</div>
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
        
        {/* newsletter form */}
        <h3>{lang.newsletterTitle}</h3>
        <form id={styles.nlForm}>
          <input type="email" />
          <button type="submit">{lang.newsletterButton}</button>
        </form>
        
        <p>{lang.newsletterSubtitle}</p>

      </div>
    </footer>
  )
}