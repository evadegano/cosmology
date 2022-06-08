import React, { useContext } from 'react'
import Router from 'next/router'
import { Context } from '../context'
import Layout, { appName } from '../components/sitewide/layout'
import HomeHeader from '../components/homepage/homeHeader'
import HomeSectionIntro from '../components/homepage/homeSectionIntro'


export default function Home() {  
  const { lang, user } = useContext(Context)

  sessionStorage.setItem('currentStep', 0)

  // if user is logged in, redirect them to their profile
  if (user) {
    Router.push(`/user/${user.uid}`)
  }

  return (
    <Layout>
      <main>
        <HomeHeader appName={appName} />
        <HomeSectionIntro appName={appName} />
      </main>
    </Layout>
  )
}
