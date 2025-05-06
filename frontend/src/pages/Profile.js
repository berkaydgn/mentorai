import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Profile() {
  const [roadmapStats, setRoadmapStats] = useState({
    completed: 0,
    inProgress: 0,
    totalHours: 0
  });

  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [selectedRoadmaps, setSelectedRoadmaps] = useState([]);

  // Yol haritası istatistiklerini ve kayıtlı yol haritalarını localStorage'dan al
  useEffect(() => {
    const savedStats = localStorage.getItem('roadmapStats');
    if (savedStats) {
      setRoadmapStats(JSON.parse(savedStats));
    }

    // Örnek yol haritaları
    const exampleRoadmaps = [
      {
        id: 1,
        title: "Python Programlama",
        description: "Python programlama dilini sıfırdan öğrenin",
        steps: [
          { step: 1, title: "Python Temelleri", description: "Değişkenler, veri tipleri ve temel operatörler", estimated_time: "2 saat" },
          { step: 2, title: "Kontrol Yapıları", description: "if-else, döngüler ve fonksiyonlar", estimated_time: "3 saat" },
          { step: 3, title: "Veri Yapıları", description: "Listeler, sözlükler ve kümeler", estimated_time: "4 saat" }
        ],
        total_estimated_time: "9 saat",
        date: new Date().toISOString(),
        isCompleted: false
      },
      {
        id: 2,
        title: "Makine Öğrenmesi",
        description: "Makine öğrenmesi temellerini öğrenin",
        steps: [
          { step: 1, title: "Temel Kavramlar", description: "Makine öğrenmesi nedir ve türleri", estimated_time: "3 saat" },
          { step: 2, title: "Veri Ön İşleme", description: "Veri temizleme ve dönüştürme", estimated_time: "4 saat" },
          { step: 3, title: "Model Eğitimi", description: "Temel algoritmalar ve model seçimi", estimated_time: "5 saat" }
        ],
        total_estimated_time: "12 saat",
        date: new Date().toISOString(),
        isCompleted: false
      },
      {
        id: 3,
        title: "Derin Öğrenme",
        description: "Derin öğrenme ve yapay sinir ağları",
        steps: [
          { step: 1, title: "Yapay Sinir Ağları", description: "Temel yapı ve çalışma prensibi", estimated_time: "4 saat" },
          { step: 2, title: "CNN ve RNN", description: "Konvolüsyonel ve tekrarlayan ağlar", estimated_time: "5 saat" },
          { step: 3, title: "Transfer Öğrenme", description: "Önceden eğitilmiş modellerin kullanımı", estimated_time: "6 saat" }
        ],
        total_estimated_time: "15 saat",
        date: new Date().toISOString(),
        isCompleted: false
      }
    ];

    // Eğer localStorage'da yol haritası yoksa örnekleri ekle
    const existingRoadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]');
    if (existingRoadmaps.length === 0) {
      localStorage.setItem('roadmaps', JSON.stringify(exampleRoadmaps));
      setSavedRoadmaps(exampleRoadmaps);
      
      // İstatistikleri güncelle
      const stats = exampleRoadmaps.reduce((acc, roadmap) => {
        if (roadmap.isCompleted) {
          acc.completed++;
        } else {
          acc.inProgress++;
        }
        return acc;
      }, { completed: 0, inProgress: 0 });
      
      setRoadmapStats(stats);
      localStorage.setItem('roadmapStats', JSON.stringify(stats));
    } else {
      setSavedRoadmaps(existingRoadmaps);
      
      // Mevcut yol haritalarının istatistiklerini hesapla
      const stats = existingRoadmaps.reduce((acc, roadmap) => {
        if (roadmap.isCompleted) {
          acc.completed++;
        } else {
          acc.inProgress++;
        }
        return acc;
      }, { completed: 0, inProgress: 0 });
      
      setRoadmapStats(stats);
      localStorage.setItem('roadmapStats', JSON.stringify(stats));
    }
  }, []);

  // Yol haritası seçme/kaldırma fonksiyonu
  const handleSelectRoadmap = (id) => {
    setSelectedRoadmaps(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Seçili yol haritalarını silme fonksiyonu
  const handleDeleteSelected = () => {
    const updatedRoadmaps = savedRoadmaps.filter(roadmap => !selectedRoadmaps.includes(roadmap.id));
    setSavedRoadmaps(updatedRoadmaps);
    localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps));
    setSelectedRoadmaps([]);

    // İstatistikleri güncelle
    const stats = updatedRoadmaps.reduce((acc, roadmap) => {
      if (roadmap.isCompleted) {
        acc.completed++;
      } else {
        acc.inProgress++;
      }
      return acc;
    }, { completed: 0, inProgress: 0 });

    setRoadmapStats(stats);
    localStorage.setItem('roadmapStats', JSON.stringify(stats));
  };

  // Yol haritası silme fonksiyonu
  const handleDeleteRoadmap = (id) => {
    const updatedRoadmaps = savedRoadmaps.filter(roadmap => roadmap.id !== id);
    setSavedRoadmaps(updatedRoadmaps);
    localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps));

    // İstatistikleri güncelle
    const stats = updatedRoadmaps.reduce((acc, roadmap) => {
      if (roadmap.isCompleted) {
        acc.completed++;
      } else {
        acc.inProgress++;
      }
      return acc;
    }, { completed: 0, inProgress: 0 });

    setRoadmapStats(stats);
    localStorage.setItem('roadmapStats', JSON.stringify(stats));
  };

  // Yol haritası durumunu güncelle
  const handleToggleComplete = (id) => {
    const updatedRoadmaps = savedRoadmaps.map(roadmap => {
      if (roadmap.id === id) {
        const isCompleted = !roadmap.isCompleted;
        return { ...roadmap, isCompleted };
      }
      return roadmap;
    });

    setSavedRoadmaps(updatedRoadmaps);
    localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps));

    // İstatistikleri güncelle
    const stats = updatedRoadmaps.reduce((acc, roadmap) => {
      if (roadmap.isCompleted) {
        acc.completed++;
        acc.totalHours += roadmap.hours;
      } else {
        acc.inProgress++;
      }
      return acc;
    }, { completed: 0, inProgress: 0, totalHours: 0 });

    setRoadmapStats(stats);
    localStorage.setItem('roadmapStats', JSON.stringify(stats));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-lg"
        >
          {/* Profil Başlığı */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profil Bilgileri
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Kişisel bilgilerinizi görüntüleyin ve düzenleyin.
            </p>
          </div>

          {/* Profil İçeriği */}
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Profil Fotoğrafı */}
              <div className="col-span-1 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img
                    className="h-32 w-32 rounded-full"
                    src="/images/admin.jpg"
                    alt="Admin"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </motion.div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">Admin</h2>
                <p className="text-sm text-gray-500">admin@test.com</p>
              </div>

              {/* Kişisel Bilgiler */}
              <div className="col-span-1">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                    <input
                      type="text"
                      value="Admin"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">E-posta</label>
                    <input
                      type="email"
                      value="admin@test.com"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Şifre</label>
                    <input
                      type="password"
                      value="••••••••"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* İstatistikler */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">İstatistikler</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Tamamlanan Yol Haritaları</p>
                  <p className="text-2xl font-bold text-green-600">{roadmapStats.completed}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Devam Eden Yol Haritaları</p>
                  <p className="text-2xl font-bold text-blue-600">{roadmapStats.inProgress}</p>
                </div>
              </div>
            </div>

            {/* Kayıtlı Yol Haritaları */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Yol Haritalarım</h3>
                {selectedRoadmaps.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Seçili Yol Haritalarını Sil
                  </button>
                )}
              </div>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {savedRoadmaps.map((roadmap) => (
                    <motion.li
                      key={roadmap.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 py-4 sm:px-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={roadmap.isCompleted}
                                onChange={() => {
                                  handleToggleComplete(roadmap.id);
                                  handleSelectRoadmap(roadmap.id);
                                }}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                              />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {roadmap.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(roadmap.date).toLocaleDateString('tr-TR')}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            roadmap.isCompleted
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {roadmap.isCompleted ? 'Tamamlandı' : 'Devam Ediyor'}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Butonlar */}
            <div className="mt-8 flex justify-end space-x-3">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                İptal
              </Link>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile; 