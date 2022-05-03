export default function UserFeed({ profileButtons, feedButtons }) {
  return (
    <div>
      <div>
        {profileButtons.map(btn => {
          return <button key={btn}>{btn}</button>
        })}
      </div>

      <div>
        {feedButtons.map(btn => {
          return <button key={btn}>{btn}</button>
        })}
      </div>
    </div>
  )
}