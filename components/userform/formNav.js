import { useContext } from 'react'
import { Context } from '../../context'
import styles from '../../styles/UserForm.module.css'
import utilsStyles from '../../styles/utils.module.css'
import Link from "next/link"
import Image from 'next/image'


export default function FormNav({ prev, setFirstLoad }) {
  const { setUserForm } = useContext(Context)

  return (
    <nav id={styles.formNav}>
      <button type='button' onClick={prev}>
        <Image 
            src='/icons/left-arrow_dark.png'
            width={128/6}
            height={128/6}
            alt='left arrow icon'
          />

        Back
      </button>

      <Link href='/'>
        <a onClick={() => { 
            setUserForm('')
            setFirstLoad(true)
          }}>
          <Image 
            src='/logo.png'
            width={1563/8.5}
            height={377/8.5}
            alt='Cosmology'
          />
        </a>
      </Link>
      <Link href='/login'><a>Sign in</a></Link>
    </nav>
  )
}