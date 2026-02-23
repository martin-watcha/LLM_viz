const PHASES = [
  {
    id: 0, label: 'Encoder',
    blocks: ['Embed+PE', 'Self-Attn', 'FFN'],
  },
  {
    id: 1, label: 'Decoder',
    blocks: ['Embed+PE', 'Masked-Attn', 'Cross-Attn', 'FFN', 'Output'],
  },
];

const FlowDiagram = ({ currentPhaseIdx }) => (
  <div className="w-full flex justify-center py-4 bg-slate-50 border-b border-slate-200 overflow-visible select-none">
    <div className="flex items-center gap-2 sm:gap-3">
      {PHASES.map((phase, idx) => {
        const isActive = currentPhaseIdx === idx;
        const isPast   = currentPhaseIdx > idx;

        return (
          <div key={phase.id} className="flex items-center">
            {/* Phase block with sub-blocks */}
            <div className={`flex flex-col items-center rounded-lg border transition-all
              ${isActive
                ? 'bg-blue-500 border-blue-600 shadow-md scale-105'
                : isPast
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-slate-50 border-slate-200'}`}
            >
              <span className={`text-xs font-bold px-3 pt-2 pb-1
                ${isActive ? 'text-white' : isPast ? 'text-blue-600' : 'text-slate-300'}`}>
                {phase.label}
              </span>
              <div className="flex gap-0.5 px-2 pb-2">
                {phase.blocks.map((block, bi) => (
                  <span
                    key={bi}
                    className={`text-[8px] px-1.5 py-0.5 rounded
                      ${isActive
                        ? 'bg-blue-400/50 text-blue-100'
                        : isPast
                          ? 'bg-blue-100 text-blue-500'
                          : 'bg-slate-100 text-slate-300'}`}
                  >
                    {block}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow between phases */}
            {idx < PHASES.length - 1 && (
              <svg
                className={`w-5 h-5 mx-1 transition-colors ${isPast ? 'text-blue-400' : 'text-slate-200'}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default FlowDiagram;
