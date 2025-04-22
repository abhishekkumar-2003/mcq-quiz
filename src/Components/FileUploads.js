import React, { useState } from 'react';
import { extractTextFromPdf } from '../utils/pdfExtractor';
import '../styles/FileUpload.css';

function FileUpload({ onFileContent }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setUploadError(null);
    } else {
      setFile(null);
      setUploadError('Please select a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a PDF file first.');
      return;
    }

    setIsProcessing(true);
    setUploadError(null);

    try {
      const extractedText = await extractTextFromPdf(file);
      if (extractedText.trim()) {
        onFileContent(extractedText);
      } else {
        setUploadError('Could not extract text from the PDF. Please try another file.');
      }
    } catch (err) {
      setUploadError('Error processing PDF: ' + err.message);
      console.error('PDF extraction error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="file-upload">
      <h3>Upload a PDF</h3>
      <div className="upload-container">
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange} 
          id="file-input"
          className="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          {file ? file.name : 'Choose PDF File'}
        </label>
        <button 
          onClick={handleUpload} 
          disabled={!file || isProcessing}
          className="upload-button"
        >
          {isProcessing ? 'Processing...' : 'Upload & Generate Quiz'}
        </button>
      </div>
      {uploadError && <div className="upload-error">{uploadError}</div>}
      {file && !uploadError && (
        <div className="file-info">
          <p>Selected file: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;