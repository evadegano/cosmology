import Link from 'next/link'
import { useContext } from 'react'
import { Context } from '../../context'
import { useRouter } from 'next/router'
import utilsStyles from '../../styles/utils.module.css'
import styles from '../../styles/User.module.css'
import UserAstro from './userAstro'
import Head from 'next/head'
import UserNav from './userNav'
import UserHeader from './userHeader'


export default function UserLayout({ children }) {
  const router = useRouter()
  const { user } = useContext(Context)
  console.log('user in feed:', user)

  console.log("url:", router.pathname)

  return (
    <div>
      {user && 
        <>
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
          <div id={styles.mainContent_title}>
            <Link href={`${user ? "/user/" + user.uid : "#"}`}>
              <a className={`${router.pathname ==  "/user/[id]" ? styles.activeNav : ""}`}>
                <b>Feed</b>
              </a>
            </Link>
            <Link href={`${user ? "/user/" + user.uid + "/profile" : "#"}`}>
              <a className={`${router.pathname ==  "/user/[id]/profile" ? styles.activeNav : ""}`}>
                <b>Saved Pins</b>
              </a>
            </Link>
            <Link href={`${user ? "/user/" + user.uid + "/chat" : "#"}`}>
              <a className={`${router.pathname ==  "/user/[id]/chat" ? styles.activeNav : ""}`}>
                <b>Chat</b>
              </a>
            </Link>
          </div>
          
          {children}
        </section>
      </main>
        </>
      }
    </div>
  )
}