import Image from "next/image"


export default function UserHeader() {
  return (
    <header>
      <Image
        src="/images/profile.png"
        height={144}
        width={144}
        alt="Your Name"
      />

      <h1>user name</h1>

      <div>
        loop through signs
      </div>
    </header>
  )
}