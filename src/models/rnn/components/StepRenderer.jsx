import Matrix from '../../../components/Matrix';
import TanhGraph from '../../../components/TanhGraph';
import SoftmaxChart from '../../../components/SoftmaxChart';
import LossDisplay from '../../../components/LossDisplay';
import { VOCAB } from '../data';

const StepRenderer = ({ stepData }) => {
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
                {data.vocab.map((v, i) => <span key={i} className="mr-1">"{v}"</span>)}
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
      return <SoftmaxChart output={data.output} targetIdx={data.target_idx} vocab={VOCAB} />;

    case 'loss':
      return <LossDisplay data={data} vocab={VOCAB} />;

    default:
      return null;
  }
};

export default StepRenderer;
