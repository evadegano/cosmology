import Link from 'next/link'
import styles from '../../styles/Footer.module.css'


export default function Footer({ navLinks, socialTitle, newsletterText, newsletterButton }) {
  return (
    <footer id={styles.footer}>
      {/* nav links */}
      <div id={styles.footerNavLinks}>

        {navLinks.map(link => {
          return <Link key={link.text} href={link.url}><a>{link.text}</a></Link>
        })}
        
      </div>

      <div>
        {/* social links */}
        <div>{socialTitle}</div>

        {/* newsletter form */}
        <form>
          <input type="email" />
          <button type="submit">{newsletterButton}</button>
        </form>
        <p>{newsletterText}</p>
      </div>
    </footer>
  )
}