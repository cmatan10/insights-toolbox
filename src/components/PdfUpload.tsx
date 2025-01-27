import { useState } from "react";
import { Upload, CheckCircle, XCircle } from "lucide-react";

const PdfUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  
  // Mock server status - replace with actual server status check
  const serverStatus = "online"; // or "offline"

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter((file) => file.type === "application/pdf");
    if (pdfFiles.length > 0) {
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    } else {
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  return (
    <div className="glass-card rounded-lg p-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upload PDFs</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Server Status:</span>
          <div
            className={`w-3 h-3 rounded-full ${
              serverStatus === "online"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
        </div>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/50"
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload
            className={`w-10 h-10 mb-3 ${
              isDragging ? "text-primary" : "text-gray-400"
            }`}
          />
          <p className="text-base font-medium mb-1">
            Drag & drop PDFs here or click to browse
          </p>
          <p className="text-sm text-gray-500">Supported format: PDF</p>
        </label>
      </div>

      {uploadStatus !== "idle" && (
        <div
          className={`mt-4 p-3 rounded-lg flex items-center space-x-2 animate-fadeIn ${
            uploadStatus === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {uploadStatus === "success" ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Files uploaded successfully!</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5" />
              <span>Please upload PDF files only.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfUpload;