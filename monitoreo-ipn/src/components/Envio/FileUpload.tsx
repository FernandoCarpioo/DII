import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, FileText, Trash2 } from "lucide-react"

interface FileUploadProps {
  onChangeFiles: (uploadedFiles: File[]) => void;
}

function FileUpload({ onChangeFiles }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => {
      const updatedFiles = [...prev, ...acceptedFiles];
      onChangeFiles(updatedFiles); // Notifica al componente padre
      return updatedFiles;
    })
  }, [onChangeFiles])

  const handleRemoveFile = (fileName: string) => {
    const updatedFiles = files.filter((f) => f.name !== fileName);
    setFiles(updatedFiles);
    onChangeFiles(updatedFiles); // Notifica al componente padre de la remoción
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 10 * 1024 * 1024 // Control físico de 10 MB por archivo
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

        <p className="text-gray-600 text-center text-sm">
          Arrastra y suelta archivos aquí o
          <span className="text-[#6A0032] font-semibold ml-1">
            selecciona archivos
          </span>
        </p>

        <p className="text-xs text-gray-400 mt-2">
          JPG, PNG, PDF, DOCX
        </p>
      </div>

      {/* PREVIEW */}
      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between bg-gray-50 border rounded-xl p-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText
                  size={20}
                  className="text-[#6A0032] shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveFile(file.name)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
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