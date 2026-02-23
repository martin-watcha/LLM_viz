const Matrix = ({ data, highlightRow = -1, highlightCol = -1, highlightRows = [], label = "" }) => {
  const is1D = Array.isArray(data) && !Array.isArray(data[0]);
  const renderData = is1D ? data.map(val => [val]) : data;

  return (
    <div className="flex flex-col items-center mx-2">
      {label && <span className="text-sm text-slate-400 mb-2 font-medium">{label}</span>}
      <div className="bg-white p-2 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-0.5">
          {renderData.map((row, i) => (
            <div key={i} className="flex gap-0.5">
              {row.map((val, j) => {
                const isHighlighted =
                  (highlightRows.length > 0 && highlightRows.includes(i) && highlightCol === -1) ||
                  (highlightRow === i && highlightCol === -1) ||
                  (highlightCol === j && highlightRow === -1) ||
                  (highlightRow === i && highlightCol === j);
                return (
                  <div
                    key={j}
                    className={`w-16 h-10 flex items-center justify-center text-sm font-mono rounded transition-colors
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
