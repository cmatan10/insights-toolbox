import { useState } from "react";
import { Upload, CheckCircle, XCircle } from "lucide-react";

const PdfUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

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
      // Simulate upload success
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    } else {
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Upload PDFs</h2>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
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
            className={`w-12 h-12 mb-4 ${
              isDragging ? "text-primary" : "text-gray-400"
            }`}
          />
          <p className="text-lg font-medium mb-2">
            Drag & drop PDFs here or click to browse
          </p>
          <p className="text-sm text-gray-500">Supported format: PDF</p>
        </label>
      </div>

      {uploadStatus !== "idle" && (
        <div
          className={`mt-4 p-4 rounded-lg flex items-center space-x-2 animate-fadeIn ${
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