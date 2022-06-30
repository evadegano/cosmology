import { useRouter } from "next/router"
import { useContext } from 'react'
import { Context } from '../../context'
import useSWR from 'swr'
import Link from "next/link"
import Image from "next/image"
import styles from '../../styles/Feed.module.css'
import utilsStyles from '../../styles/utils.module.css'
import UserLayout from '../../components/user/userLayout'
import SaveBtn from "../../components/feed/saveBtn"
import LikeBtn from "../../components/feed/likeBtn"
import ShareBtn from '../../components/feed/shareBtn'
import RedictBtn from "../../components/feed/redirectBtn"


export default function PinPage() {
  const router = useRouter()
  const { id } = router.query
  const { pinPageData, setPinPageData } = useContext(Context)

  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pin/${id}`)

  // check for fetching error
  if (error) {
    setErrorMsg(error)

  } else if (data) {
    console.log("data:", data)

    // check for error message
    if (data.message) {
      setErrorMsg(data.message)
    } else {
      // get unique pin types
      setPinPageData(data.pin)
    }
  }

  console.log('pinPageData:', pinPageData)

  return (
    <UserLayout>
      {pinPageData &&
      <>
        <div id={styles.pinPage}>
          <button type='button' onClick={() => router.back()} className={utilsStyles.backBtn}>
            <Image 
              src="/icons/left-arrow_dark.png"
              alt="left arrow icon"
              width={15}
              height={15}
            />
            <span><b>Back</b></span>
          </button>

          <div id={styles.pinPage_inner}>
            <div id={styles.pinPage_header}>
              <RedictBtn redirection={pinPageData.redirection} background="#F4F4F4" />
              
              <div className={utilsStyles.inline_right}>
                <LikeBtn pin={pinPageData} />
                <SaveBtn pin={pinPageData} />
                {/*<ShareBtn pin={pinPageData} />*/}
              </div>
            </div>
            
            <div id={styles.pinPage_body}>
              <div id={styles.pinPage_img}>
                <Image
                  className={styles.pinImg}
                  src={pinPageData.pictureUrl}
                  width={1000}
                  height={1000}
                  alt={pinPageData.title}
                />
              </div>
              
              <div id={styles.pinPage_descr}>
                <h2>{pinPageData.title}</h2>
                <p>{pinPageData.description}</p>
              </div>
            </div>

          </div>
          
        </div>
      </>
      }
    </UserLayout>
  )
}