import Layout, { appName } from '../components/sitewide/layout'
import { useSession } from 'next-auth/react'
import HomeHeader from '../components/homepage/homeHeader'
import HomeSectionIntro from '../components/homepage/homeSectionIntro'
import HomeNav from '../components/homepage/homeNav'


export default function Home({ lang }) {
  const { data: session } = useSession()
  console.log('session:', session)
  
  return (
    <Layout lang={lang}>
      <HomeNav navLinks={lang.home.navLinks} />

      <main>
        <HomeHeader appName={appName} headerText={lang.home.headerText} />
        <HomeSectionIntro sectionOneTitle={lang.home.sectionOneTitle} sectionOneText={lang.home.sectionOneText} />
      </main>
    </Layout>
  )
}
