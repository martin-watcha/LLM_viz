import React from 'react';
import { SEQUENCE } from '../data';

const FlowDiagram = ({ currentT }) => (
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
                {t > 0 && <span>ŷ<sub>{t}</sub></span>}
              </div>

              {/* Arrow h_t → y_t */}
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

              {/* Arrow x_t → h_t */}
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
                {t > 0 && (
                  <>
                    <span>x<sub>{t}</sub></span>
                    <span className="scale-75">"{SEQUENCE[t - 1]}"</span>
                  </>
                )}
              </div>
            </div>

            {/* Arrow h_{t-1} → h_t */}
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

export default FlowDiagram;
