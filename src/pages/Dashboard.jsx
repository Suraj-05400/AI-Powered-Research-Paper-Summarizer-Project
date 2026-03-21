import React, { useEffect, useState } from 'react';
import { Header, Sidebar, Footer, DocumentUpload, QAPanel, PaperCard } from '../components';
import { useUIStore, usePaperStore } from '../context/store';
import { paperService } from '../services/apiService';
import toast from 'react-hot-toast';
import { FiPlus, FiSearch } from 'react-icons/fi';

export const Dashboard = () => {
  const { 
    showUploadModal, 
    toggleUploadModal, 
    showQAModal, 
    toggleQAModal, 
    sidebarOpen, 
    toggleSidebar 
  } = useUIStore();
  
  const { papers, setPapers, setLoading, isLoading, removePaper } = usePaperStore();
  const [selectedPaperId, setSelectedPaperId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    setLoading(true);
    try {
      const response = await paperService.getPapers();
      setPapers(response.data);
    } catch (error) {
      toast.error('Failed to load papers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paperId) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      try {
        await paperService.deletePaper(paperId);
        removePaper(paperId);
        toast.success('Paper deleted');
      } catch (error) {
        toast.error('Failed to delete paper');
      }
    }
  };

  const filteredPapers = papers.filter((paper) =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.original_filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar is fixed, but we include it here for state control */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col min-w-0 bg-gray-900 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Manage and analyze your research papers</p>
            </div>

            {/* Action Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={toggleUploadModal}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <FiPlus size={20} />
                <span>Upload Paper</span>
              </button>

              <div className="relative col-span-1 md:col-span-2">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FiSearch size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Search papers by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Papers Grid */}
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-500">Fetching your research...</p>
              </div>
            ) : filteredPapers.length === 0 ? (
              <div className="bg-gray-800/50 border border-dashed border-gray-700 rounded-2xl p-16 text-center">
                <FiSearch size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 text-lg">No papers found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPapers.map((paper) => (
                  <div key={paper.id} className="transform transition hover:-translate-y-1">
                    <PaperCard
                      paper={paper}
                      onDelete={() => handleDelete(paper.id)}
                      onClick={() => {
                        setSelectedPaperId(paper.id);
                        toggleQAModal();
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Footer inside the scrollable area or outside? Usually better inside main or at bottom of wrapper */}
          <Footer />
        </main>
      </div>

      {/* Modals - Rendered outside the main flow */}
      {showUploadModal && <DocumentUpload onClose={toggleUploadModal} />}
      {showQAModal && selectedPaperId && (
        <QAPanel
          paperId={selectedPaperId}
          onClose={toggleQAModal}
        />
      )}
    </div>
  );
};

export default Dashboard;