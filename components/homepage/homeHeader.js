import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import utilsStyles from '../../styles/utils.module.css'
import HomeNav from './homeNav'


export default function HomeHeader({ appName, lang, goals, userForm, setUserForm }) {
  const handleChange = (event) => {
    const target = event.target;
    const goalsCopy = [...userForm.goals]

    if (target.checked) {
      goalsCopy.push(target.value)
    } else {
      goalsCopy = goalsCopy.filter(goal => goal !== target.value)
    }
    
    setUserForm(prev => ({ ...prev, goals: goalsCopy }))
  }

  return (
    <header id={styles.homeHeader}>
      <div id={styles.headerIntro}>
        <HomeNav navLinks={lang.navLinks} />
        <h1 className={utilsStyles.accent} id={styles.homeTitle}>{appName}</h1>
        <h2 className={utilsStyles.serif} id={styles.homeSubTitle}>{lang.headerText}</h2>
        <p>Whatever your goals are, our mission is to help you live a more purposeful life</p>

        <p>What are your goals?</p>
        <form id={styles.goalForm}>
          
          {goals.map(goal => {
            return (
              <label key={goal}>
                <input onChange={handleChange} type='checkbox' value={goal} name={goal} />
                <span>{goal}</span>
              </label>
              )
          })}
        </form>

        <Link href='/mygoals'><a className={utilsStyles.mainBtn}>Get started</a></Link>
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