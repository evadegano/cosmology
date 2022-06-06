import Router from 'next/router'
import { useContext } from 'react'
import { Context } from '../../context'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import utilsStyles from '../../styles/utils.module.css'
import HomeNav from './homeNav'


export default function HomeHeader({ appName }) {
  const { lang, userForm, setUserForm, errorMsg, setErrorMsg } = useContext(Context)
  
  const handleChange = (event) => {
    const target = event.target;
    const goalsCopy = [...userForm.goals]

    if (target.checked) {
      goalsCopy.push(target.value)
    } else {
      goalsCopy = goalsCopy.filter(goal => goal !== target.value)
    }
    
    console.log('goalsCopy:', goalsCopy)
    setUserForm(prev => ({ ...prev, goals: goalsCopy }))
  }

  const handleClick = () => {
    // display error message if no goal was selected
    if (userForm.goals.length === 0) {
      setErrorMsg('Please select at least one goal.')
    
    // else redirect user to the user form
    } else {
      // store goals in local storage
      localStorage.setItem("goals", userForm.goals)
      console.log('localStorage:', localStorage)

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
          <button className={utilsStyles.mainBtn} onClick={handleClick}>Get started <i>*it&rsquo;s free</i></button>

          {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
        </div>
      </div>
      
      <div id={styles.homeHeaderImgWrapper}>
        <Image
          src="/images/desk_header_img.png"
          layout='fill'
          objectFit='contain'
          alt=""
          priority={true}
        />
      </div>
    </header>
  )
}

const goals = [
  {
      id: 1,
      goal: "weight loss"
  },
  {
      id: 2,
      goal: "mental toughness"
  },
  {
      id: 3,
      goal: "gifts and intuition"
  },
  {
      id: 4,
      goal: "earning more money"
  },
  {
      id: 5,
      goal: "life purpose"
  },
  {
      id: 10,
      goal: "clarity"
  },
  {
      id: 12,
      goal: "positivity"
  },
  {
      id: 13,
      goal: "finding love"
  },
  {
      id: 14,
      goal: "relationship improvement"
  },
  {
      id: 15,
      goal: "physical healing"
  },
  {
      id: 16,
      goal: "reducing pms"
  },
  {
      id: 17,
      goal: "focus"
  },
  {
      id: 18,
      goal: "productivity"
  },
  {
      id: 19,
      goal: "friendships"
  },
  {
      id: 20,
      goal: "fertility"
  },
  {
      id: 21,
      goal: "confidence"
  },
  {
      id: 22,
      goal: "self care"
  },
  {
      id: 23,
      goal: "mindfulness"
  }
]