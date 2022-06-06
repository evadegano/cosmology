import Image from 'next/image'
import { useContext } from 'react'
import { Context } from '../../context'
import styles from '../../styles/UserForm.module.css'
import utilsStyles from '../../styles/utils.module.css'


export default function StepBirthchart({ next, prev }) {
  const { lang } = useContext(Context)
  const sunSign = localStorage.getItem('sunSign')
  const moonSign = localStorage.getItem('moonSign')
  const risingSign = localStorage.getItem('risingSign')

  return (
    <div>
      <h1>We calculated your birthchart</h1>
      <p className={utilsStyles.subtitle + " " + utilsStyles.serif}>Your main signs are...</p>

      <div className={utilsStyles.flexCol}>
        <table>
          <tbody>
            <tr>
              <td>
                <Image 
                  src='/astro/sun.png'
                  width={30}
                  height={30}
                  alt='sun astrological symbol'
                />
              </td>
              <td>{sunSign}</td>
            </tr>

            <tr>
              <td>
              <Image 
            src='/astro/moon.png'
            width={30}
            height={30}
            alt='moon astrological symbol'
          />
              </td>
              <td>{moonSign}</td>
            </tr>

            <tr>
              <td>
              <Image 
            src='/astro/rising.png'
            width={30}
            height={30}
            alt='rising astrological symbol'
          />
              </td>
              <td>{risingSign}</td>
            </tr>
          </tbody>
        </table>

        <p>But we&rsquo;ve got so much more to tell you, we can&rsquo;t wait!</p>
      </div>

      <div className={utilsStyles.inline_centered}>
        <button className={utilsStyles.secondaryBtn} onClick={prev}>Go back, I made a mistake</button>
        <button className={utilsStyles.mainBtn} onClick={next}>Next</button>
      </div>
      
    </div>
  )
}