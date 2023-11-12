import { useEffect, useState } from "react"
import { getUserContent } from "../service/userService"

const Checklist = () => {
  const [content, setContent] = useState('')
  useEffect(() => {
    getUserContent()
    .then((response) => {
      console.log(response)
      setContent(response.data);
    
    })
  })
  return (
    <div>
      <h1>Checklist</h1>
      <p>Content: {content}</p>
    </div>
  )
}

export default Checklist