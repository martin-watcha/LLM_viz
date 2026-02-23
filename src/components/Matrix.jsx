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
                const isHighlighted =
                  (highlightRow === i && highlightCol === -1) ||
                  (highlightCol === j && highlightRow === -1) ||
                  (highlightRow === i && highlightCol === j);
                return (
                  <div
                    key={j}
                    className={`w-10 h-6 m-[1px] flex items-center justify-center text-[10px] font-mono rounded-sm transition-colors
                      ${isHighlighted ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-50 text-slate-600'}`}
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

export default Matrix;
