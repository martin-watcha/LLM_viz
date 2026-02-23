import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw,
  Activity, FastForward, Rewind, ArrowLeft,
} from 'lucide-react';
import { STEPS_DATA } from './data';
import FlowDiagram from './components/FlowDiagram';
import FormulaBar from './components/FormulaBar';
import StepRenderer from './components/StepRenderer';

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

  const jumpToStep = (tIdx, sIdx) => {
    setTIndex(tIdx);
    setSubStepIndex(sIdx);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(handleNext, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, handleNext, speed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') { e.preventDefault(); setIsPlaying(prev => !prev); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const totalSteps = STEPS_DATA.reduce((acc, step) => acc + step.substeps.length, 0);
  let currentAbsoluteStep = 0;
  for (let i = 0; i < tIndex; i++) currentAbsoluteStep += STEPS_DATA[i].substeps.length;
  currentAbsoluteStep += subStepIndex + 1;
  const progressPercent = (currentAbsoluteStep / totalSteps) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 select-none">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors" title="Back to Home">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-blue-600" />
            <h1 className="text-sm font-bold text-slate-700">RNN</h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-slate-200 flex-col overflow-y-auto hidden md:flex shrink-0 select-none">
          <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase sticky top-0 z-10">
            Timeline
          </div>
          <div className="p-3 space-y-5">
            {STEPS_DATA.map((t, ti) => (
              <div key={ti}>
                <div
                  className={`flex items-center mb-2 cursor-pointer text-sm font-bold ${ti === tIndex ? 'text-blue-600' : 'text-slate-500'}`}
                  onClick={() => jumpToStep(ti, 0)}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 text-[10px] ${ti === tIndex ? 'bg-blue-100 text-blue-700' : 'bg-slate-100'}`}>
                    t{t.timestep}
                  </div>
                  {ti === 0 ? 'Init' : `Input: "${t.token}"`}
                </div>
                <div className="ml-2 pl-4 border-l border-slate-100 space-y-1">
                  {t.substeps.map((s, si) => {
                    const isActive = ti === tIndex && si === subStepIndex;
                    return (
                      <div
                        key={si}
                        onClick={() => jumpToStep(ti, si)}
                        className={`py-1.5 px-2 rounded cursor-pointer text-xs transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-400 hover:bg-slate-50'}`}
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

        {/* MAIN */}
        <main className="flex-1 flex flex-col bg-slate-50 overflow-y-auto min-w-0">
          <FlowDiagram currentT={currentT.timestep} />
          <FormulaBar currentT={currentT.timestep} currentS={currentS} />

          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-10 select-none">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">{currentS.title}</h2>
              <p className="text-sm text-slate-500 bg-white px-5 py-2 rounded-full border border-slate-200 inline-block shadow-sm">
                {currentS.desc}
              </p>
            </div>
            <div className="w-full flex justify-center">
              <StepRenderer stepData={currentS} />
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 relative shrink-0 select-none">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-slate-100">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="p-3 flex items-center justify-between max-w-4xl mx-auto gap-4">
          <div className="text-[10px] text-slate-400 w-16">
            <span className="font-bold text-slate-600">{currentAbsoluteStep}</span> / {totalSteps}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => jumpToStep(0, 0)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400" title="Restart">
              <RotateCcw size={14} />
            </button>
            <button onClick={handlePrev} disabled={tIndex === 0 && subStepIndex === 0} className="p-1.5 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30" title="Previous (←)">
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${isPlaying ? 'bg-slate-400' : 'bg-blue-500'}`}
              title="Play/Pause (Space)"
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
            </button>
            <button onClick={handleNext} disabled={tIndex === STEPS_DATA.length - 1 && subStepIndex === currentT.substeps.length - 1} className="p-1.5 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30" title="Next (→)">
              <ChevronRight size={18} />
            </button>
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

export default RNNView;
