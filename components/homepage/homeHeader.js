import Router from 'next/router'
import { useContext } from 'react'
import { Context } from '../../context'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import utilsStyles from '../../styles/utils.module.css'
import HomeNav from './homeNav'


export default function HomeHeader({ appName, goals }) {
  const { lang, userForm, setUserForm, errorMsg, setErrorMsg } = useContext(Context)
  goals = JSON.parse(goals)
  
  const handleChange = (event) => {
    const target = event.target;
    const goalsCopy = [...userForm.goals]

    console.log('goalsCopy:', goalsCopy);

    if (target.checked) {
      goalsCopy.push(target.value)
    } else {
      goalsCopy = goalsCopy.filter(goal => goal !== target.value)
    }
    
    setUserForm(prev => ({ ...prev, goals: goalsCopy }))
  }

  const handleClick = () => {
    // display error message if no goal was selected
    if (userForm.goals.length === 0) {
      setErrorMsg('Please select at least one goal.')
    
    // else redirect user to the user form
    } else {
      Router.push('/mygoals')
    }
  }

  return (
    <header id={styles.homeHeader}>
      <div>
        <HomeNav navLinks={lang.home.navLinks} />
        
        <div id={styles.headerIntro}>
          <Image 
            src='/logo.png'
            width={1563/3.5}
            height={377/3.5}
            alt={appName}
          />

          <h2 className={utilsStyles.serif} id={styles.homeSubTitle}>{lang.home.headerSubtitle}</h2>
          <p>At Cosmology, we curate spiritual content based on your goals and birthchart to assist you in living a more purposeful life.</p>

          <h3 className={utilsStyles.serif}>What are your goals?</h3>
          <form id={styles.goalForm}>
            
            {goals.map(goal => {
              return (
                <label key={goal.id}>
                  <input onChange={handleChange} type='checkbox' value={goal.id} name={goal.goal} />
                  <span>{goal.goal}</span>
                </label>
                )
            })}
          </form>
          <button className={utilsStyles.mainBtn} onClick={handleClick}>Get started (it&rsquo;s free)</button>

          {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
        </div>
      </div>
      
      <div id={styles.homeHeaderImgWrapper}>
        <Image
          src="/images/desk_header_img.png"
          layout='fill'
          objectFit='contain'
          alt=""
        />
      </div>
    </header>
  )
}