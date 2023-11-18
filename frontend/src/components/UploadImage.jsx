import { useDropzone } from "react-dropzone"
import { useCallback } from "react"
import { submitImage } from "../api/authenticationService"
import { FaCameraRetro } from "react-icons/fa6";

function UploadImage({ checklistId, user }) {
  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    submitImage(user, checklistId, formData)
    .then(() => {
      console.log("file uploaded successfully")
    }).catch(() => {
      console.log("error uploading file")
    })
  }, [checklistId, user])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <FaCameraRetro className="text-amber-300 text-2xl ml-3"> 
      <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
    </FaCameraRetro>
  )
}

export default UploadImage
