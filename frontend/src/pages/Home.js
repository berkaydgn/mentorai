import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleRoadmapClick = () => {
    if (isAuthenticated) {
      navigate('/roadmap');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Yapay Zeka Destekli Öğrenme Yol Haritası
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kişiselleştirilmiş öğrenme yol haritanızı oluşturun ve hedeflerinize ulaşın.
            Yapay zeka teknolojisi ile size özel 12 haftalık bir plan hazırlıyoruz.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center space-x-4"
          >
            <button
              onClick={handleRoadmapClick}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Haydi Başlayalım
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Kişiselleştirilmiş Plan</h3>
            <p className="text-gray-600">
              Hedeflerinize ve seviyenize uygun, size özel hazırlanmış 12 haftalık öğrenme planı.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Detaylı İçerik</h3>
            <p className="text-gray-600">
              Her hafta için özel olarak hazırlanmış konular, kaynaklar ve öneriler.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Kolay Takip</h3>
            <p className="text-gray-600">
              İlerlemenizi takip edin, notlar alın ve hedeflerinize ulaşın.
            </p>
          </motion.div>
        </div>
      </div>
      {/* SVG Paragraf görseli */}
      <div style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: 'white'
      }}>
        <img
          src="/images/paragraf.svg"
          alt="Paragraf"
          style={{
            width: '100vw',
            height: 'auto',
            display: 'block',
            margin: 0,
            padding: 0
          }}
        />
      </div>
    </div>
  );
}

export default Home; 