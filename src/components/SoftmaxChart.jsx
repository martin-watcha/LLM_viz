const SoftmaxChart = ({ output, targetIdx, vocab }) => (
  <div className="w-full max-w-sm p-4 bg-white rounded border border-slate-200">
    <h4 className="text-xs font-bold text-slate-700 mb-4 select-none">Softmax Probabilities</h4>
    <div className="space-y-3">
      {output.map((prob, i) => (
        <div key={i}>
          <div className="flex justify-between text-[10px] text-slate-600 mb-1 font-mono">
            <span className={i === targetIdx ? 'text-blue-600 font-bold' : ''}>
              "{vocab[i]}" {i === targetIdx && '(Target)'}
            </span>
            <span className={i === targetIdx ? 'text-blue-600 font-bold' : ''}>
              {(prob * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-4 bg-slate-100 rounded-sm overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${i === targetIdx ? 'bg-blue-500' : 'bg-slate-300'}`}
              style={{ width: `${Math.max(prob * 100, 2)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SoftmaxChart;
