import Matrix from '../../../components/Matrix';

const CellGrid = ({ data, label, colorFn }) => (
  <div className="flex flex-col items-center mx-2">
    {label && <span className="text-sm text-slate-400 mb-2 font-medium">{label}</span>}
    <div className="bg-white p-2 rounded-lg border border-slate-200">
      <div className="flex flex-col gap-0.5">
        {data.map((row, i) => (
          <div key={i} className="flex gap-0.5">
            {row.map((val, j) => {
              const { bg, text } = colorFn(val);
              return (
                <div
                  key={j}
                  className={`w-16 h-10 flex items-center justify-center text-sm font-mono rounded transition-colors ${text}`}
                  style={{ backgroundColor: bg }}
                >
                  {val.toFixed(3)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const preActColor = (v) =>
  v < 0
    ? { bg: 'rgba(239,68,68,0.12)', text: 'text-red-600 font-bold' }
    : { bg: 'rgba(241,245,249,1)', text: 'text-slate-600' };

const postActColor = (v) =>
  v === 0
    ? { bg: 'rgba(203,213,225,0.3)', text: 'text-slate-400' }
    : { bg: 'rgba(241,245,249,1)', text: 'text-slate-600' };

const FfnRelu = ({ input, weight, preAct, postAct, inputLabel, weightLabel }) => (
  <div className="flex flex-col items-center gap-6 w-full max-w-5xl">
    {/* Row 1: input × W1 = pre_act */}
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <Matrix data={input} label={inputLabel} />
      <div className="text-2xl font-bold text-slate-300 select-none">&times;</div>
      <Matrix data={weight} label={weightLabel} />
      <div className="text-2xl font-bold text-slate-300 select-none">=</div>
      <CellGrid data={preAct} label="Pre-ReLU" colorFn={preActColor} />
    </div>

    {/* Arrow + ReLU label */}
    <div className="flex items-center gap-2 text-slate-400 select-none">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
      </svg>
      <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
        ReLU: max(0, x)
      </span>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>

    {/* Row 2: post_act */}
    <div className="flex items-center justify-center">
      <CellGrid data={postAct} label="Post-ReLU (hidden)" colorFn={postActColor} />
    </div>

    <p className="text-xs text-slate-400 select-none">
      음수(red) → ReLU 후 0(grey)으로 변환
    </p>
  </div>
);

export default FfnRelu;
