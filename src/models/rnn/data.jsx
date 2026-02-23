export const VOCAB = ["I", "like", "cats", "dogs"];
export const SEQUENCE = ["I", "like", "cats"];
export const TARGETS = ["like", "cats", "dogs"];

export const MODEL_PARAMS = {
  E: [
    [0.1, 0.9, 0.2],
    [0.8, 0.1, 0.5],
    [0.3, 0.7, 0.4],
    [0.6, 0.2, 0.8],
  ],
  Wh: [[0.5, -0.1], [0.2, 0.4]],
  Wx: [[0.3, 0.1, -0.2], [0.1, 0.4, 0.3]],
  b: [0, 0],
  Wy: [[0.6, -0.3], [-0.2, 0.8], [0.4, 0.1], [-0.1, 0.5]],
};

export const STEPS_DATA = [
  {
    timestep: 0,
    token: "Start",
    target: "-",
    substeps: [
      {
        id: "t0_s1", type: "init", title: "데이터셋 & 파라미터 초기화",
        desc: "모델 학습을 시작하기 전, 데이터셋과 파라미터(Weights)를 확인합니다.",
        data: { params: MODEL_PARAMS, vocab: VOCAB, seq: SEQUENCE, target: TARGETS },
        formula: <span>Initialize Model</span>,
      },
    ],
  },
  {
    timestep: 1, token: "I", target: "like",
    substeps: [
      { id: "t1_s1", type: "embed", title: "① Embedding Lookup", desc: "E[0] → x₁ = [0.1, 0.9, 0.2]", data: { matrix: MODEL_PARAMS.E, index: 0, result: [0.1, 0.9, 0.2] }, formula: <span>x<sub>1</sub> = E['I']</span> },
      { id: "t1_s2", type: "matmul", title: "② Wh · h₀", desc: "이전 hidden state(0)와의 곱", data: { left: MODEL_PARAMS.Wh, right: [0, 0], result: [0, 0], leftLabel: "Wh", rightLabel: "h₀" }, formula: <span>Wh &middot; h<sub>0</sub></span> },
      { id: "t1_s3", type: "matmul", title: "③ Wx · x₁", desc: "입력 embedding과의 곱", data: { left: MODEL_PARAMS.Wx, right: [0.1, 0.9, 0.2], result: [0.08, 0.43], leftLabel: "Wx", rightLabel: "x₁" }, formula: <span>Wx &middot; x<sub>1</sub></span> },
      { id: "t1_s4", type: "tanh", title: "④ tanh activation", desc: "비선형성 추가: h₁ = tanh(0.08, 0.43)", data: { input: [0.08, 0.43], output: [0.080, 0.405] }, formula: <span>h<sub>1</sub> = tanh(Wh&middot;h<sub>0</sub> + Wx&middot;x<sub>1</sub> + b)</span> },
      { id: "t1_s5", type: "matmul", title: "⑤ Wy · h₁ → logits", desc: "Hidden → Vocab 차원으로 매핑", data: { left: MODEL_PARAMS.Wy, right: [0.080, 0.405], result: [-0.074, 0.308, 0.073, 0.195], leftLabel: "Wy", rightLabel: "h₁" }, formula: <span>z<sub>1</sub> = Wy &middot; h<sub>1</sub></span> },
      { id: "t1_s6", type: "softmax", title: "⑥ Softmax", desc: "Logits → 확률 분포 변환", data: { input: [-0.074, 0.308, 0.073, 0.195], output: [0.203, 0.297, 0.235, 0.265], target_idx: 1 }, formula: <span>ŷ<sub>1</sub> = softmax(z<sub>1</sub>)</span> },
      { id: "t1_s7", type: "loss", title: "⑦ Loss 계산", desc: "Cross-Entropy Loss 계산", data: { targetToken: "like", targetIdx: 1, probs: [0.203, 0.297, 0.235, 0.265], loss: 1.214 }, formula: <span>L<sub>1</sub> = -log(P('like'))</span> },
    ],
  },
  {
    timestep: 2, token: "like", target: "cats",
    substeps: [
      { id: "t2_s1", type: "embed", title: "① Embedding Lookup", desc: "E[1] → x₂ = [0.8, 0.1, 0.5]", data: { matrix: MODEL_PARAMS.E, index: 1, result: [0.8, 0.1, 0.5] }, formula: <span>x<sub>2</sub> = E['like']</span> },
      { id: "t2_s2", type: "matmul", title: "② Wh · h₁", desc: "h₁ = [0.080, 0.405] 사용", data: { left: MODEL_PARAMS.Wh, right: [0.080, 0.405], result: [-0.0005, 0.178], leftLabel: "Wh", rightLabel: "h₁" }, formula: <span>Wh &middot; h<sub>1</sub></span> },
      { id: "t2_s3", type: "matmul", title: "③ Wx · x₂", desc: "x₂ = [0.8, 0.1, 0.5] 사용", data: { left: MODEL_PARAMS.Wx, right: [0.8, 0.1, 0.5], result: [0.15, 0.27], leftLabel: "Wx", rightLabel: "x₂" }, formula: <span>Wx &middot; x<sub>2</sub></span> },
      { id: "t2_s4", type: "tanh", title: "④ tanh activation", desc: "h₂ = tanh(0.1495, 0.448)", data: { input: [0.1495, 0.448], output: [0.148, 0.420] }, formula: <span>h<sub>2</sub> = tanh(Wh&middot;h<sub>1</sub> + Wx&middot;x<sub>2</sub> + b)</span> },
      { id: "t2_s5", type: "matmul", title: "⑤ Wy · h₂ → logits", desc: "Hidden h₂를 logits으로 변환", data: { left: MODEL_PARAMS.Wy, right: [0.148, 0.420], result: [-0.037, 0.306, 0.101, 0.195], leftLabel: "Wy", rightLabel: "h₂" }, formula: <span>z<sub>2</sub> = Wy &middot; h<sub>2</sub></span> },
      { id: "t2_s6", type: "softmax", title: "⑥ Softmax", desc: "Logits → 확률 분포", data: { input: [-0.037, 0.306, 0.101, 0.195], output: [0.208, 0.293, 0.239, 0.260], target_idx: 2 }, formula: <span>ŷ<sub>2</sub> = softmax(z<sub>2</sub>)</span> },
      { id: "t2_s7", type: "loss", title: "⑦ Loss 계산", desc: "-log(0.239) = 1.431", data: { targetToken: "cats", targetIdx: 2, probs: [0.208, 0.293, 0.239, 0.260], loss: 1.431 }, formula: <span>L<sub>2</sub> = -log(P('cats'))</span> },
    ],
  },
  {
    timestep: 3, token: "cats", target: "dogs",
    substeps: [
      { id: "t3_s1", type: "embed", title: "① Embedding Lookup", desc: "E[2] → x₃ = [0.3, 0.7, 0.4]", data: { matrix: MODEL_PARAMS.E, index: 2, result: [0.3, 0.7, 0.4] }, formula: <span>x<sub>3</sub> = E['cats']</span> },
      { id: "t3_s2", type: "matmul", title: "② Wh · h₂", desc: "h₂ = [0.148, 0.420] 사용", data: { left: MODEL_PARAMS.Wh, right: [0.148, 0.420], result: [0.032, 0.198], leftLabel: "Wh", rightLabel: "h₂" }, formula: <span>Wh &middot; h<sub>2</sub></span> },
      { id: "t3_s3", type: "matmul", title: "③ Wx · x₃", desc: "x₃ = [0.3, 0.7, 0.4] 사용", data: { left: MODEL_PARAMS.Wx, right: [0.3, 0.7, 0.4], result: [0.08, 0.43], leftLabel: "Wx", rightLabel: "x₃" }, formula: <span>Wx &middot; x<sub>3</sub></span> },
      { id: "t3_s4", type: "tanh", title: "④ tanh activation", desc: "h₃ = tanh(0.112, 0.628)", data: { input: [0.112, 0.628], output: [0.111, 0.556] }, formula: <span>h<sub>3</sub> = tanh(Wh&middot;h<sub>2</sub> + Wx&middot;x<sub>3</sub> + b)</span> },
      { id: "t3_s5", type: "matmul", title: "⑤ Wy · h₃ → logits", desc: "Hidden h₃를 logits으로 변환", data: { left: MODEL_PARAMS.Wy, right: [0.111, 0.556], result: [-0.100, 0.422, 0.100, 0.267], leftLabel: "Wy", rightLabel: "h₃" }, formula: <span>z<sub>3</sub> = Wy &middot; h<sub>3</sub></span> },
      { id: "t3_s6", type: "softmax", title: "⑥ Softmax", desc: "Logits → 확률 분포", data: { input: [-0.100, 0.422, 0.100, 0.267], output: [0.187, 0.315, 0.228, 0.270], target_idx: 3 }, formula: <span>ŷ<sub>3</sub> = softmax(z<sub>3</sub>)</span> },
      { id: "t3_s7", type: "loss", title: "⑦ Loss 계산", desc: "-log(0.270) = 1.309", data: { targetToken: "dogs", targetIdx: 3, probs: [0.187, 0.315, 0.228, 0.270], loss: 1.309 }, formula: <span>L<sub>3</sub> = -log(P('dogs'))</span> },
    ],
  },
];
