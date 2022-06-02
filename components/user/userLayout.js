import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/User.module.css'
import UserAstro from './userAstro'
import Head from 'next/head'
import UserNav from './userNav'
import UserHeader from './userHeader'
import UserActions from './userActions'


export default function UserLayout({ children }) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>User profile</title>
      </Head>
      
      <main id={styles.userLayout}>
        <section id={styles.sideNavWrapper}>
          <div id={styles.sideNav}>
            <UserNav/>
            <UserHeader />
            <UserActions/>
            <UserAstro/>
          </div>
          
        </section>
        
        <section id={styles.mainContent}>
          <div>
            <Link href={`/user/${id}`}><a>Feed</a></Link>
            <Link href={`/user/${id}/profile`}><a>Profile</a></Link>
            <Link href={`/user/${id}/chat`}><a>Chat</a></Link>
          </div>
          
          
          {children}
        </section>
      </main>
    </div>
  )
}