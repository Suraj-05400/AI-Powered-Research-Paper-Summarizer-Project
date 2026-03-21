import React from 'react';
import { Footer } from '../components';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">ResearchPro</div>
          <div className="flex space-x-4">
            <a href="/" className="text-gray-300 hover:text-white transition">Home</a>
            <a href="/features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="/login" className="bg-primary text-white px-4 py-2 rounded">Login</a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-white mb-8">About ResearchPro</h1>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            ResearchPro is on a mission to revolutionize how researchers discover, analyze, and understand
            academic papers. Using cutting-edge AI technology, we empower researchers to focus on what
            matters most—innovation and discovery—while our platform handles the tedious work of reading
            and summarizing.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Why We Built This</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Researchers spend countless hours reading through papers, extracting key information, and
            synthesizing findings. With the exponential growth in published research, it's becoming
            impossible to keep up with the latest developments in your field.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            ResearchPro combines advanced NLP, semantic search, and generative AI to help you understand
            papers 10x faster while uncovering insights you might have missed.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Key Technologies</h2>
          <ul className="text-gray-300 text-lg space-y-3">
            <li>⚡ <strong>RAG (Retrieval-Augmented Generation):</strong> Combines information retrieval with generative AI</li>
            <li>🔍 <strong>FAISS:</strong> High-performance semantic search using vector embeddings</li>
            <li>🧠 <strong>LangChain:</strong> Framework for building AI-powered applications</li>
            <li>🤖 <strong>Sentence Transformers:</strong> State-of-the-art embedding models</li>
            <li>💻 <strong>FastAPI & React:</strong> Modern, scalable web technologies</li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            ResearchPro is built by a dedicated team of AI researchers, software engineers, and academics
            who are passionate about democratizing access to research insights. We're committed to making
            research more efficient and accessible for everyone.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
