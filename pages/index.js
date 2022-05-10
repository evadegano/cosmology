import Layout, { appName } from '../components/sitewide/layout'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import HomeHeader from '../components/homepage/homeHeader'
import HomeSectionIntro from '../components/homepage/homeSectionIntro'


export default function Home({ lang }) {
  const { data: session } = useSession()
  console.log('session:', session)

  const [userForm, setUserForm] = useState({
    goals: [],
    birthDate: "",
    birthTime: "",
    birthLoc: "",
    gender: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  })
  
  return (
    <Layout lang={lang}>
      <main>
        <HomeHeader appName={appName} lang={lang.home} goals={lang.goals} userForm={userForm} setUserForm={setUserForm} />
        <HomeSectionIntro appName={appName} lang={lang.home} />
      </main>
    </Layout>
  )
}
