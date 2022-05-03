import Head from 'next/head'
import UserNav from '../components/user/userNav'
import UserHeader from '../components/user/userHeader'
import UserActions from '../components/user/userActions'
import UserAstro from '../components/user/userAstro'
import UserFeed from '../components/user/userFeed'
import UserChat from '../components/user/userChat'


export default function User({ lang }) {
  return (
    <div>
      <Head>
        <title>User profile</title>
      </Head>
      <UserNav navLinks={lang.userNavBar.navLinks} />

      <main>
        <UserHeader />
        <UserActions actionButtons={lang.profile.actionButtons} />
        <UserAstro astroTitle={lang.profile.astroTitle} astroButtons={lang.profile.astroButtons} />

        <section>
          <UserFeed profileButtons={lang.profile.profileButtons} feedButtons={lang.profile.feedButtons} />
          <UserChat profileButtons={lang.profile.profileButtons} />
        </section>
      </main>
    </div>
  )
}