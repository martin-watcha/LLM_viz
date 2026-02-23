import Matrix from '../../../components/Matrix';

const PosEncoding = ({ X, PE, result, xLabel, peLabel, resultLabel }) => (
  <div className="flex items-center justify-center gap-4 flex-wrap">
    <Matrix data={X} label={xLabel} />
    <div className="text-2xl font-bold text-slate-300 select-none">+</div>
    <Matrix data={PE} label={peLabel} />
    <div className="text-2xl font-bold text-slate-300 select-none">=</div>
    <Matrix data={result} label={resultLabel} />
  </div>
);

export default PosEncoding;
