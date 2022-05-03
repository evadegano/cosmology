import Link from "next/link"
import Image from "next/image"


export default function UserNav({ navLinks }) {
  return (
    <nav>
      <div>logo</div>
      {navLinks.map(link => {
        return <Link key={link.url} href={link.url}><a>{link.text}</a></Link>
      })}
    </nav>
  )
}