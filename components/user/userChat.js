export default function UserChat({ profileButtons }) {
  return (
    <div>
      <div>
        {profileButtons.map(btn => {
          return <button key={btn}>{btn}</button>
        })}
      </div>
    </div>
  )
}