import Link from "next/link"


export default function FormNav({ appName}) {
  retun (
    <nav>
      <Link href='#'><a>back</a></Link>
      <Link href='#'><a>{appName}</a></Link>
      <Link href='#'><a>exit</a></Link>
    </nav>
  )
}