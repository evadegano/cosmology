import React, { useContext } from 'react'
import { Context } from '../context'
import Layout, { appName } from '../components/sitewide/layout'
import HomeHeader from '../components/homepage/homeHeader'
import HomeSectionIntro from '../components/homepage/homeSectionIntro'


export default function Home({ userForm, setUserForm }) {  
  const { lang } = useContext(Context)

  return (
    <Layout lang={lang}>
      <main>
        <HomeHeader appName={appName} lang={lang.home} goals={lang.goals} userForm={userForm} setUserForm={setUserForm} />
        <HomeSectionIntro appName={appName} lang={lang.home} />
      </main>
    </Layout>
  )
}
