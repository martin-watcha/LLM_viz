const TanhGraph = ({ inputVal, outputVal }) => {
  const points = [];
  for (let x = -3; x <= 3; x += 0.2) {
    points.push(`${(x + 3) * 40},${(1 - Math.tanh(x)) * 40}`);
  }

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl border border-slate-200 w-full max-w-2xl">
      <h4 className="text-base font-bold text-slate-700 mb-6 select-none">tanh Activation</h4>
      <svg viewBox="0 0 240 80" className="w-full h-64 overflow-visible">
        <line x1="0" y1="40" x2="240" y2="40" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="120" y1="0" x2="120" y2="80" stroke="#e2e8f0" strokeWidth="1" />
        <polyline points={points.join(' ')} fill="none" stroke="#94a3b8" strokeWidth="2" />
        {inputVal.map((v, idx) => (
          <g key={idx}>
            <circle cx={(v + 3) * 40} cy={(1 - outputVal[idx]) * 40} r="4" fill="#3b82f6" />
            <line
              x1={(v + 3) * 40} y1="40"
              x2={(v + 3) * 40} y2={(1 - outputVal[idx]) * 40}
              stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2"
            />
          </g>
        ))}
      </svg>
      <div className="mt-6 flex gap-4 font-mono">
        {inputVal.map((v, idx) => (
          <div key={idx} className="text-base bg-slate-50 px-4 py-3 rounded-lg border border-slate-100 text-center">
            <span className="text-slate-500">In:</span> {v.toFixed(2)} &rarr;{' '}
            <span className="text-blue-600 font-bold">Out: {outputVal[idx].toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TanhGraph;
