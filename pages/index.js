import React, { useContext } from 'react'
import Router from 'next/router'
import { Context } from '../context'
import Layout, { appName } from '../components/sitewide/layout'
import HomeHeader from '../components/homepage/homeHeader'
import HomeSectionIntro from '../components/homepage/homeSectionIntro'


export async function getServerSideProps(context) {
  try {
    // fetch goals from db
    const goalsRes = await fetch('http://localhost:3000//api/goal?lang=en', ({
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      }
    }))
    const goalsResData = await goalsRes.json()

    if (goalsResData.message) {
      console.log("error:", goalsResData.message)
      // return error as props
      return {
        props: {
          error: JSON.stringify(goalsResData.message)
        }
      } 
    }

    return {
      props: {
        goals: JSON.stringify(goalsResData.goals)
      }
    }

  } catch(err) {
    // return error as props
    return {
      props: {
        error: JSON.stringify(err.message)
      }
    } 
  }
  
}


export default function Home({ goals }) {  
  const { lang, user } = useContext(Context)

  console.log('user:', user);

  // if user is logged in, redirect them to their profile
  if (user) {
    Router.push(`/user/${user.uid}`)
  }

  return (
    <Layout lang={lang}>
      <main>
        <HomeHeader appName={appName} goals={goals} />
        <HomeSectionIntro appName={appName} />
      </main>
    </Layout>
  )
}
