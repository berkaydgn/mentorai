import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Kayıt Ol
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Veya{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              zaten bir hesabınız var mı?
            </Link>
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Çok Yakında!</h3>
            <p className="text-lg">
              Kayıt olma özelliği yakında hizmetinizde olacak.
            </p>
          </div>
        </motion.div>

        <div className="mt-6">
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register; 