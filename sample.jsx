import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Terminal, 
  Activity, Zap, BarChart3, Binary, FastForward, Rewind,
  Network, Layers, Cpu, Database, ArrowLeft
} from 'lucide-react';

// ==========================================
// 1. RNN MODEL DATA & CONSTANTS
// ==========================================
const VOCAB = ["I", "like", "cats", "dogs"];
const SEQUENCE = ["I", "like", "cats"];
const TARGETS = ["like", "cats", "dogs"]; 

const MODEL_PARAMS = {
  E: [
    [0.1, 0.9, 0.2],
    [0.8, 0.1, 0.5],
    [0.3, 0.7, 0.4],
    [0.6, 0.2, 0.8]
  ],
  Wh: [[0.5, -0.1], [0.2, 0.4]],
  Wx: [[0.3, 0.1, -0.2], [0.1, 0.4, 0.3]],
  b: [0, 0],
  Wy: [[0.6, -0.3], [-0.2, 0.8], [0.4, 0.1], [-0.1, 0.5]]
};

const STEPS_DATA = [
  {
    timestep: 0,
    token: "Start",
    target: "-",
    substeps: [
      { 
        id: "t0_s1", type: "init", title: "데이터셋 & 파라미터 초기화", 
        desc: "모델 학습을 시작하기 전, 데이터셋과 파라미터(Weights)를 확인합니다.", 
        data: { params: MODEL_PARAMS, vocab: VOCAB, seq: SEQUENCE, target: TARGETS }, 
        formula: <span>Initialize Model</span> 
      }
    ]
  },
  {
    timestep: 1,
    token: "I",
    target: "like",
    substeps: [
      { id: "t1_s1", type: "embed", title: "① Embedding Lookup", desc: "E[0] → x₁ = [0.1, 0.9, 0.2]", data: { matrix: MODEL_PARAMS.E, index: 0, result: [0.1, 0.9, 0.2] }, formula: <span>x<sub>1</sub> = E['I']</span> },
      { id: "t1_s2", type: "matmul", title: "② Wh · h₀", desc: "이전 hidden state(0)와의 곱", data: { left: MODEL_PARAMS.Wh, right: [0, 0], result: [0, 0], leftLabel: "Wh", rightLabel: "h₀" }, formula: <span>Wh &middot; h<sub>0</sub></span> },
      { id: "t1_s3", type: "matmul", title: "③ Wx · x₁", desc: "입력 embedding과의 곱", data: { left: MODEL_PARAMS.Wx, right: [0.1, 0.9, 0.2], result: [0.08, 0.43], leftLabel: "Wx", rightLabel: "x₁" }, formula: <span>Wx &middot; x<sub>1</sub></span> },
      { id: "t1_s4", type: "tanh", title: "④ tanh activation", desc: "비선형성 추가: h₁ = tanh(0.08, 0.43)", data: { input: [0.08, 0.43], output: [0.080, 0.405] }, formula: <span>h<sub>1</sub> = tanh(Wh&middot;h<sub>0</sub> + Wx&middot;x<sub>1</sub> + b)</span> },
      { id: "t1_s5", type: "matmul", title: "⑤ Wy · h₁ → logits", desc: "Hidden → Vocab 차원으로 매핑", data: { left: MODEL_PARAMS.Wy, right: [0.080, 0.405], result: [-0.074, 0.308, 0.073, 0.195], leftLabel: "Wy", rightLabel: "h₁" }, formula: <span>z<sub>1</sub> = Wy &middot; h<sub>1</sub></span> },
      { id: "t1_s6", type: "softmax", title: "⑥ Softmax", desc: "Logits → 확률 분포 변환", data: { input: [-0.074, 0.308, 0.073, 0.195], output: [0.203, 0.297, 0.235, 0.265], target_idx: 1 }, formula: <span>y&#770;<sub>1</sub> = softmax(z<sub>1</sub>)</span> },
      { id: "t1_s7", type: "loss", title: "⑦ Loss 계산", desc: "Cross-Entropy Loss 계산", data: { targetToken: "like", targetIdx: 1, probs: [0.203, 0.297, 0.235, 0.265], loss: 1.214 }, formula: <span>L<sub>1</sub> = -log(P('like'))</span> }
    ]
  },
  {
    timestep: 2,
    token: "like",
    target: "cats",
    substeps: [
      { id: "t2_s1", type: "embed", title: "① Embedding Lookup", desc: "E[1] → x₂ = [0.8, 0.1, 0.5]", data: { matrix: MODEL_PARAMS.E, index: 1, result: [0.8, 0.1, 0.5] }, formula: <span>x<sub>2</sub> = E['like']</span> },
      { id: "t2_s2", type: "matmul", title: "② Wh · h₁", desc: "h₁ = [0.080, 0.405] 사용", data: { left: MODEL_PARAMS.Wh, right: [0.080, 0.405], result: [-0.0005, 0.178], leftLabel: "Wh", rightLabel: "h₁" }, formula: <span>Wh &middot; h<sub>1</sub></span> },
      { id: "t2_s3", type: "matmul", title: "③ Wx · x₂", desc: "x₂ = [0.8, 0.1, 0.5] 사용", data: { left: MODEL_PARAMS.Wx, right: [0.8, 0.1, 0.5], result: [0.15, 0.27], leftLabel: "Wx", rightLabel: "x₂" }, formula: <span>Wx &middot; x<sub>2</sub></span> },
      { id: "t2_s4", type: "tanh", title: "④ tanh activation", desc: "h₂ = tanh(0.1495, 0.448)", data: { input: [0.1495, 0.448], output: [0.148, 0.420] }, formula: <span>h<sub>2</sub> = tanh(Wh&middot;h<sub>1</sub> + Wx&middot;x<sub>2</sub> + b)</span> },
      { id: "t2_s5", type: "matmul", title: "⑤ Wy · h₂ → logits", desc: "Hidden h₂를 logits으로 변환", data: { left: MODEL_PARAMS.Wy, right: [0.148, 0.420], result: [-0.037, 0.306, 0.101, 0.195], leftLabel: "Wy", rightLabel: "h₂" }, formula: <span>z<sub>2</sub> = Wy &middot; h<sub>2</sub></span> },
      { id: "t2_s6", type: "softmax", title: "⑥ Softmax", desc: "Logits → 확률 분포", data: { input: [-0.037, 0.306, 0.101, 0.195], output: [0.208, 0.293, 0.239, 0.260], target_idx: 2 }, formula: <span>y&#770;<sub>2</sub> = softmax(z<sub>2</sub>)</span> },
      { id: "t2_s7", type: "loss", title: "⑦ Loss 계산", desc: "-log(0.239) = 1.431", data: { targetToken: "cats", targetIdx: 2, probs: [0.208, 0.293, 0.239, 0.260], loss: 1.431 }, formula: <span>L<sub>2</sub> = -log(P('cats'))</span> }
    ]
  },
  {
    timestep: 3,
    token: "cats",
    target: "dogs",
    substeps: [
      { id: "t3_s1", type: "embed", title: "① Embedding Lookup", desc: "E[2] → x₃ = [0.3, 0.7, 0.4]", data: { matrix: MODEL_PARAMS.E, index: 2, result: [0.3, 0.7, 0.4] }, formula: <span>x<sub>3</sub> = E['cats']</span> },
      { id: "t3_s2", type: "matmul", title: "② Wh · h₂", desc: "h₂ = [0.148, 0.420] 사용", data: { left: MODEL_PARAMS.Wh, right: [0.148, 0.420], result: [0.032, 0.198], leftLabel: "Wh", rightLabel: "h₂" }, formula: <span>Wh &middot; h<sub>2</sub></span> },
      { id: "t3_s3", type: "matmul", title: "③ Wx · x₃", desc: "x₃ = [0.3, 0.7, 0.4] 사용", data: { left: MODEL_PARAMS.Wx, right: [0.3, 0.7, 0.4], result: [0.08, 0.43], leftLabel: "Wx", rightLabel: "x₃" }, formula: <span>Wx &middot; x<sub>3</sub></span> },
      { id: "t3_s4", type: "tanh", title: "④ tanh activation", desc: "h₃ = tanh(0.112, 0.628)", data: { input: [0.112, 0.628], output: [0.111, 0.556] }, formula: <span>h<sub>3</sub> = tanh(Wh&middot;h<sub>2</sub> + Wx&middot;x<sub>3</sub> + b)</span> },
      { id: "t3_s5", type: "matmul", title: "⑤ Wy · h₃ → logits", desc: "Hidden h₃를 logits으로 변환", data: { left: MODEL_PARAMS.Wy, right: [0.111, 0.556], result: [-0.100, 0.422, 0.100, 0.267], leftLabel: "Wy", rightLabel: "h₃" }, formula: <span>z<sub>3</sub> = Wy &middot; h<sub>3</sub></span> },
      { id: "t3_s6", type: "softmax", title: "⑥ Softmax", desc: "Logits → 확률 분포", data: { input: [-0.100, 0.422, 0.100, 0.267], output: [0.187, 0.315, 0.228, 0.270], target_idx: 3 }, formula: <span>y&#770;<sub>3</sub> = softmax(z<sub>3</sub>)</span> },
      { id: "t3_s7", type: "loss", title: "⑦ Loss 계산", desc: "-log(0.270) = 1.309", data: { targetToken: "dogs", targetIdx: 3, probs: [0.187, 0.315, 0.228, 0.270], loss: 1.309 }, formula: <span>L<sub>3</sub> = -log(P('dogs'))</span> }
    ]
  }
];

// ==========================================
// 2. SHARED UI COMPONENTS
// ==========================================
const Matrix = ({ data, highlightRow = -1, highlightCol = -1, label = "" }) => {
  const is1D = Array.isArray(data) && !Array.isArray(data[0]);
  const renderData = is1D ? data.map(val => [val]) : data;

  return (
    <div className="flex flex-col items-center mx-1">
      {label && <span className="text-[10px] text-slate-400 mb-1">{label}</span>}
      <div className="bg-white p-1 rounded border border-slate-200">
        <div className="flex flex-col">
          {renderData.map((row, i) => (
            <div key={i} className="flex">
              {row.map((val, j) => {
                const isHighlighted = (highlightRow === i && highlightCol === -1) || 
                                      (highlightCol === j && highlightRow === -1) || 
                                      (highlightRow === i && highlightCol === j);
                return (
                  <div
                    key={j}
                    className={`w-10 h-6 m-[1px] flex items-center justify-center text-[10px] font-mono rounded-sm transition-colors
                      ${isHighlighted ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-50 text-slate-600'}
                    `}
                  >
                    {typeof val === 'number' ? val.toFixed(2) : val}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TanhGraph = ({ inputVal, outputVal }) => {
  const points = [];
  for (let x = -3; x <= 3; x += 0.2) { points.push(`${(x + 3) * 40},${(1 - Math.tanh(x)) * 40}`); }
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded border border-slate-200 w-full max-w-sm">
      <h4 className="text-xs font-bold text-slate-700 mb-4 select-none">tanh Activation</h4>
      <svg viewBox="0 0 240 80" className="w-full h-24 overflow-visible">
        <line x1="0" y1="40" x2="240" y2="40" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="120" y1="0" x2="120" y2="80" stroke="#e2e8f0" strokeWidth="1" />
        <polyline points={points.join(' ')} fill="none" stroke="#94a3b8" strokeWidth="2" />
        {inputVal.map((v, idx) => (
          <g key={idx}>
            <circle cx={(v + 3) * 40} cy={(1 - outputVal[idx]) * 40} r="4" fill="#3b82f6" />
            <line x1={(v + 3) * 40} y1="40" x2={(v + 3) * 40} y2={(1 - outputVal[idx]) * 40} stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
          </g>
        ))}
      </svg>
      <div className="mt-4 flex gap-2 font-mono">
        {inputVal.map((v, idx) => (
          <div key={idx} className="text-[10px] bg-slate-50 p-1.5 rounded border border-slate-100 text-center">
            <span className="text-slate-500">In:</span> {v.toFixed(2)} &rarr; <span className="text-blue-600 font-bold">Out: {outputVal[idx].toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SoftmaxChart = ({ output, targetIdx }) => (
  <div className="w-full max-w-sm p-4 bg-white rounded border border-slate-200">
    <h4 className="text-xs font-bold text-slate-700 mb-4 select-none">Softmax Probabilities</h4>
    <div className="space-y-3">
      {output.map((prob, i) => (
        <div key={i}>
          <div className="flex justify-between text-[10px] text-slate-600 mb-1 font-mono">
            <span className={i === targetIdx ? 'text-blue-600 font-bold' : ''}>"{VOCAB[i]}" {i === targetIdx && '(Target)'}</span>
            <span className={i === targetIdx ? 'text-blue-600 font-bold' : ''}>{(prob * 100).toFixed(1)}%</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-sm overflow-hidden">
            <div className={`h-full transition-all duration-500 ${i === targetIdx ? 'bg-blue-500' : 'bg-slate-300'}`} style={{ width: `${Math.max(prob * 100, 2)}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LossDisplay = ({ data }) => (
  <div className="w-full max-w-md p-4 bg-white rounded border border-slate-200 flex flex-col items-center">
    <div className="flex items-center gap-2 mb-4 select-none">
      <Zap size={18} className="text-blue-500" />
      <h4 className="text-sm font-bold text-slate-700">Cross-Entropy Loss</h4>
    </div>
    
    <div className="flex flex-col gap-2 mb-4 w-full text-[10px] font-mono">
      <div className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
        <span className="text-slate-500 w-20">y (Target):</span>
        <div className="flex gap-1">
          {VOCAB.map((v, i) => (
            <div key={i} className={`w-10 sm:w-12 text-center py-1 rounded ${i === data.targetIdx ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-200 text-slate-500'}`}>
              {i === data.targetIdx ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
        <span className="text-slate-500 w-20">y&#770; (Pred):</span>
        <div className="flex gap-1">
          {data.probs.map((p, i) => (
            <div key={i} className={`w-10 sm:w-12 text-center py-1 rounded ${i === data.targetIdx ? 'bg-blue-100 text-blue-700 font-bold border border-blue-200' : 'bg-white border border-slate-200 text-slate-600'}`}>
              {p.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="text-[10px] text-slate-500 mb-2 font-mono text-center w-full">
       L = - &Sigma; y<sub>i</sub> &middot; log(y&#770;<sub>i</sub>)
    </div>

    <div className="text-[10px] sm:text-xs bg-slate-50 p-3 rounded border border-slate-100 text-slate-600 w-full text-center leading-relaxed font-mono">
       - (
       {data.probs.map((p, i) => (
         <span key={i} className={i === data.targetIdx ? "text-blue-600 font-bold" : "text-slate-400"}>
           {i === data.targetIdx ? "1" : "0"}&middot;log({p.toFixed(2)}){i < 3 ? " + " : ""}
         </span>
       ))}
       )<br/>
       <div className="mt-2 text-sm border-t border-slate-200 pt-2 font-sans">
         = -log({data.probs[data.targetIdx].toFixed(3)}) = <span className="text-blue-600 font-bold">{data.loss.toFixed(3)}</span>
       </div>
    </div>
  </div>
);

// --- GLOBAL RNN FORMULA HIGHLIGHTER ---
const GlobalRNNFormula = ({ currentT, currentS }) => {
  const stepNum = currentT === 0 ? 0 : parseInt(currentS.id.split('_s')[1] || "0", 10);
  const t = currentT === 0 ? 't' : currentT;
  const prevT = currentT === 0 ? 't-1' : currentT - 1;

  const getHighlight = (targetSteps) => {
    return targetSteps.includes(stepNum)
      ? 'bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-md transition-all duration-300 border border-blue-200 shadow-sm mx-0.5' 
      : 'text-slate-600 transition-all duration-300 mx-0.5';
  };

  return (
    <div 
      className="w-full bg-white border-b border-slate-200 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 font-mono text-[11px] sm:text-xs md:text-sm shadow-sm z-10 select-none md:select-auto"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Roboto Mono', Consolas, monospace" }}
    >
       <div className={`transition-opacity duration-300 flex items-center ${stepNum >= 1 && stepNum <= 4 ? 'opacity-100' : 'opacity-40'}`}>
         <span className={getHighlight([4])}>h<sub>{t}</sub> = tanh(</span>
         <span className={getHighlight([2])}>W<sub>h</sub> &middot; h<sub>{prevT}</sub></span>
         <span className="text-slate-400 font-sans mx-1">+</span>
         <span className={getHighlight([1, 3])}>W<sub>x</sub> &middot; <span className={getHighlight([1])}>x<sub>{t}</sub></span></span>
         <span className="text-slate-400 font-sans mx-1">+ b</span>
         <span className={getHighlight([4])}>)</span>
       </div>
       
       <div className="hidden md:block w-px h-5 bg-slate-300 mx-2"></div>

       <div className={`transition-opacity duration-300 flex items-center ${stepNum === 5 || stepNum === 6 ? 'opacity-100' : 'opacity-40'}`}>
         <span className={getHighlight([6])}>y&#770;<sub>{t}</sub> = softmax(</span>
         <span className={getHighlight([5])}>W<sub>y</sub> &middot; h<sub>{t}</sub></span>
         <span className={getHighlight([6])}>)</span>
       </div>

       <div className="hidden md:block w-px h-5 bg-slate-300 mx-2"></div>

       <div className={`transition-opacity duration-300 flex items-center ${stepNum === 7 ? 'opacity-100' : 'opacity-40'}`}>
         <span className={getHighlight([7])}>L<sub>{t}</sub> = -log(y&#770;<sub>{t}, target</sub>)</span>
       </div>
    </div>
  );
};

// --- SIMPLIFIED ULTRA-COMPACT RNN FLOW DIAGRAM ---
const RNNFlowDiagramCompact = ({ currentT }) => {
  return (
    <div className="w-full flex justify-center py-4 bg-slate-50 border-b border-slate-200 overflow-visible select-none">
      <div className="flex items-center gap-1 sm:gap-2">
        {[0, 1, 2, 3].map((t) => {
          const isActive = currentT === t;
          const isPast = currentT > t;

          return (
            <React.Fragment key={`node-${t}`}>
              <div className="flex flex-col items-center w-10 sm:w-12">
                {/* Output y_t */}
                <div className={`h-6 flex items-end mb-0.5 text-[9px] font-bold transition-colors
                  ${isActive ? 'text-blue-600' : isPast ? 'text-slate-500' : 'text-slate-300'}`}>
                  {t > 0 && <span>y&#770;<sub>{t}</sub></span>}
                </div>
                
                {/* Arrow h_t -> y_t */}
                <div className="h-4 flex items-center justify-center">
                  {t > 0 && (
                    <svg className={`w-3 h-3 transition-colors ${isActive || isPast ? 'text-blue-400' : 'text-slate-200'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  )}
                </div>
                
                {/* Hidden Box h_t */}
                <div className={`w-8 h-8 sm:w-10 sm:h-10 mt-0.5 mb-0.5 flex items-center justify-center rounded text-[10px] font-bold transition-all
                  ${isActive ? 'bg-blue-500 border-blue-600 text-white shadow-md scale-110' : 
                    isPast ? 'bg-blue-50 border-blue-200 text-blue-600' : 
                    'bg-slate-50 border-slate-200 text-slate-300'} border`}>
                  h<sub>{t}</sub>
                </div>
                
                {/* Arrow x_t -> h_t */}
                <div className="h-4 flex items-center justify-center">
                  {t > 0 && (
                    <svg className={`w-3 h-3 transition-colors ${isActive || isPast ? 'text-blue-400' : 'text-slate-200'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  )}
                </div>
                
                {/* Input x_t */}
                <div className={`h-6 flex flex-col items-center mt-0.5 text-[9px] transition-colors
                  ${isActive ? 'text-blue-600 font-bold' : isPast ? 'text-slate-500' : 'text-slate-400'}`}>
                  {t > 0 && <><span>x<sub>{t}</sub></span><span className="scale-75">"{SEQUENCE[t-1]}"</span></>}
                </div>
              </div>
              
              {/* Arrow h_{t-1} -> h_t */}
              {t < 3 && (
                <div className="flex items-center justify-center w-4 sm:w-6">
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${currentT > t ? 'text-blue-400' : 'text-slate-200'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const StepDetailRenderer = ({ stepData }) => {
  const { type, data } = stepData;
  switch (type) {
    case 'init':
      return (
        <div className="flex flex-col w-full max-w-2xl gap-4">
          <div className="bg-white p-4 rounded border border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 mb-3 border-b border-slate-100 pb-2 select-none">토이 데이터셋</h3>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 font-mono">
               <div className="bg-slate-50 p-2 rounded">
                 <span className="block text-slate-400 mb-1 font-sans">Vocabulary:</span> 
                 {data.vocab.map((v,i)=><span key={i} className="mr-1">"{v}"</span>)}
               </div>
               <div className="bg-slate-50 p-2 rounded">
                 <span className="block text-slate-400 mb-1 font-sans">Task:</span> Next Token Prediction
               </div>
               <div className="bg-slate-50 p-2 rounded">
                 <span className="block text-slate-400 mb-1 font-sans">Input (x):</span> [{data.seq.join(', ')}]
               </div>
               <div className="bg-slate-50 p-2 rounded">
                 <span className="block text-slate-400 mb-1 font-sans">Target (y):</span> [{data.target.join(', ')}]
               </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded border border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 mb-3 border-b border-slate-100 pb-2 select-none">초기 파라미터</h3>
            <div className="flex flex-wrap gap-2 justify-center">
               <Matrix data={data.params.E} label="E (4×3)" />
               <Matrix data={data.params.Wh} label="Wh (2×2)" />
               <Matrix data={data.params.Wx} label="Wx (2×3)" />
               <Matrix data={data.params.Wy} label="Wy (4×2)" />
               <Matrix data={[data.params.b]} label="b (1×2)" />
            </div>
          </div>
        </div>
      );
    case 'embed':
      return (
        <div className="flex items-center justify-center gap-4">
          <Matrix data={data.matrix} highlightRow={data.index} label="E (Embedding)" />
          <div className="text-slate-300">&rarr;</div>
          <div className="flex flex-col items-center">
            <div className="text-[10px] text-blue-600 mb-1 font-mono font-bold">Token: "{VOCAB[data.index]}"</div>
            <Matrix data={data.result} highlightCol={0} label="x (Input Vector)" />
          </div>
        </div>
      );
    case 'matmul':
      return (
        <div className="flex items-center justify-center gap-2">
          <Matrix data={data.left} label={data.leftLabel} />
          <div className="text-sm font-bold text-slate-300">&times;</div>
          <Matrix data={data.right} label={data.rightLabel} />
          <div className="text-sm font-bold text-slate-300">=</div>
          <Matrix data={data.result} highlightCol={0} label="Result" />
        </div>
      );
    case 'tanh':
      return <TanhGraph inputVal={data.input} outputVal={data.output} />;
    case 'softmax':
      return <SoftmaxChart output={data.output} targetIdx={data.target_idx} />;
    case 'loss':
      return <LossDisplay data={data} />;
    default:
      return null;
  }
};


// ==========================================
// 3. VIEWS
// ==========================================

// --- RNN VIEW ---
const RNNView = ({ onBack }) => {
  const [tIndex, setTIndex] = useState(0);
  const [subStepIndex, setSubStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);

  const currentT = STEPS_DATA[tIndex];
  const currentS = currentT.substeps[subStepIndex];

  const handleNext = useCallback(() => {
    if (subStepIndex < currentT.substeps.length - 1) {
      setSubStepIndex(s => s + 1);
    } else if (tIndex < STEPS_DATA.length - 1) {
      setTIndex(t => t + 1);
      setSubStepIndex(0);
    } else {
      setIsPlaying(false);
    }
  }, [tIndex, subStepIndex, currentT.substeps.length]);

  const handlePrev = useCallback(() => {
    if (subStepIndex > 0) {
      setSubStepIndex(s => s - 1);
    } else if (tIndex > 0) {
      setTIndex(t => t - 1);
      setSubStepIndex(STEPS_DATA[tIndex - 1].substeps.length - 1);
    }
  }, [tIndex, subStepIndex]);

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => handleNext(), speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, handleNext, speed]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const jumpToStep = (tIdx, sIdx) => {
    setTIndex(tIdx);
    setSubStepIndex(sIdx);
    setIsPlaying(false);
  };

  const totalSteps = STEPS_DATA.reduce((acc, step) => acc + step.substeps.length, 0);
  let currentAbsoluteStep = 0;
  for (let i = 0; i < tIndex; i++) { currentAbsoluteStep += STEPS_DATA[i].substeps.length; }
  currentAbsoluteStep += subStepIndex + 1;
  const progressPercent = (currentAbsoluteStep / totalSteps) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 select-none">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            title="Back to Home"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-blue-600" />
            <h1 className="text-sm font-bold text-slate-700">RNN</h1>
          </div>
        </div>
        <div 
          className="bg-slate-50 px-3 py-1.5 rounded border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-2 max-w-[50%] overflow-x-auto custom-scrollbar select-text"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Roboto Mono', Consolas, monospace" }}
        >
           <span className="text-slate-400 font-sans shrink-0 select-none">Eq:</span> 
           <span className="tracking-wide whitespace-nowrap">{currentS.formula}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR TIMELINE */}
        <aside className="w-56 bg-white border-r border-slate-200 flex flex-col overflow-y-auto hidden md:flex shrink-0 select-none">
          <div className="p-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase sticky top-0 z-10">
            Timeline
          </div>
          <div className="p-3 space-y-4">
            {STEPS_DATA.map((t, ti) => (
              <div key={ti}>
                <div 
                  className={`flex items-center mb-2 cursor-pointer text-xs font-bold ${ti === tIndex ? 'text-blue-600' : 'text-slate-500'}`}
                  onClick={() => jumpToStep(ti, 0)}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 text-[8px]
                    ${ti === tIndex ? 'bg-blue-100 text-blue-700' : 'bg-slate-100'}
                  `}>t{t.timestep}</div>
                  {ti === 0 ? "Init" : `Input: "${t.token}"`}
                </div>
                <div className="ml-2 pl-4 border-l border-slate-100 space-y-1">
                  {t.substeps.map((s, si) => {
                    const isActive = ti === tIndex && si === subStepIndex;
                    return (
                      <div 
                        key={si} onClick={() => jumpToStep(ti, si)}
                        className={`py-1 px-2 rounded cursor-pointer text-[10px] transition-colors
                          ${isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-400 hover:bg-slate-50'}
                        `}
                      >
                        {s.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN VISUALIZATION AREA */}
        <main className="flex-1 flex flex-col bg-slate-50 overflow-y-auto min-w-0">
          <RNNFlowDiagramCompact currentT={currentT.timestep} />
          <GlobalRNNFormula currentT={currentT.timestep} currentS={currentS} />
          
          <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
            <div className="text-center mb-6 max-w-xl mt-4 select-none">
              <h2 className="text-lg font-bold text-slate-800 mb-2">{currentS.title}</h2>
              <p className="text-[11px] text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 inline-block shadow-sm">
                {currentS.desc}
              </p>
            </div>
            <div className="w-full flex justify-center min-h-[200px]">
              <StepDetailRenderer stepData={currentS} />
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER CONTROLS */}
      <footer className="bg-white border-t border-slate-200 relative shrink-0 select-none">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-slate-100">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="p-3 flex items-center justify-between max-w-4xl mx-auto gap-4">
          <div className="text-[10px] text-slate-400 w-16">
            <span className="font-bold text-slate-600">{currentAbsoluteStep}</span> / {totalSteps}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => jumpToStep(0, 0)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400" title="Restart"><RotateCcw size={14} /></button>
            <button onClick={handlePrev} disabled={tIndex === 0 && subStepIndex === 0} className="p-1.5 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30" title="Previous (Left Arrow)"><ChevronLeft size={18} /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${isPlaying ? 'bg-slate-400' : 'bg-blue-500'}`}
              title="Play/Pause (Space)"
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
            </button>
            <button onClick={handleNext} disabled={tIndex === STEPS_DATA.length - 1 && subStepIndex === currentT.substeps.length - 1} className="p-1.5 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30" title="Next (Right Arrow)"><ChevronRight size={18} /></button>
          </div>

          <div className="flex items-center gap-2 w-24">
            <Rewind size={10} className="text-slate-300" />
            <input 
              type="range" min="300" max="2000" step="100"
              value={2300 - speed} 
              onChange={(e) => setSpeed(2300 - Number(e.target.value))}
              className="w-full accent-blue-500 h-1 cursor-pointer"
            />
            <FastForward size={10} className="text-slate-300" />
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- PLACEHOLDER VIEW (For unfinished models) ---
const PlaceholderView = ({ model, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 select-none">
      <header className="flex items-center px-4 py-3 bg-white border-b border-slate-200">
        <button onClick={onBack} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 mr-3">
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2 text-slate-700">
          {model.icon}
          <h1 className="text-sm font-bold">{model.name}</h1>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6 border border-blue-100">
          {model.icon}
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">{model.name}</h2>
        <p className="text-sm text-slate-500 max-w-md">
          {model.desc}<br/>
          해당 모델의 손계산 시각화 도구는 현재 개발 중입니다. (Coming Soon!)
        </p>
        <button 
          onClick={onBack}
          className="mt-8 px-6 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

// --- HOME SCREEN ---
const MODELS = [
  { id: 'rnn', name: 'Vanilla RNN', desc: '순환 신경망의 기초. Hidden State의 행렬 곱셈과 tanh 연산 과정을 확인합니다.', icon: <Activity size={24} />, ready: true },
  { id: 'transformer', name: 'Transformer', desc: 'Self-Attention 메커니즘. Q, K, V 행렬 생성 및 Attention Score 계산 과정을 다룹니다.', icon: <Layers size={24} />, ready: false },
  { id: 'linear_rnn', name: 'Linear RNN', desc: '비선형성(tanh)을 제거하여 연산 속도를 극대화한 현대적 선형 순환 모델 구조입니다.', icon: <Network size={24} />, ready: false },
  { id: 'mamba', name: 'Mamba (SSM)', desc: '선택적 상태 공간 모델(Selective State Space Model). 입력에 따라 파라미터가 어떻게 변하는지 시각화합니다.', icon: <Zap size={24} />, ready: false },
  { id: 'titans', name: 'Titans (MAC)', desc: 'Memory as Context 아키텍처. 장기 기억을 위한 신경망 기반 메모리 업데이트 과정을 다룹니다.', icon: <Database size={24} />, ready: false },
];

const HomeScreen = ({ onSelect }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto select-none">
      <header className="px-8 pt-12 pb-8 bg-white border-b border-slate-200 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
          <Terminal size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">AI by Hand Visualizer</h1>
        <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
          블랙박스처럼 느껴지는 AI 모델들의 내부 연산을 직접 눈으로 확인하세요.<br/>
          행렬 곱셈부터 어텐션, 상태 업데이트까지 숫자가 어떻게 흘러가는지 한 단계씩 따라가며 이해할 수 있습니다.
        </p>
      </header>

      <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS.map(model => (
            <div 
              key={model.id}
              onClick={() => onSelect(model.id)}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${model.ready ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'} group-hover:scale-110 transition-transform`}>
                  {model.icon}
                </div>
                {!model.ready && (
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-400 rounded-full">Coming Soon</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{model.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                {model.desc}
              </p>
              <div className="mt-6 flex items-center text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                탐색하기 <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 4. MAIN APP ENTRY POINT
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  // 라우팅 처리
  if (currentView === 'home') {
    return <HomeScreen onSelect={setCurrentView} />;
  }

  if (currentView === 'rnn') {
    return <RNNView onBack={handleBackToHome} />;
  }

  // 준비되지 않은 모델들 처리
  const selectedModel = MODELS.find(m => m.id === currentView);
  return <PlaceholderView model={selectedModel} onBack={handleBackToHome} />;
}