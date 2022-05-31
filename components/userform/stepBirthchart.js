import { useContext } from 'react'
import { Context } from '../../context'
import utilsStyles from '../../styles/utils.module.css'


export default function StepBirthchart({ next, prev }) {
  const { lang, birthchart } = useContext(Context)

  return (
    <div>
      <h1>We calculated your birthchart</h1>

      <p>Sun sign: {birthchart.sunSign}</p>
      <p>Moon sign: {birthchart.moonSign}</p>
      <p>Rising sign: {birthchart.risingSign}</p>
      <p>and more...</p>

      <p>That&rsquo;s so awesome!</p>

      <div>
        <button className={utilsStyles.mainBtn} onClick={prev}>Go back, I made a mistake</button>
        <button className={utilsStyles.mainBtn} onClick={next}>Next</button>
      </div>
      
    </div>
  )
}