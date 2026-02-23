import { Zap } from 'lucide-react';

const LossDisplay = ({ data, vocab }) => (
  <div className="w-full max-w-2xl p-8 bg-white rounded-xl border border-slate-200 flex flex-col items-center">
    <div className="flex items-center gap-2 mb-6 select-none">
      <Zap size={22} className="text-blue-500" />
      <h4 className="text-base font-bold text-slate-700">Cross-Entropy Loss</h4>
    </div>

    <div className="flex flex-col gap-3 mb-6 w-full text-base font-mono">
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100">
        <span className="text-slate-500 w-28">y (Target):</span>
        <div className="flex gap-2">
          {vocab.map((v, i) => (
            <div
              key={i}
              className={`w-16 text-center py-2 rounded-lg text-sm ${i === data.targetIdx ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-200 text-slate-500'}`}
            >
              {i === data.targetIdx ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100">
        <span className="text-slate-500 w-28">ŷ (Pred):</span>
        <div className="flex gap-2">
          {data.probs.map((p, i) => (
            <div
              key={i}
              className={`w-16 text-center py-2 rounded-lg text-sm ${i === data.targetIdx ? 'bg-blue-100 text-blue-700 font-bold border border-blue-200' : 'bg-white border border-slate-200 text-slate-600'}`}
            >
              {p.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="text-base text-slate-500 mb-3 font-mono text-center w-full">
      L = - &Sigma; y<sub>i</sub> &middot; log(ŷ<sub>i</sub>)
    </div>

    <div className="text-base bg-slate-50 p-5 rounded-lg border border-slate-100 text-slate-600 w-full text-center leading-relaxed font-mono">
      - (
      {data.probs.map((p, i) => (
        <span key={i} className={i === data.targetIdx ? 'text-blue-600 font-bold' : 'text-slate-400'}>
          {i === data.targetIdx ? '1' : '0'}&middot;log({p.toFixed(2)}){i < data.probs.length - 1 ? ' + ' : ''}
        </span>
      ))}
      )<br />
      <div className="mt-3 text-lg border-t border-slate-200 pt-3 font-sans">
        = -log({data.probs[data.targetIdx].toFixed(3)}) ={' '}
        <span className="text-blue-600 font-bold text-xl">{data.loss.toFixed(3)}</span>
      </div>
    </div>
  </div>
);

export default LossDisplay;
