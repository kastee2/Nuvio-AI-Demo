'use client';
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-orange-500">Nuvio</h1>
      <p className="text-gray-400">Detecta el futuro, ahora.</p>
      <Button 
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded w-48"
        onClick={onLogin}
      >
        Entrar
      </Button>
    </motion.div>
  );
}