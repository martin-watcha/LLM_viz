import Matrix from '../../../components/Matrix';
import SoftmaxChart from '../../../components/SoftmaxChart';
import LossDisplay from '../../../components/LossDisplay';
import AttentionHeatmap from './AttentionHeatmap';
import ScaleMask from './ScaleMask';
import PosEncoding from './PosEncoding';
import FfnRelu from './FfnRelu';
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
                <span className="block text-slate-400 mb-1.5 font-sans text-sm">Task:</span> Seq2Seq
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-slate-400 mb-1.5 font-sans text-sm">Source (Encoder):</span> [{data.source.join(', ')}]
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-slate-400 mb-1.5 font-sans text-sm">Target input (Decoder):</span> [{data.targetIn.join(', ')}]
              </div>
              <div className="bg-slate-50 p-4 rounded-lg col-span-2">
                <span className="block text-slate-400 mb-1.5 font-sans text-sm">Target output:</span> [{data.targetOut.join(', ')}]
              </div>
            </div>
          </div>
          {data.paramGroups.map((group, gi) => (
            <div key={gi} className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-700 mb-4 border-b border-slate-100 pb-3 select-none">{group.label}</h3>
              <div className="flex flex-wrap gap-6 justify-center">
                {group.matrices.map((m, mi) => (
                  <Matrix key={mi} data={m.data} label={m.label} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'full_embed':
      return (
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <Matrix data={data.E} highlightRows={data.indices} label="E (Embedding)" />
          </div>
          <div className="text-2xl text-slate-300">&rarr;</div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-blue-600 mb-2 font-mono font-bold">
              Tokens: {data.seq.map(t => `"${t}"`).join(', ')}
            </div>
            <Matrix data={data.X} label={`X (${data.X.length}×${data.X[0].length})`} />
          </div>
        </div>
      );

    case 'pos_enc':
      return (
        <PosEncoding
          X={data.X} PE={data.PE} result={data.result}
          xLabel={data.xLabel} peLabel={data.peLabel} resultLabel={data.resultLabel}
        />
      );

    case 'matmul_mm':
      return (
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Matrix data={data.left}   label={data.leftLabel} />
          <div className="text-2xl font-bold text-slate-300">&times;</div>
          <Matrix data={data.right}  label={data.rightLabel} />
          <div className="text-2xl font-bold text-slate-300">=</div>
          <Matrix data={data.result} label={data.resultLabel} />
        </div>
      );

    case 'scale_mask':
      return <ScaleMask rawScores={data.rawScores} scaledScores={data.scaledScores} dk={data.dk} causal={data.causal} />;

    case 'attn_heatmap':
      return (
        <AttentionHeatmap
          attention={data.attention}
          seq={data.seq}
          colSeq={data.colSeq}
          causal={data.causal}
          rowLabel={data.rowLabel}
          colLabel={data.colLabel}
        />
      );

    case 'ffn_relu':
      return (
        <FfnRelu
          input={data.input} weight={data.weight}
          preAct={data.preAct} postAct={data.postAct}
          inputLabel={data.inputLabel} weightLabel={data.weightLabel}
        />
      );

    case 'matmul':
      return (
        <div className="flex items-center justify-center gap-4">
          <Matrix data={data.left}   label={data.leftLabel} />
          <div className="text-2xl font-bold text-slate-300">&times;</div>
          <Matrix data={data.right}  label={data.rightLabel} />
          <div className="text-2xl font-bold text-slate-300">=</div>
          <Matrix data={data.result} highlightCol={0} label="Logits" />
        </div>
      );

    case 'softmax':
      return <SoftmaxChart output={data.output} targetIdx={data.target_idx} vocab={VOCAB} />;

    case 'loss':
      return <LossDisplay data={data} vocab={VOCAB} />;

    default:
      return null;
  }
};

export default StepRenderer;
