import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Context } from '../../context'
import styles from '../../styles/User.module.css'
import UserAstro from './userAstro'
import Head from 'next/head'
import UserNav from './userNav'
import UserHeader from './userHeader'
import UserActions from './userActions'


export default function UserLayout({ children }) {
  const { user } = useContext(Context)
  const router = useRouter()

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
            <Link href={`/user/${user.uid}`}><a>Feed</a></Link>
            <Link href={`/user/${user.uid}/profile`}><a>Profile</a></Link>
            <Link href={`/user/${user.uid}/chat`}><a>Chat</a></Link>
          </div>
          
          
          {children}
        </section>
      </main>
    </div>
  )
}