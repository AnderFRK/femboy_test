import { User, X } from 'lucide-react';
import FemboySpinner from '../ui/FemboySpinner';

export default function WaitingRoom({ onCancel }) {
  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl text-center animate-in fade-in duration-500">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#f7c9f2] to-[#c2dafd] flex items-center justify-center shadow-lg animate-pulse">
            <User className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-black text-slate-900 mb-3">Buscando oponente...</h2>
      <p className="text-slate-600 font-medium mb-6">
        Esperando a que otro usuario entre para la batalla 1vs1.
      </p>

      <div className="mb-8">
        <FemboySpinner text="conectando" />
      </div>

      <button
        onClick={onCancel}
        className="flex items-center justify-center gap-2 mx-auto rounded-xl border-2 border-red-200 bg-red-50 px-6 py-3 font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
      >
        <X className="h-5 w-5" />
        Cancelar búsqueda
      </button>
    </div>
  );
}
