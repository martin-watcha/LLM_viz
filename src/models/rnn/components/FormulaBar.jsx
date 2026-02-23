const FormulaBar = ({ currentT, currentS }) => {
  const stepNum = currentT === 0 ? 0 : parseInt(currentS.id.split('_s')[1] || "0", 10);
  const t = currentT === 0 ? 't' : currentT;
  const prevT = currentT === 0 ? 't-1' : currentT - 1;

  const getHighlight = (targetSteps) =>
    targetSteps.includes(stepNum)
      ? 'bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-md transition-all duration-300 border border-blue-200 shadow-sm mx-0.5'
      : 'text-slate-600 transition-all duration-300 mx-0.5';

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

      <div className="hidden md:block w-px h-5 bg-slate-300 mx-2" />

      <div className={`transition-opacity duration-300 flex items-center ${stepNum === 5 || stepNum === 6 ? 'opacity-100' : 'opacity-40'}`}>
        <span className={getHighlight([6])}>ŷ<sub>{t}</sub> = softmax(</span>
        <span className={getHighlight([5])}>W<sub>y</sub> &middot; h<sub>{t}</sub></span>
        <span className={getHighlight([6])}>)</span>
      </div>

      <div className="hidden md:block w-px h-5 bg-slate-300 mx-2" />

      <div className={`transition-opacity duration-300 flex items-center ${stepNum === 7 ? 'opacity-100' : 'opacity-40'}`}>
        <span className={getHighlight([7])}>L<sub>{t}</sub> = -log(ŷ<sub>{t}, target</sub>)</span>
      </div>
    </div>
  );
};

export default FormulaBar;
