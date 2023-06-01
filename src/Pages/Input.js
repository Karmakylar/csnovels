import { useState } from "react"



const Input = ({setData,reducer}) => {


  const [fields, setFields] = useState('')

  const search = (e) => {
    e.preventDefault()
    const updatedData = [...reducer?.datadummy?.data].filter((item) => item.name.includes(fields))
    setData(updatedData)
  }


  return (
    <>
      
    </>
  )
}





export default Input


