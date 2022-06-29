import Link from "next/link"
import Image from "next/image"
import styles from '../../styles/Feed.module.css'

export default function RedictBtn({ redirection }) {
  return (
    <Link href={redirection}>
      <a className={styles.pinUrl}>
        <Image 
          src="/icons/upper-right-arrow.png"
          alt="upper right arrow icon"
          height={10}
          width={10}
        />
        <span><b>{redirection}</b></span>
      </a>
    </Link>
  )
}