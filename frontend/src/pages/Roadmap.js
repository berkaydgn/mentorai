import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:9000";

function Roadmap() {
  const [topic, setTopic] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hours, setHours] = useState('');

  const generateRoadmap = async () => {
    try {
      setLoading(true);
      setRoadmap(null);
      console.log('Sending request to:', `${API_URL}/generate-roadmap`);
      console.log('Request data:', { topic: topic });
      
      const response = await axios.post(`${API_URL}/generate-roadmap`, { topic });
      
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Roadmap data:', response.data?.roadmap);
      console.log('Candidates:', response.data?.roadmap?.candidates);

      if (response.data && response.data.roadmap) {
        const roadmapData = response.data.roadmap;
        console.log('Roadmap data structure:', roadmapData);
        
        if (roadmapData.candidates && roadmapData.candidates.length > 0) {
          const firstCandidate = roadmapData.candidates[0];
          console.log('First candidate:', firstCandidate);
          
          if (firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0) {
            try {
              const parsedData = JSON.parse(firstCandidate.content.parts[0].text);
              console.log('Parsed roadmap data:', parsedData);
              
              if (parsedData.steps && Array.isArray(parsedData.steps)) {
                setRoadmap(parsedData);
              } else {
                console.error('Steps array not found in parsed data');
                setRoadmap({ error: "Yol haritası adımları bulunamadı." });
              }
            } catch (e) {
              console.error('JSON parse error:', e);
              console.error('Raw text:', firstCandidate.content.parts[0].text);
              setRoadmap({ error: "JSON verisi çözümlenirken bir hata oluştu." });
            }
          } else {
            console.error('No parts found in candidate');
            setRoadmap({ error: "Beklenen 'parts' yapısı bulunamadı." });
          }
        } else {
          console.error('No candidates found in roadmap');
          setRoadmap({ error: "Beklenen 'candidates' yapısı bulunamadı." });
        }
      } else {
        console.error('No roadmap data in response');
        setRoadmap({ error: "Yol haritası verisi bulunamadı." });
      }

    } catch (error) {
      console.error('Error details:', error);
      console.error('Error response:', error.response);
      setRoadmap({ error: `Error generating roadmap: ${error.response?.data?.message || error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRoadmap = () => {
    // localStorage'dan mevcut yol haritalarını al
    const savedRoadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]');
    
    // Yeni yol haritasını ekle
    const newRoadmap = {
      id: Date.now(),
      title: topic || "Yol Haritası",
      description: roadmap.description || "",
      steps: roadmap.steps || [],
      total_estimated_time: roadmap.total_estimated_time || "",
      date: new Date().toISOString(),
      isCompleted: false
    };

    console.log('Saving roadmap with title:', newRoadmap.title);
    console.log('User input topic:', topic);

    // Yeni listeyi kaydet
    localStorage.setItem('roadmaps', JSON.stringify([...savedRoadmaps, newRoadmap]));

    // Profil sayfasına yönlendir
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 py-6">
        <div className="relative py-3 sm:max-w-7xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-7xl mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-center mb-8"
                  >
                    MENTORAI ile Kafa Karışıklığına Son, Yolun Belli!
                  </motion.h1>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4 flex items-center justify-center"
                  >
                    <div className="flex items-center w-1/2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !loading && topic) {
                            generateRoadmap();
                          }
                        }}
                        placeholder="Enter a topic..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {topic && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setTopic('')}
                          className="ml-2 px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200"
                        >
                          Temizle
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={generateRoadmap}
                    disabled={loading || !topic}
                    className={`w-1/2 mx-auto block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading || !topic ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </div>
                    ) : 'Yol haritanı oluştur'}
                  </motion.button>
                  <AnimatePresence>
                    {roadmap && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-semibold">{roadmap.title || "Your Learning Roadmap"}</h2>
                          {!roadmap.error && (
                            <button
                              onClick={handleSaveRoadmap}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Yol Haritasını Kaydet
                            </button>
                          )}
                        </div>
                        {roadmap.error ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-red-50 p-4 rounded-lg text-red-700"
                          >
                            {roadmap.error}
                          </motion.div>
                        ) : (
                          <>
                            {roadmap.description && (
                              <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-4 text-gray-600"
                              >
                                {roadmap.description}
                              </motion.p>
                            )}
                            <div className="space-y-6">
                              {roadmap.steps && roadmap.steps.reduce((acc, step, index) => {
                                const groupIndex = Math.floor(index / 4);
                                if (!acc[groupIndex]) {
                                  acc[groupIndex] = [];
                                }
                                acc[groupIndex].push(step);
                                return acc;
                              }, []).map((stepGroup, groupIndex) => (
                                <motion.div
                                  key={groupIndex}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: groupIndex * 0.2 }}
                                  whileHover={{ scale: 1.01 }}
                                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                                >
                                  <h3 className="text-xl font-semibold mb-4">{groupIndex + 1}. Ay</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {stepGroup.map((step, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: (groupIndex * 4 + index) * 0.3 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                                      >
                                        <div className="flex items-center mb-2">
                                          <motion.span 
                                            whileHover={{ scale: 1.05 }}
                                            className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded"
                                          >
                                            {step.step}. Adım
                                          </motion.span>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                        <p className="text-gray-600 mb-3">{step.description}</p>
                                        <div className="text-sm text-gray-500 mb-2">
                                          <span className="font-medium">Estimated Time:</span> {step.estimated_time}
                                        </div>
                                        {step.resources && step.resources.length > 0 && (
                                          <div className="mt-2">
                                            <span className="text-sm font-medium text-gray-700">Resources:</span>
                                            <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                                              {step.resources.map((resource, idx) => (
                                                <li key={idx}>{resource}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                            {roadmap.total_estimated_time && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4 text-right text-gray-600"
                              >
                                <span className="font-medium">Total Estimated Time:</span> {roadmap.total_estimated_time}
                              </motion.div>
                            )}
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap; 