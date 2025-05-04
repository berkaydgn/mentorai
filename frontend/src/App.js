import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:9000"; // Temel backend URL'si

function App() {
  const [topic, setTopic] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/generate-roadmap`,
        { topic: topic },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.roadmap && response.data.roadmap.candidates && response.data.roadmap.candidates.length > 0) {
        const firstCandidate = response.data.roadmap.candidates[0];
        if (firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0) {
          try {
            const roadmapData = JSON.parse(firstCandidate.content.parts[0].text);
            setRoadmap(JSON.stringify(roadmapData, null, 2));
          } catch (e) {
            setRoadmap("JSON verisi çözümlenirken bir hata oluştu.");
            console.error("JSON parse hatası:", e);
          }
        } else {
          setRoadmap("Beklenen 'parts' yapısı bulunamadı.");
        }
      } else {
        setRoadmap("Beklenen 'roadmap' veya 'candidates' yapısı bulunamadı.");
      }

    } catch (error) {
      console.error('Error generating roadmap:', error);
      setRoadmap(`Error generating roadmap: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8">AI Roadmap Generator</h1>
                <div className="mb-4 flex items-center">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {topic && (
                    <button
                      onClick={() => setTopic('')}
                      className="ml-2 text-sm text-blue-500 hover:text-blue-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  onClick={generateRoadmap}
                  disabled={loading || !topic}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading || !topic ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </div>
                  ) : 'Generate Roadmap'}
                </button>
                {roadmap && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Your Learning Roadmap:</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap">{roadmap}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;