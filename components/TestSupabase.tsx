import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const TestSupabase: React.FC = () => {
  const [result, setResult] = useState<string>('');

  const testInsert = async () => {
    try {
      setResult('Invio dati...');
      
      const testData = {
  tipo_cliente: 'privato',
  tipo_servizio: 'luce',
  email: 'test@test.com',
  origine: 'manual',
  step_corrente: 'comparison',  // ← ERA 'test', ORA 'comparison'
  stato: 'parziale'
};
      
      console.log('📤 Invio:', testData);
      
      const { data, error } = await supabase
        .from('leads')
        .insert([testData])
        .select();
      
      if (error) {
        console.error('❌ Errore:', error);
        setResult(`ERRORE: ${error.message}`);
      } else {
        console.log('✅ Successo:', data);
        setResult(`SUCCESSO! ID: ${data[0].id}`);
      }
    } catch (err: any) {
      console.error('❌ Errore catch:', err);
      setResult(`ERRORE CATCH: ${err.message}`);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Test Supabase</h2>
      <button 
        onClick={testInsert}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
      >
        TEST INSERT
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre className="text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default TestSupabase;
