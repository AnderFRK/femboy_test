import { Trophy, Swords, RefreshCw, Home } from 'lucide-react';

export default function BattleResults({ winner, myFem, oppFem, opponent, onRematch, onHome }) {
  const iWon = winner === 'me';
  const itWasATie = winner === 'tie';

  return (
    <div className="w-full max-w-md mx-auto animate-in zoom-in duration-500">
      <div className="rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl text-center">
        <div className="mb-6">
          {itWasATie ? (
            <div className="h-24 w-24 mx-auto rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center">
              <span className="text-4xl">🤝</span>
            </div>
          ) : (
            <div className={`h-24 w-24 mx-auto rounded-full border-4 flex items-center justify-center shadow-lg ${
              iWon ? 'bg-green-100 border-green-400' : 'bg-slate-100 border-slate-300'
            }`}>
              {iWon ? (
                <Trophy className="h-12 w-12 text-yellow-500" />
              ) : (
                <Swords className="h-12 w-12 text-slate-400" />
              )}
            </div>
          )}
        </div>

        <h2 className={`text-3xl font-black mb-2 ${
          itWasATie ? 'text-yellow-600' : iWon ? 'text-green-600' : 'text-slate-600'
        }`}>
          {itWasATie ? '¡EMPATE!' : iWon ? '¡VICTORIA!' : 'DERROTA'}
        </h2>
        <p className="text-slate-500 font-medium mb-8">
          {itWasATie
            ? 'Ambos tienen el mismo nivel femenino.'
            : iWon
              ? 'Eres más femenino que tu rival.'
              : `${opponent?.nickname || 'Tu rival'} es más femenino que tú.`
          }
        </p>

        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-sm font-bold text-pink-500 mb-1">TÚ</p>
            <p className="text-4xl font-black text-slate-900">{myFem}%</p>
            <p className="text-xs text-slate-400">femenino</p>
          </div>
          <div className="flex items-center text-3xl text-slate-300 font-black">VS</div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-700 mb-1">{opponent?.nickname || 'RIVAL'}</p>
            <p className="text-4xl font-black text-slate-900">{oppFem}%</p>
            <p className="text-xs text-slate-400">femenino</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRematch}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#f7c9f2] px-6 py-3 font-bold text-slate-800 shadow-md hover:bg-[#c2dafd] transition-all cursor-pointer"
          >
            <RefreshCw className="h-5 w-5" />
            Nueva batalla
          </button>
          <button
            onClick={onHome}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Home className="h-5 w-5" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
