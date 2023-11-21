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
    <div {...getRootProps()} className="bg-blue-500 rounded-xl w-12 h-12 mt-10 flex items-center justify-center ">
    <input {...getInputProps()} />
    <FaCameraRetro className="text-white text-2xl" />
  </div>
  )
}

export default UploadImage
