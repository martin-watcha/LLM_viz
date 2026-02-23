import { ChevronRight, Terminal } from 'lucide-react';
import { MODELS } from '../config/models';

const HomeScreen = ({ onSelect }) => (
  <div className="flex flex-col h-full bg-slate-50 overflow-y-auto select-none">
    <header className="px-8 pt-12 pb-8 bg-white border-b border-slate-200 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
        <Terminal size={32} className="text-white" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">AI by Hand Visualizer</h1>
      <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
        블랙박스처럼 느껴지는 AI 모델들의 내부 연산을 직접 눈으로 확인하세요.<br />
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
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-400 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{model.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed flex-1">{model.desc}</p>
            <div className="mt-6 flex items-center text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              탐색하기 <ChevronRight size={14} className="ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomeScreen;
