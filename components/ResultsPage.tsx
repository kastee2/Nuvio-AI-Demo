'use client';
import { motion } from "framer-motion";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

interface ResultsPageProps {
  results: any;
  onBack: () => void;
}

// Registra ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ResultsPage({ results, onBack }: ResultsPageProps) {
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>No hay resultados para mostrar.</p>
        <button onClick={onBack} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          Volver
        </button>
      </div>
    );
  }

  // Aquí procesamos los resultados
  const totalLabels = results.totalLabels || 0;
  const totalOportunidad = results.totalOportunidadAnaquel || 0;
  const totalOCR = results.totalOCR || 0;
  const frentesPorProducto = results.frentesPorProducto || [];

  const data = {
    labels: frentesPorProducto.map((item: any) => item.label),
    datasets: [
      {
        label: 'Frentes',
        data: frentesPorProducto.map((item: any) => item.frentes),
        backgroundColor: 'orange',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Frentes por producto',
        color: 'orange',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
      },
      y: {
        ticks: { color: 'white' },
      },
    },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center space-y-8 p-6 bg-black min-h-screen text-white">
      
      <h1 className="text-3xl font-bold text-orange-500">Dashboard - UsuarioDemo</h1>

      {/* Métricas */}
      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <span className="text-sm text-orange-500">Labels detectados</span>
          <span className="text-4xl font-bold">{totalLabels}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-orange-500">Oportunidad Anaquel</span>
          <span className="text-4xl font-bold">{totalOportunidad}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-orange-500">OCR Detectados</span>
          <span className="text-4xl font-bold">{totalOCR}</span>
        </div>
      </div>

      {/* Gráfica */}
      <div className="w-full max-w-3xl">
        <Bar data={data} options={options} />
      </div>

      {/* Botón de regresar */}
      <button
        onClick={onBack}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
      >
        Volver al Inicio
      </button>
    </motion.div>
  );
}