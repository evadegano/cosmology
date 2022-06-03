import { useContext } from 'react'
import { Context } from '../../context'
import useSWR from 'swr'
import PinMasonry from "../../components/feed/pinMasonry"


export default function SavedPins() {
  const { user } = useContext(Context)
  let pinTypes, filteredPins = []

  // fetch data from api
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.uid}/savedpin`)

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
        filteredPins.push(pin.pin)

        pin.pin.types.map(type => {
          allTypes.push(type.type)
        })
      })
      pinTypes = [...new Set(allTypes)]
  
      console.log(filteredPins)
    }
  }

  return (
    <div>
      <PinMasonry 
        pinTypes={pinTypes}
        filteredPins={filteredPins} 
        data={data} />
    </div>
  )
}