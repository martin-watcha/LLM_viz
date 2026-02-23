import { VOCAB } from '../data';

const ParallelSoftmax = ({ probs, targetIndices, targetTokens, inputTokens }) => (
  <div className="w-full max-w-2xl flex flex-col gap-6 p-6 bg-white rounded-xl border border-slate-200">
    <h4 className="text-base font-bold text-slate-700 select-none">Softmax Probabilities (All Positions)</h4>
    {probs.map((row, pos) => (
      <div key={pos} className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono text-xs">pos {pos}</span>
          <span className="text-slate-400">"{inputTokens[pos]}"</span>
          <span className="text-slate-300">→</span>
          <span className="text-blue-600 font-bold">"{targetTokens[pos]}"</span>
        </div>
        <div className="space-y-2">
          {row.map((prob, i) => {
            const isTarget = i === targetIndices[pos];
            return (
              <div key={i}>
                <div className="flex justify-between text-sm text-slate-600 mb-1 font-mono">
                  <span className={isTarget ? 'text-blue-600 font-bold' : ''}>
                    "{VOCAB[i]}"{isTarget && ' ★'}
                  </span>
                  <span className={isTarget ? 'text-blue-600 font-bold' : ''}>
                    {(prob * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-5 bg-slate-100 rounded overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded ${isTarget ? 'bg-blue-500' : 'bg-slate-300'}`}
                    style={{ width: `${Math.max(prob * 100, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

export default ParallelSoftmax;
