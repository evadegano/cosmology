import { useRouter } from "next/router"
import { useContext } from 'react'
import { Context } from '../../context'
import Link from "next/link"
import Image from "next/image"
import styles from '../../styles/Feed.module.css'
import UserLayout from '../../components/user/userLayout'
import SaveBtn from "../../components/feed/saveBtn"
import LikeBtn from "../../components/feed/likeBtn"
import ShareBtn from '../../components/feed/shareBtn'


export default function PinPage() {
  const router = useRouter()
  const { pinPageData } = useContext(Context)

  console.log('pinPageData', pinPageData)

  return (
    <UserLayout>
      <div>
        <button type='button' onClick={() => router.back()}>← Back</button>

        <div>
          <div className={styles.pinUrl}>
            <Link href={pinPageData.redirection}><a>{pinPageData.redirection}</a></Link>
          </div>
          
          <LikeBtn pin={pinPageData} />
          <SaveBtn pin={pinPageData} />
          <ShareBtn pin={pinPageData} />
        </div>
        
        <div>
          <Image
            src={pinPageData.pictureUrl}
            width={500}
            height={500}
            alt={pinPageData.title}
          />
        </div>

        <h2>{pinPageData.title}</h2>
        <p>{pinPageData.description}</p>
      </div>
    </UserLayout>
  )
}