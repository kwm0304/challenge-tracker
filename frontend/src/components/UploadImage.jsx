import { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { useCallback } from "react"
import { submitImage } from "../api/authenticationService"
import { FaCameraRetro } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";


function UploadImage({ checklistId, user }) {
  const [image, setImage] = useState(null)
  console.log(image)

  const onDrop = useCallback((acceptedFiles) => {
    // const formData = new FormData();
    // formData.append("file", acceptedFiles[0]);
    // submitImage(user, checklistId, formData)
    // .then(() => {
    //   console.log("file uploaded successfully")
    // }).catch(() => {
    //   console.log("error uploading file")
    // })
  // }, [checklistId, user])
  if (acceptedFiles?.length === 1) {
    const uploadedFile = acceptedFiles[0]
    setImage(Object.assign(uploadedFile, { preview: URL.createObjectURL(uploadedFile) }))
  }
}, [])
  const {getRootProps, getInputProps} = useDropzone({ 
    onDrop 
  })

  const removeFile = () => {
    setImage(null)
  }

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview)
      }
    }
  }, [image])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return

    const formData = new FormData();
    formData.append("file", image);
    submitImage(user, checklistId, formData)
    .then(() => {
      console.log("file uploaded successfully")
    }).catch(() => {
      console.log("error uploading file")
    })
  }



  return (
    <form onSubmit={handleSubmit}>
    <div {...getRootProps()} className="bg-blue-500 rounded-xl w-12 h-12 mt-10 flex items-center justify-center ">
    <input {...getInputProps()} />
    <div className="relative">
    {image === null ? (
    <FaCameraRetro className="text-white text-2xl" />
    ) : (
      <>
    <img src={image.preview} 
    alt="preview" 
    className="w-full h-full rounded-xl"
    width={150}
    height={150}
    onLoad={() => {
      URL.revokeObjectURL(image.preview)
    }} />
    <button
      type="button"
      className="w-7 h-7 border border-red-500 bg-red-500 rounded-full flex justify-center items-center absolute -top-3 right-8"
      onClick={() => removeFile(image)}
    >
      <IoCloseCircleSharp className="w-6 h-6 fill-white hover:text-white hover:fill-red-500 transition-colors" />
    </button>
    </>
    )}
    </div>
  </div>
  </form>
  )
}

export default UploadImage
