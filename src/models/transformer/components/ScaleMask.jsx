import Matrix from '../../../components/Matrix';

const ScaleMask = ({ rawScores, scaledScores, dk, causal = true }) => (
  <div className="flex flex-col items-center p-8 bg-white rounded-xl border border-slate-200 w-full max-w-3xl">
    <h4 className="text-base font-bold text-slate-700 mb-8 select-none">
      {causal ? 'Scale & Causal Mask' : 'Scale (Bidirectional)'}
    </h4>

    <div className="flex items-center justify-center gap-6">
      {/* Raw scores */}
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-slate-500 mb-3">Raw Score (Q·Kᵀ)</span>
        <Matrix data={rawScores} />
      </div>

      {/* Scale operator */}
      <div className="flex flex-col items-center gap-1 text-slate-400 select-none">
        <span className="text-3xl">÷</span>
        <span className="text-base font-mono font-bold">√{dk}</span>
        {causal && <span className="text-xs">+ Mask</span>}
      </div>

      {/* Scaled + optionally masked */}
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-slate-500 mb-3">
          {causal ? 'After Scale + Mask' : 'After Scale'}
        </span>
        <div className="bg-white p-2 rounded-lg border border-slate-200">
          <div className="flex flex-col gap-0.5">
            {scaledScores.map((row, i) => (
              <div key={i} className="flex gap-0.5">
                {row.map((val, j) => {
                  const isMasked = causal && j > i;
                  return (
                    <div
                      key={j}
                      className={`w-16 h-10 flex items-center justify-center text-sm font-mono rounded transition-colors
                        ${isMasked
                          ? 'bg-slate-200 text-slate-400 line-through'
                          : 'bg-blue-50 text-blue-700 font-bold'}`}
                    >
                      {isMasked ? '-∞' : val.toFixed(3)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <p className="mt-6 text-xs text-slate-400 select-none">
      {causal
        ? '상삼각(upper triangle) = 미래 토큰 → -∞ 마스킹 → softmax 후 0이 됨'
        : '양방향(Bidirectional) — 모든 위치를 참조할 수 있으므로 마스크 없음'}
    </p>
  </div>
);

export default ScaleMask;
