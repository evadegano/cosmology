import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/User.module.css'
import UserAstro from './userAstro'
import Head from 'next/head'
import UserNav from './userNav'
import UserHeader from './userHeader'
import UserActions from './userActions'



export default function UserLayout({ lang, children }) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>User profile</title>
      </Head>
      
      <main id={styles.userLayout}>
        <section id={styles.sideNav}>
          <UserNav navLinks={lang.userNavBar.navLinks} />
          <UserHeader />
          <UserActions actionButtons={lang.profile.actionButtons} />
          <UserAstro astroTitle={lang.profile.astroTitle} astroButtons={lang.profile.astroButtons} />
        </section>
        
        <section id={styles.mainContent}>
          <div>
            <Link href={`/user/${id}`}><a>Feed</a></Link>
            <Link href={`/user/${id}/chat`}><a>Chat</a></Link>
          </div>
          
          
          {children}
        </section>
      </main>
    </div>
  )
}