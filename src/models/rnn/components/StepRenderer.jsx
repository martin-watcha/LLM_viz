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
        <div className="flex flex-col w-full max-w-4xl gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-700 mb-4 border-b border-slate-100 pb-3 select-none">토이 데이터셋</h3>
            <div className="grid grid-cols-2 gap-4 text-base text-slate-600 font-mono">
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-slate-400 mb-1.5 font-sans text-sm">Vocabulary:</span>
                {data.vocab.map((v, i) => <span key={i} className="mr-2">"{v}"</span>)}
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-slate-400 mb-1.5 font-sans text-sm">Task:</span> Next Token Prediction
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-slate-400 mb-1.5 font-sans text-sm">Input (x):</span> [{data.seq.join(', ')}]
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-slate-400 mb-1.5 font-sans text-sm">Target (y):</span> [{data.target.join(', ')}]
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-700 mb-4 border-b border-slate-100 pb-3 select-none">초기 파라미터</h3>
            <div className="flex flex-wrap gap-6 justify-center">
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
        <div className="flex items-center justify-center gap-6">
          <Matrix data={data.matrix} highlightRow={data.index} label="E (Embedding)" />
          <div className="text-2xl text-slate-300">&rarr;</div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-blue-600 mb-2 font-mono font-bold">Token: "{VOCAB[data.index]}"</div>
            <Matrix data={data.result} highlightCol={0} label="x (Input Vector)" />
          </div>
        </div>
      );

    case 'matmul':
      return (
        <div className="flex items-center justify-center gap-4">
          <Matrix data={data.left} label={data.leftLabel} />
          <div className="text-2xl font-bold text-slate-300">&times;</div>
          <Matrix data={data.right} label={data.rightLabel} />
          <div className="text-2xl font-bold text-slate-300">=</div>
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
