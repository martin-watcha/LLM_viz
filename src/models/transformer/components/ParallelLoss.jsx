import { Zap } from 'lucide-react';

const ParallelLoss = ({ probs, targetIndices, targetTokens, inputTokens, losses, avgLoss }) => (
  <div className="w-full max-w-2xl p-8 bg-white rounded-xl border border-slate-200 flex flex-col items-center">
    <div className="flex items-center gap-2 mb-6 select-none">
      <Zap size={22} className="text-blue-500" />
      <h4 className="text-base font-bold text-slate-700">Cross-Entropy Loss (All Positions)</h4>
    </div>

    <div className="w-full space-y-4 mb-6">
      {losses.map((loss, pos) => (
        <div key={pos} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded font-mono text-xs">pos {pos}</span>
              <span className="text-slate-400 font-mono">"{inputTokens[pos]}"</span>
              <span className="text-slate-300">→</span>
              <span className="text-blue-600 font-bold font-mono">"{targetTokens[pos]}"</span>
            </div>
            <span className="text-blue-600 font-bold font-mono text-lg">{loss.toFixed(3)}</span>
          </div>
          <div className="text-sm font-mono text-slate-500 text-center">
            -log(P("{targetTokens[pos]}")) = -log({probs[pos][targetIndices[pos]].toFixed(3)}) = {loss.toFixed(3)}
          </div>
        </div>
      ))}
    </div>

    <div className="w-full bg-blue-50 p-5 rounded-lg border border-blue-200 text-center">
      <div className="text-sm text-slate-500 font-mono mb-2">
        L = (1/{losses.length}) × ({losses.map(l => l.toFixed(3)).join(' + ')})
      </div>
      <div className="text-xl font-bold text-blue-600 font-mono">
        L = {avgLoss.toFixed(3)}
      </div>
    </div>
  </div>
);

export default ParallelLoss;
