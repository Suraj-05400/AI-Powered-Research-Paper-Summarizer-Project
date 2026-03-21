import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap, FiBarChart2, FiSearch, FiDownload, FiMessageSquare } from 'react-icons/fi';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-primary to-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">RP</span>
            </div>
            <span className="text-2xl font-bold text-white">ResearchPro</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
            <Link to="/features" className="text-gray-300 hover:text-white transition">Features</Link>
            <Link to="/login" className="bg-primary hover:bg-blue-900 text-white px-6 py-2 rounded-lg transition">
              Login
            </Link>
            <Link to="/register" className="bg-secondary hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            AI-Powered Research Paper Analysis
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your research workflow with intelligent summarization, semantic search,
            and AI-powered insights extraction. Analyze papers faster, understand deeper.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-secondary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg flex items-center space-x-2 transition transform hover:scale-105"
            >
              <span>Get Started Free</span>
              <FiArrowRight />
            </Link>
            <Link
              to="/features"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiZap,
                title: 'Instant Summarization',
                description: 'Get AI-generated summaries of research papers in seconds, not hours.',
              },
              {
                icon: FiSearch,
                title: 'Semantic Search',
                description: 'Search papers using natural language and find exactly what you need.',
              },
              {
                icon: FiBarChart2,
                title: 'Key Insights',
                description: 'Automatically extract key findings and generate visual insights.',
              },
              {
                icon: FiMessageSquare,
                title: 'Q&A Assistant',
                description: 'Ask questions about any paper and get context-aware answers.',
              },
              {
                icon: FiDownload,
                title: 'Multi-Language',
                description: 'Translate summaries to 10+ languages with a single click.',
              },
              {
                icon: FiDownload,
                title: 'Export & Share',
                description: 'Download summaries as PDF, DOCX, or share directly with colleagues.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
                <feature.icon size={40} className="text-secondary mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Built with Latest Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['LangChain', 'FAISS', 'Sentence Transformers', 'FastAPI', 'React', 'Vite', 'PostgreSQL', 'Redis'].map((tech) => (
              <div key={tech} className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition">
                <p className="text-white font-semibold">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Research?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join researchers worldwide who are accelerating their work with ResearchPro.
          </p>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-100 text-primary font-bold py-4 px-8 rounded-lg transition inline-flex items-center space-x-2"
          >
            <span>Start Analyzing Now</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 ResearchPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
