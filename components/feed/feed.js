import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Context } from '../../context'
import useSWR from 'swr'
import PinMasonry from "./pinMasonry"


export default function Feed() {
  const router = useRouter()
  const { user } = useContext(Context)
  let pinTypes, filteredPins

  // fetch data from api
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.uid}/pin?lang=en`)

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
      const allTypes = []
      data.pins.map(pin => {
        pin.types.map(type => {
          allTypes.push(type.type)
        })
      })
      pinTypes = [...new Set(allTypes)]
  
      filteredPins = data.pins
    }
  }
  
  return (
    <div>
      <PinMasonry 
        inTypes={pinTypes}
        filteredPins={filteredPins} 
        data={data}
      />
    </div>
   )
}