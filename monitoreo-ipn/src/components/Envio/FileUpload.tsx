import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

import {
  UploadCloud,
  FileText,
  Trash2
} from "lucide-react"

function FileUpload() {

  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {

    setFiles((prev) => [
      ...prev,
      ...acceptedFiles
    ])

  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    multiple: true
  })

  return (
    <div>

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-10
          flex flex-col items-center justify-center
          cursor-pointer transition
          ${
            isDragActive
              ? "border-[#6A0032] bg-pink-50"
              : "border-gray-300 hover:border-[#6A0032]"
          }
        `}
      >

        <input {...getInputProps()} />

        <UploadCloud
          size={40}
          className="text-gray-400 mb-4"
        />

        <p className="text-gray-600 text-center">
          Arrastra y suelta archivos aquí o
          <span className="text-[#6A0032] font-semibold ml-1">
            selecciona archivos
          </span>
        </p>

        <p className="text-sm text-gray-400 mt-2">
          JPG, PNG, PDF, DOCX
        </p>

      </div>

      {/* PREVIEW */}
      {files.length > 0 && (

        <div className="mt-4 space-y-3">

          {files.map((file) => (

            <div
              key={file.name}
              className="
                flex items-center justify-between
                bg-gray-50 border rounded-xl p-4
              "
            >

              <div className="flex items-center gap-3">

                <FileText
                  size={20}
                  className="text-[#6A0032]"
                />

                <div>

                  <p className="text-sm font-medium">
                    {file.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setFiles(
                    files.filter(
                      (f) => f.name !== file.name
                    )
                  )
                }
                className="
                  text-red-500
                  hover:bg-red-50
                  p-2 rounded-lg
                "
              >

                <Trash2 size={18} />

              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default FileUpload