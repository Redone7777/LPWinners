import React, { useState, useEffect } from 'react';

const TestAPI = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:8000/');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-20 text-white bg-slate-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Test de Connexion API</h1>
      
      <button 
        onClick={testConnection}
        className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Tester l'Appel
      </button>

      <div className="mt-10 p-6 bg-black/40 border border-white/10 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Réponse du Backend :</h2>
        {data && <pre className="text-green-400">{JSON.stringify(data, null, 2)}</pre>}
        {error && <pre className="text-red-400">Erreur: {error}</pre>}
        {!data && !error && <p className="text-white/40">Aucun appel effectué</p>}
      </div>
    </div>
  );
};

export default TestAPI;
