const AttentionHeatmap = ({ attention, seq, colSeq, causal = true, rowLabel = 'Query', colLabel = 'Key' }) => {
  const colTokens = colSeq || seq;

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl border border-slate-200 w-full max-w-2xl">
      <h4 className="text-base font-bold text-slate-700 mb-6 select-none">Attention Weights</h4>

      {/* Column headers — Key positions */}
      <div className="flex mb-1">
        <div className="w-24" />
        <div className="flex flex-col items-center mr-1 w-4 text-[10px] text-slate-400 self-end pb-1">{colLabel}</div>
        {colTokens.map((token, j) => (
          <div key={j} className="w-20 text-center text-sm font-bold text-slate-500">
            "{token}"
          </div>
        ))}
      </div>

      {/* Rows — Query positions */}
      {attention.map((row, i) => (
        <div key={i} className="flex items-center mb-1">
          {i === 0 && (
            <div className="flex items-center mr-1">
              <span className="text-[10px] text-slate-400 -rotate-90 w-4 whitespace-nowrap">{rowLabel}</span>
            </div>
          )}
          {i !== 0 && <div className="w-4 mr-1" />}
          <div className="w-20 text-right text-sm font-bold text-slate-500 pr-3">"{seq[i]}"</div>
          {row.map((weight, j) => {
            const isMasked = causal && !colSeq && j > i;
            return (
              <div
                key={j}
                className={`w-20 h-16 flex items-center justify-center text-sm font-mono font-bold rounded mx-0.5 transition-colors
                  ${isMasked ? 'bg-slate-100 text-slate-300' : 'text-blue-900'}`}
                style={!isMasked ? { backgroundColor: `rgba(59, 130, 246, ${0.1 + weight * 0.85})` } : {}}
              >
                {isMasked ? '—' : weight.toFixed(3)}
              </div>
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="mt-6 flex items-center gap-5 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded border border-slate-200" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }} />
          <span>Low attention</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded" style={{ backgroundColor: 'rgba(59,130,246,0.95)' }} />
          <span>High attention</span>
        </div>
        {causal && !colSeq && (
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-slate-100 border border-slate-200" />
            <span>Masked (future)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttentionHeatmap;
