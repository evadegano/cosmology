export default function UserActions({ actionButtons }) {
  return (
    <div>
      {actionButtons.map(btn => {
        return <button key={btn}>{btn}</button>
      })}
    </div>
  )
}