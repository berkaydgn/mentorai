import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Hakkımızda</h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700">
                MENTORAI, yapay zeka destekli öğrenme yol haritaları oluşturan bir platformdur. 
                Amacımız, öğrenme sürecinizi daha verimli ve organize hale getirmektir.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">Misyonumuz</h3>
                  <p className="text-gray-700">
                    Karmaşık öğrenme süreçlerini basitleştirerek, herkesin kendi hızında ve 
                    etkili bir şekilde öğrenmesini sağlamak.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">Vizyonumuz</h3>
                  <p className="text-gray-700">
                    Yapay zeka teknolojilerini kullanarak, kişiselleştirilmiş öğrenme deneyimleri 
                    sunan dünyanın önde gelen platformlarından biri olmak.
                  </p>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 p-6 rounded-lg mt-8"
              >
                <h3 className="text-xl font-semibold mb-4">Neden MENTORAI?</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Kişiselleştirilmiş öğrenme yol haritaları</li>
                  <li>Yapay zeka destekli içerik önerileri</li>
                  <li>Kolay kullanılabilir arayüz</li>
                  <li>Güncel ve güvenilir kaynaklar</li>
                  <li>Esnek öğrenme süreçleri</li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Team Members Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Ekibimiz</h3>
            <div className="flex justify-center space-x-8">
              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2">
                  <img 
                    src="/images/ekip/berkay.jpg" 
                    alt="Berkay" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-semibold">Berkay</span>
                <span className="text-sm text-gray-600">Proje Yöneticisi</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2">
                  <img 
                    src="/images/ekip/eylul-darcanli.jpg" 
                    alt="Eylül Darcanlı" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-semibold">Eylül Darcanlı</span>
                <span className="text-sm text-gray-600">UI/UX Tasarımcı</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2">
                  <img 
                    src="/images/ekip/gulfem-kupeli.jpg" 
                    alt="Gülfem Küpeli" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-semibold">Gülfem Küpeli</span>
                <span className="text-sm text-gray-600">Backend Geliştirici</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2">
                  <img 
                    src="/images/ekip/osman-furkan-erkan.jpg" 
                    alt="Osman Furkan Erkan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-semibold">Osman Furkan Erkan</span>
                <span className="text-sm text-gray-600">Frontend Geliştirici</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2">
                  <img 
                    src="/images/ekip/sinem.jpg" 
                    alt="Sinem Karatepe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-semibold">Sinem Karatepe</span>
                <span className="text-sm text-gray-600">İçerik Yöneticisi</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About; 