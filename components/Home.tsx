'use client';
import { useState } from 'react';
import Login from './Login';
import MapPage from './MapPage';
import UploadPage from './UploadPage';
import ResultsPage from './ResultsPage';

export default function Home() {
  const [step, setStep] = useState<'login' | 'map' | 'upload' | 'results'>('login');
  const [results, setResults] = useState<any>(null);

  const handleLogin = () => setStep('map');
  const handleMapContinue = () => setStep('upload');
  const handleUploadComplete = (data: any) => {
    setResults(data);
    setStep('results');
  };
  const handleBackHome = () => {
    setResults(null);
    setStep('login');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {step === 'login' && <Login onLogin={handleLogin} />}
      {step === 'map' && <MapPage onContinue={handleMapContinue} />}
      {step === 'upload' && <UploadPage onUploadComplete={handleUploadComplete} />}
      {step === 'results' && <ResultsPage results={results} onBack={handleBackHome} />}
    </div>
  );
}