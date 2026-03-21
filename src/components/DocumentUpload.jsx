import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { paperService } from '../services/apiService';
import { usePaperStore } from '../context/store';
import { FiUpload, FiX } from 'react-icons/fi';

export const DocumentUpload = ({ onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { addPaper } = usePaperStore();

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      toast.error('Please drop a valid file');
      return;
    }

    const file = acceptedFiles[0];

    // Validate file size (50MB)
    if (file.size > 52428800) {
      toast.error('File size exceeds 50MB limit');
      return;
    }

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Only PDF, DOCX, and TXT are supported');
      return;
    }

    setIsUploading(true);
    try {
      const response = await paperService.uploadPaper(file);
      addPaper(response.data);
      toast.success('Paper uploaded and processed successfully');
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Failed to upload paper');
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Upload Research Paper</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
            isDragActive
              ? 'border-primary bg-blue-50'
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} accept=".pdf,.docx,.txt,.doc" />
          <FiUpload size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold text-gray-700 mb-2">
            {isDragActive ? 'Drop your paper here' : 'Drag & drop your paper'}
          </p>
          <p className="text-sm text-gray-500">or click to browse</p>
          <p className="text-xs text-gray-400 mt-4">
            Supported: PDF, DOCX, TXT (Max 50MB)
          </p>
        </div>

        {isUploading && (
          <div className="mt-6 flex items-center justify-center">
            <div className="loader"></div>
            <p className="ml-4 text-gray-600">Processing...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
