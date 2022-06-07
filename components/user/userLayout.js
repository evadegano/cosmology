import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Context } from '../../context'
import styles from '../../styles/User.module.css'
import UserAstro from './userAstro'
import Head from 'next/head'
import UserNav from './userNav'
import UserHeader from './userHeader'


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
            <UserNav />

            <div>
              <UserHeader/>
              <UserAstro/>
            </div>
          </div>
          
        </section>
        
        <section id={styles.mainContent}>
          <div>
            <Link href={`/user/${user.uid}`}><a>Feed</a></Link>
            <Link href={`/user/${user.uid}/profile`}><a>Saved Pins</a></Link>
            <Link href={`/user/${user.uid}/chat`}><a>Chat</a></Link>
          </div>
          
          
          {children}
        </section>
      </main>
    </div>
  )
}