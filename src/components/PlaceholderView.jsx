import { ArrowLeft } from 'lucide-react';

const PlaceholderView = ({ model, onBack }) => (
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
        {model.desc}<br />
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

export default PlaceholderView;
