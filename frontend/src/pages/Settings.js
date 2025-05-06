import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { clearBrowserCache } from '../utils/cacheUtils';

function Settings() {
  const handleClearCache = () => {
    if (window.confirm('Önbellek temizlenecek. Devam etmek istiyor musunuz?')) {
      clearBrowserCache();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-lg p-8"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Ayarlar
          </motion.h1>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Önbellek Yönetimi</h2>
              <p className="text-gray-600 mb-4">
                Tarayıcı önbelleğini temizlemek, uygulamanın daha temiz çalışmasını sağlayabilir.
              </p>
              <button
                onClick={handleClearCache}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Önbelleği Temizle
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Settings; 