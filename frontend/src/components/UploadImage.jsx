import { useDropzone } from "react-dropzone"
import { useCallback } from "react"
import { submitImage } from "../api/authenticationService"

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
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default UploadImage
