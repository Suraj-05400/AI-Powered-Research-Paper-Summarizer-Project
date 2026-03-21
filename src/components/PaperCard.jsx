import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { paperService, translationService } from '../services/apiService';
import { FiDownload, FiGlobe } from 'react-icons/fi';

export const PaperCard = ({ paper, onDelete }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleDownload = async (language) => {
    setIsDownloading(true);
    try {
      const response = await paperService.downloadSummary(paper.id, language);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${paper.title}_summary_${language}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentChild.removeChild(link);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary mb-2">{paper.title}</h3>
        <p className="text-sm text-gray-600">
          {paper.original_filename} • {paper.word_count?.toLocaleString()} words
        </p>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{paper.summary}</p>

      {paper.key_findings && paper.key_findings.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Findings:</h4>
          <ul className="space-y-1">
            {paper.key_findings.slice(0, 3).map((finding, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="input-field flex-1 text-sm"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
        </select>

        <button
          onClick={() => handleDownload(selectedLanguage)}
          disabled={isDownloading}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <FiDownload size={18} />
          <span>{isDownloading ? 'Downloading...' : 'PDF'}</span>
        </button>

        <button
          onClick={() => onDelete(paper.id)}
          className="btn-secondary flex items-center space-x-2 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PaperCard;
