import Image from 'next/image'
import { useContext } from 'react'
import { Context } from '../../context'
import styles from '../../styles/UserForm.module.css'
import utilsStyles from '../../styles/utils.module.css'


export default function StepBirthchart({ next, prev, astroMsg }) {
  const { lang } = useContext(Context)
  const sunSign = localStorage.getItem('sunSign')
  const moonSign = localStorage.getItem('moonSign')
  const risingSign = localStorage.getItem('risingSign')

  return (
    <div>
      <h1>We calculated your birthchart</h1>
      <p className={utilsStyles.subtitle + " " + utilsStyles.serif}>Those are your main signs but we&rsquo;ve got more</p>

      <div className={utilsStyles.flexCol}>
        <div className={utilsStyles.inline_centered}>
          <Image 
            src='/astro/sun.png'
            width={30}
            height={30}
            alt='sun astrological symbol'
          />
          {sunSign}
        </div>

        <div className={utilsStyles.inline_centered}>
          <Image 
            src='/astro/moon.png'
            width={30}
            height={30}
            alt='sun astrological symbol'
          />
          {moonSign}
        </div>

        <div className={utilsStyles.inline_centered}>
          <Image 
            src='/astro/rising.png'
            width={30}
            height={30}
            alt='sun astrological symbol'
          />
          {risingSign}
        </div>

        <p>We&rsquo;ve got so much more to tell you, we can&rsquo;t wait!</p>
      </div>

      <div className={utilsStyles.inline_centered}>
        <button className={utilsStyles.secondaryBtn} onClick={prev}>Go back, I made a mistake</button>
        <button className={utilsStyles.mainBtn} onClick={next}>Next</button>
      </div>
      
    </div>
  )
}


const astroMsg = [
  {
    sign: "",
    msg: ""
  }
]