import { Zap } from 'lucide-react';

const LossDisplay = ({ data, vocab }) => (
  <div className="w-full max-w-md p-4 bg-white rounded border border-slate-200 flex flex-col items-center">
    <div className="flex items-center gap-2 mb-4 select-none">
      <Zap size={18} className="text-blue-500" />
      <h4 className="text-sm font-bold text-slate-700">Cross-Entropy Loss</h4>
    </div>

    <div className="flex flex-col gap-2 mb-4 w-full text-[10px] font-mono">
      <div className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
        <span className="text-slate-500 w-20">y (Target):</span>
        <div className="flex gap-1">
          {vocab.map((v, i) => (
            <div
              key={i}
              className={`w-10 sm:w-12 text-center py-1 rounded ${i === data.targetIdx ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-200 text-slate-500'}`}
            >
              {i === data.targetIdx ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
        <span className="text-slate-500 w-20">ŷ (Pred):</span>
        <div className="flex gap-1">
          {data.probs.map((p, i) => (
            <div
              key={i}
              className={`w-10 sm:w-12 text-center py-1 rounded ${i === data.targetIdx ? 'bg-blue-100 text-blue-700 font-bold border border-blue-200' : 'bg-white border border-slate-200 text-slate-600'}`}
            >
              {p.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="text-[10px] text-slate-500 mb-2 font-mono text-center w-full">
      L = - &Sigma; y<sub>i</sub> &middot; log(ŷ<sub>i</sub>)
    </div>

    <div className="text-[10px] sm:text-xs bg-slate-50 p-3 rounded border border-slate-100 text-slate-600 w-full text-center leading-relaxed font-mono">
      - (
      {data.probs.map((p, i) => (
        <span key={i} className={i === data.targetIdx ? 'text-blue-600 font-bold' : 'text-slate-400'}>
          {i === data.targetIdx ? '1' : '0'}&middot;log({p.toFixed(2)}){i < 3 ? ' + ' : ''}
        </span>
      ))}
      )<br />
      <div className="mt-2 text-sm border-t border-slate-200 pt-2 font-sans">
        = -log({data.probs[data.targetIdx].toFixed(3)}) ={' '}
        <span className="text-blue-600 font-bold">{data.loss.toFixed(3)}</span>
      </div>
    </div>
  </div>
);

export default LossDisplay;
