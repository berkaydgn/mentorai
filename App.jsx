import { useState } from 'react';
import './index.css';

function App() {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    setPlan('');
    const res = await fetch('http://127.0.0.1:8000/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal }),
    });
    const data = await res.json();
    setPlan(data.plan || 'Plan oluşturulamadı.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4 transition-all">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-green-900">🎓 Sanal Mentor AI</h1>
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl w-full transition-all duration-300">
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Hedefini yaz (ör. Veri bilimci olmak istiyorum)"
          className="w-full border-2 border-green-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <button
          onClick={generatePlan}
          className="mt-4 w-full bg-green-300 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded-xl transition"
          disabled={loading || !goal}
        >
          {loading ? 'Plan oluşturuluyor...' : '📋 Plan Oluştur'}
        </button>
      </div>

      {plan && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg max-w-xl w-full animate-fade-in">
          <h2 className="text-xl font-semibold mb-2 text-green-800">📌 Planın:</h2>
          <pre className="whitespace-pre-wrap text-gray-700">{plan}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
