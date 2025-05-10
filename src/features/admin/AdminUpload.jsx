import { useState, useRef } from "react";
import { Upload, X, FileText, File, CheckCircle } from "lucide-react";
import Logo from "../../ui/Logo";
import SpecialText from "../../ui/SpecialText";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { uploadFiles } from "../../services/apiChatbot";
import { logout } from "../../authentication/userSlice";

export default function AdminUpload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (selectedFiles) => {
    const validFiles = selectedFiles.filter((file) => {
      const fileType = file.type;
      return (
        fileType === "application/pdf" ||
        fileType === "application/msword" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "text/html"
      );
    });

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    // Mock API call
    try {
      await uploadFiles(files);
      console.log("Files uploaded successfully");
      setUploadComplete(true);
      setTimeout(() => {
        setFiles([]);
        setUploadComplete(false);
      }, 3000);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) {
      return (
        <FileText
          className='text-red-500'
          size={24}
        />
      );
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return (
        <FileText
          className='text-blue-500'
          size={24}
        />
      );
    } else if (fileType.includes("html")) {
      return (
        <FileText
          className='text-orange-400'
          size={24}
        />
      );
    }
    return (
      <File
        className='text-gray-500'
        size={24}
      />
    );
  };

  const getFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  function handleLogout() {
    console.log("logout");
    dispatch(logout());
  }
  return (
    <div className='flex flex-col min-h-screen bg-[#192836] text-gray-100'>
      <header className='flex items-center justify-between bg-[#192836] p-4 border-b border-gray-700'>
        <SpecialText>FinAdvisor</SpecialText>
        {/* <Logo className='h-24' /> */}
        <div className='text-4xl'>🤖</div>
        <div className='space-x-4'>
          <Button
            type='primary'
            to='/chatbot/new'
            className=' text-stone-200 bg-gray-800 hover:bg-gray-600 transition-all duration-300 p-3 rounded-md'
          >
            Chatbot {<span>&rarr;</span>}
          </Button>
          <Button
            //   type='primary'
            onClick={handleLogout}
            className=' text-stone-200 bg-gray-800 hover:bg-gray-600 transition-all duration-300 p-3 rounded-md'
          >
            Logout
          </Button>
        </div>
      </header>
      <div className='flex-1 container mx-auto px-4 py-8 max-w-5xl'>
        <div className='mb-10'>
          <h1 className='text-3xl font-bold text-white mb-2'>
            File Upload Dashboard
          </h1>
          <p className='text-gray-400'>
            Upload PDF, Word, or HTML files to the system
          </p>
        </div>

        <div className='mb-8'>
          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
              isDragging
                ? "border-blue-500 bg-blue-500 bg-opacity-10"
                : "border-gray-600 hover:border-blue-400"
            }`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              onChange={handleFileChange}
              multiple
              accept='.pdf,.doc,.docx,.html'
            />
            <Upload
              size={40}
              className='text-blue-500 mb-4'
            />
            <h2 className='text-xl font-semibold mb-2'>
              Drag and drop files here
            </h2>
            <p className='text-gray-400 mb-4'>Or click to browse your files</p>
            <p className='text-sm text-gray-500'>
              Supported formats: PDF, Word, HTML
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-xl font-semibold mb-4 text-white'>
              Selected Files ({files.length})
            </h2>
            <div className='space-y-3'>
              {files.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between bg-gray-800 rounded-lg p-4'
                >
                  <div className='flex items-center'>
                    {getFileIcon(file.type)}
                    <div className='ml-3'>
                      <p className='font-medium text-white'>{file.name}</p>
                      <p className='text-sm text-gray-400'>
                        {getFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className='text-gray-400 hover:text-red-500 transition-colors'
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='flex justify-end'>
          <button
            onClick={handleSubmit}
            disabled={files.length === 0 || isUploading}
            className={`flex items-center py-3 px-6 rounded-lg font-medium transition-all ${
              files.length === 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : isUploading
                ? "bg-blue-600 text-white cursor-wait"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isUploading ? (
              <>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                Uploading...
              </>
            ) : uploadComplete ? (
              <>
                <CheckCircle
                  size={20}
                  className='mr-2'
                />
                Upload Complete
              </>
            ) : (
              <>
                <Upload
                  size={20}
                  className='mr-2'
                />
                Upload Files
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
