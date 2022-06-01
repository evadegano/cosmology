import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Feed.module.css'


export default function Pin({ pin }) {
  return (
    <Link href={pin.redirection}>
      <a>
        <Image
          className={styles.pinImg}
          src={pin.pictureUrl}
          alt={pin.title}
          width={500}
          height={500}
        />

        <h2>{pin.title}</h2>
        <p className={styles.pinDesc}><span>{pin.description}</span></p>
      </a>
    </Link>
  )
}