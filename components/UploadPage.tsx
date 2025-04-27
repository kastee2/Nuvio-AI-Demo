'use client';
import { useState } from "react";
import { motion } from "framer-motion";

interface UploadPageProps {
  location: { lat: number, lng: number };
  onUploadComplete: (data: any) => void;
}

export default function UploadPage({ location, onUploadComplete }: UploadPageProps) {
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('Latitud', String(location.lat));
    formData.append('Longitud', String(location.lng));

    try {
      const response = await fetch('https://ea88-34-139-229-29.ngrok-free.app/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      onUploadComplete(data);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error procesando la imagen:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewUpload = () => {
    setUploadSuccess(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold text-orange-500">Sube una imagen</h2>

      {!loading && !uploadSuccess && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-gray-800 p-2 rounded"
        />
      )}

      {loading && (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-400 mt-4">Procesando imagen...</p>
        </div>
      )}

      {uploadSuccess && !loading && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-green-500 font-semibold">✅ Imagen procesada exitosamente</p>
          <button
            onClick={handleNewUpload}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Subir otra imagen
          </button>
        </div>
      )}
    </motion.div>
  );
}