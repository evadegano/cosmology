export default function StepBirthchart({ birthchart }) {
  return (
    <div>
      <h1>We calculated your birthchart</h1>

      <p>Sun sign: {birthchart.sunSign}</p>
      <p>Moon sign: {birthchart.moonSign}</p>
      <p>Rising sign: {birthchart.risingSign}</p>

      <p>That&rsquos so awesome!</p>

      <button>Go back, I made a mistake</button>
      <button>Next</button>
    </div>
  )
}