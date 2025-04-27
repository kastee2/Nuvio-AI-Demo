'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MapPageProps {
  onContinue: (lat: number, lng: number) => void;
}

export default function MapPage({ onContinue }: MapPageProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleContinue = () => {
    if (location) {
      onContinue(location.lat, location.lng);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold text-orange-500">¡Bienvenido!</h2>
      <p className="text-gray-400">Tu ubicación actual:</p>

      {location ? (
        <>
          <iframe
            src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
            width="300"
            height="300"
            className="rounded-xl border-2 border-orange-500"
          />
          <button
            onClick={handleContinue}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Continuar
          </button>
        </>
      ) : (
        <p className="text-gray-400">Obteniendo ubicación...</p>
      )}
    </motion.div>
  );
}
