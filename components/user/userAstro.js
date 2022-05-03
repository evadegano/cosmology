export default function UserAstro({ astroTitle, astroButtons }) {
  return (
    <section>
      <h2>{astroTitle}</h2>

      {astroButtons.map(btn => {
        return <button key={btn}>{btn}</button>
      })}
    </section>
  )
}