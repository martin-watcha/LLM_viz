export const VOCAB      = ["I", "like", "cats", "dogs", "<s>"];
export const SOURCE     = ["I", "like", "cats"];       // Encoder input  → idx [0,1,2]
export const TARGET_IN  = ["<s>", "cats", "like"];     // Decoder input  → idx [4,2,1]
export const TARGET_OUT = ["cats", "like", "dogs"];    // Decoder target

// ── Positional Encoding (sinusoidal, d_model=2) ─────────────────────────────
// PE(pos, 2i)   = sin(pos / 10000^(2i/d_model)) → dim0 = sin(pos)
// PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model)) → dim1 = cos(pos)
export const PE = [[0.000, 1.000], [0.841, 0.540], [0.909, -0.416]];

export const MODEL_PARAMS = {
  E:    [[0.1, 0.9], [0.9, 0.1], [0.5, 0.5], [0.8, 0.3], [0.2, 0.7]],  // 5×2
  // Encoder Self-Attention
  Wq_e: [[2.0, -1.0], [-1.0, 2.0]],   // 2×2
  Wk_e: [[2.0,  0.0], [ 0.0, 2.0]],   // 2×2
  Wv_e: [[0.8,  0.2], [ 0.2, 0.9]],   // 2×2
  // Encoder FFN
  W1_e: [[0.5, -0.3, 0.8, 0.1], [-0.4, 0.7, 0.2, -0.6]],  // 2×4
  W2_e: [[0.6, -0.2], [0.3, 0.5], [-0.1, 0.8], [0.4, -0.3]], // 4×2
  // Decoder Masked Self-Attention
  Wq_d: [[-1.0, 2.0], [2.0, -1.0]],   // 2×2
  Wk_d: [[ 2.0, 0.5], [0.5, -1.0]],   // 2×2
  Wv_d: [[ 0.9, 0.1], [0.1,  0.8]],   // 2×2
  // Decoder FFN
  W1_d: [[0.3, 0.6, -0.4, 0.2], [0.7, -0.2, 0.5, -0.3]],  // 2×4
  W2_d: [[-0.3, 0.7], [0.5, 0.1], [0.2, -0.4], [0.6, 0.3]], // 4×2
  // Cross-Attention
  Wq_c: [[ 3.0, -2.0], [-2.0,  3.0]], // 2×2
  Wk_c: [[ 2.0,  1.0], [-1.0,  2.0]], // 2×2
  Wv_c: [[ 0.6,  0.3], [ 0.3,  0.7]], // 2×2
  // Output
  Wo:   [[0.3, 0.5], [0.6, 0.2], [0.4, 0.4], [0.2, 0.8], [0.5, 0.3]],  // 5×2
};

// ── Encoder pre-computed values ────────────────────────────────────────────
const X_enc     = [[0.1, 0.9], [0.9, 0.1], [0.5, 0.5]];
const X_enc_pe  = [[0.100, 1.900], [1.741, 0.640], [1.409, 0.084]];
const Q_enc     = [[-1.700, 3.700], [2.843, -0.461], [2.735, -1.242]];
const K_enc     = [[0.200, 3.800], [3.483, 1.281], [2.819, 0.168]];
const V_enc     = [[0.460, 1.730], [1.521, 0.925], [1.144, 0.357]];
const RAW_SCORES_ENC    = [[13.720, -1.183, -4.171], [-1.183, 9.311, 7.935], [-4.171, 7.935, 7.500]];
const SCALED_SCORES_ENC = [[9.702, -0.836, -2.949], [-0.836, 6.584, 5.611], [-2.949, 5.611, 5.303]];
const ATTN_ENC          = [[1.000, 0.000, 0.000], [0.000, 0.725, 0.274], [0.000, 0.576, 0.424]];
const ENC_ATTN_OUT      = [[0.460, 1.730], [1.417, 0.769], [1.361, 0.684]];
// Encoder FFN
const ENC_FFN_PRE  = [[-0.462, 1.073, 0.714, -0.992], [0.401, 0.113, 1.288, -0.320], [0.407, 0.071, 1.226, -0.274]];
const ENC_FFN_POST = [[0.000, 1.073, 0.714, 0.000], [0.401, 0.113, 1.288, 0.000], [0.407, 0.071, 1.226, 0.000]];
const ENC_OUT       = [[0.250, 1.108], [0.146, 1.007], [0.143, 0.935]];

// ── Decoder pre-computed values ────────────────────────────────────────────
const X_dec     = [[0.2, 0.7], [0.5, 0.5], [0.9, 0.1]];
const X_dec_pe  = [[0.200, 1.700], [1.341, 1.040], [1.809, -0.316]];
const Q_dec     = [[3.200, -1.300], [0.739, 1.643], [-2.442, 3.935]];
const K_dec     = [[1.250, -1.600], [3.203, -0.370], [3.461, 1.221]];
const V_dec     = [[0.350, 1.380], [1.311, 0.966], [1.597, -0.072]];
const RAW_SCORES_DEC    = [[6.080, 10.730, 9.487], [-1.704, 1.760, 4.563], [-9.348, -9.275, -3.646]];
const SCALED_SCORES_DEC = [[4.299, 7.587, 6.708], [-1.205, 1.245, 3.227], [-6.610, -6.558, -2.578]];
const ATTN_DEC          = [[1.000, 0.000, 0.000], [0.079, 0.921, 0.000], [0.017, 0.018, 0.965]];
const DEC_ATTN_OUT      = [[0.350, 1.380], [1.235, 0.999], [1.570, -0.028]];

// ── Cross-Attention pre-computed values ────────────────────────────────────
const Q_cross     = [[-1.710, 3.440], [1.706, 0.528], [4.768, -3.226]];
const K_cross     = [[-0.607, 2.466], [-0.715, 2.159], [-0.649, 2.012]];
const V_cross     = [[0.483, 0.851], [0.389, 0.748], [0.366, 0.697]];
const RAW_SCORES_CROSS    = [[9.520, 8.651, 8.032], [0.266, -0.081, -0.046], [-10.847, -10.375, -9.586]];
const SCALED_SCORES_CROSS = [[6.732, 6.117, 5.679], [0.188, -0.057, -0.032], [-7.670, -7.336, -6.778]];
const ATTN_CROSS          = [[0.529, 0.286, 0.185], [0.387, 0.303, 0.310], [0.207, 0.289, 0.504]];
const CROSS_OUT           = [[0.434, 0.793], [0.418, 0.772], [0.397, 0.744]];

// ── Decoder FFN pre-computed values ────────────────────────────────────────
const DEC_FFN_PRE  = [[0.685, 0.102, 0.223, -0.151], [0.666, 0.097, 0.219, -0.148], [0.640, 0.089, 0.213, -0.144]];
const DEC_FFN_POST = [[0.685, 0.102, 0.223, 0.000], [0.666, 0.097, 0.219, 0.000], [0.640, 0.089, 0.213, 0.000]];
const DEC_OUT       = [[-0.110, 0.401], [-0.108, 0.388], [-0.105, 0.371]];

// ── Output pre-computed values ─────────────────────────────────────────────
const LOGITS = [0.154, 0.012, 0.107, 0.276, 0.059];
const PROBS  = [0.206, 0.178, 0.196, 0.232, 0.187];
const LOSS   = 1.459;

// ── STEPS_DATA: 2 phases, 31 substeps ───────────────────────────────────────
export const STEPS_DATA = [
  // ═══ Phase 0 — Encoder ═══
  {
    phase: 0, label: "Encoder",
    substeps: [
      {
        id: "p0_s1", type: "init",
        title: "Encoder 데이터셋 & 파라미터",
        desc: "Encoder 입력 시퀀스와 관련 파라미터를 확인합니다.",
        data: {
          vocab: VOCAB,
          source: SOURCE,
          targetIn: TARGET_IN,
          targetOut: TARGET_OUT,
          paramGroups: [
            { label: "Shared Embedding", matrices: [
              { data: MODEL_PARAMS.E, label: "E (5×2)" },
            ]},
            { label: "Encoder Self-Attention", matrices: [
              { data: MODEL_PARAMS.Wq_e, label: "Wq_e (2×2)" },
              { data: MODEL_PARAMS.Wk_e, label: "Wk_e (2×2)" },
              { data: MODEL_PARAMS.Wv_e, label: "Wv_e (2×2)" },
            ]},
            { label: "Encoder FFN (d_ff=4)", matrices: [
              { data: MODEL_PARAMS.W1_e, label: "W1_e (2×4)" },
              { data: MODEL_PARAMS.W2_e, label: "W2_e (4×2)" },
            ]},
          ],
        },
        formula: <span>Initialize Encoder</span>,
      },
      {
        id: "p0_s2", type: "full_embed",
        title: "① Encoder Embedding",
        desc: "Source 토큰을 Embedding Matrix에서 lookup → 입력 행렬 X_enc 구성",
        data: { E: MODEL_PARAMS.E, X: X_enc, indices: [0, 1, 2], seq: SOURCE },
        formula: <span>X<sub>enc</sub> = E[source]</span>,
      },
      {
        id: "p0_s3", type: "pos_enc",
        title: "② X_enc + PE → X_enc_pe",
        desc: "Sinusoidal Positional Encoding을 더해 위치 정보 부여 (dim0=sin, dim1=cos)",
        data: {
          X: X_enc, PE: PE, result: X_enc_pe,
          xLabel: "X_enc (3×2)", peLabel: "PE (3×2)", resultLabel: "X_enc_pe (3×2)",
        },
        formula: <span>X<sub>enc_pe</sub> = X<sub>enc</sub> + PE</span>,
      },
      {
        id: "p0_s4", type: "matmul_mm",
        title: "③ Q_enc = X_enc_pe · Wq_e",
        desc: "PE가 반영된 Encoder 입력에 Query 가중치를 곱해 Q 생성",
        data: { left: X_enc_pe, right: MODEL_PARAMS.Wq_e, result: Q_enc,
                leftLabel: "X_enc_pe (3×2)", rightLabel: "Wq_e (2×2)", resultLabel: "Q_enc (3×2)" },
        formula: <span>Q<sub>enc</sub> = X<sub>enc_pe</sub> · W<sub>q_e</sub></span>,
      },
      {
        id: "p0_s5", type: "matmul_mm",
        title: "④ K_enc = X_enc_pe · Wk_e",
        desc: "PE가 반영된 Encoder 입력에 Key 가중치를 곱해 K 생성",
        data: { left: X_enc_pe, right: MODEL_PARAMS.Wk_e, result: K_enc,
                leftLabel: "X_enc_pe (3×2)", rightLabel: "Wk_e (2×2)", resultLabel: "K_enc (3×2)" },
        formula: <span>K<sub>enc</sub> = X<sub>enc_pe</sub> · W<sub>k_e</sub></span>,
      },
      {
        id: "p0_s6", type: "matmul_mm",
        title: "⑤ V_enc = X_enc_pe · Wv_e",
        desc: "PE가 반영된 Encoder 입력에 Value 가중치를 곱해 V 생성",
        data: { left: X_enc_pe, right: MODEL_PARAMS.Wv_e, result: V_enc,
                leftLabel: "X_enc_pe (3×2)", rightLabel: "Wv_e (2×2)", resultLabel: "V_enc (3×2)" },
        formula: <span>V<sub>enc</sub> = X<sub>enc_pe</sub> · W<sub>v_e</sub></span>,
      },
      {
        id: "p0_s7", type: "scale_mask",
        title: "⑥ Encoder Score / √d_k (양방향)",
        desc: "Q·Kᵀ 스코어를 √d_k로 나눔 — Encoder는 마스크 없이 양방향 참조",
        data: { rawScores: RAW_SCORES_ENC, scaledScores: SCALED_SCORES_ENC, dk: 2, causal: false },
        formula: <span>Score<sub>enc</sub> / √d<sub>k</sub></span>,
      },
      {
        id: "p0_s8", type: "attn_heatmap",
        title: "⑦ Encoder Attention (Softmax)",
        desc: "행(row)별 Softmax → 각 토큰이 모든 토큰에 양방향으로 집중",
        data: { attention: ATTN_ENC, seq: SOURCE, causal: false },
        formula: <span>Attn<sub>enc</sub> = softmax(Score / √d<sub>k</sub>)</span>,
      },
      {
        id: "p0_s9", type: "matmul_mm",
        title: "⑧ Enc_attn_out = Attn_enc · V_enc",
        desc: "Attention 가중치로 Value를 가중 평균 → Self-Attention 출력",
        data: { left: ATTN_ENC, right: V_enc, result: ENC_ATTN_OUT,
                leftLabel: "Attn_enc (3×3)", rightLabel: "V_enc (3×2)", resultLabel: "Enc_attn_out (3×2)" },
        formula: <span>Enc<sub>attn_out</sub> = Attn<sub>enc</sub> · V<sub>enc</sub></span>,
      },
      {
        id: "p0_s10", type: "ffn_relu",
        title: "⑨ FFN Layer 1: ReLU(x · W1_e)",
        desc: "Self-Attention 출력을 FFN의 첫 번째 층에 통과 → ReLU 활성화",
        data: {
          input: ENC_ATTN_OUT, weight: MODEL_PARAMS.W1_e,
          preAct: ENC_FFN_PRE, postAct: ENC_FFN_POST,
          inputLabel: "Enc_attn_out (3×2)", weightLabel: "W1_e (2×4)",
        },
        formula: <span>h = ReLU(Enc<sub>attn_out</sub> · W<sub>1_e</sub>)</span>,
      },
      {
        id: "p0_s11", type: "matmul_mm",
        title: "⑩ FFN Layer 2: h · W2_e = Enc_out",
        desc: "ReLU 출력을 두 번째 층에 통과 → Encoder 최종 출력",
        data: { left: ENC_FFN_POST, right: MODEL_PARAMS.W2_e, result: ENC_OUT,
                leftLabel: "hidden (3×4)", rightLabel: "W2_e (4×2)", resultLabel: "Enc_out (3×2)" },
        formula: <span>Enc<sub>out</sub> = h · W<sub>2_e</sub></span>,
      },
    ],
  },

  // ═══ Phase 1 — Decoder ═══
  {
    phase: 1, label: "Decoder",
    substeps: [
      {
        id: "p1_s1", type: "init",
        title: "Decoder 데이터셋 & 파라미터",
        desc: "Decoder 입력 시퀀스와 관련 파라미터를 확인합니다.",
        data: {
          vocab: VOCAB,
          source: SOURCE,
          targetIn: TARGET_IN,
          targetOut: TARGET_OUT,
          paramGroups: [
            { label: "Decoder Masked Self-Attention", matrices: [
              { data: MODEL_PARAMS.Wq_d, label: "Wq_d (2×2)" },
              { data: MODEL_PARAMS.Wk_d, label: "Wk_d (2×2)" },
              { data: MODEL_PARAMS.Wv_d, label: "Wv_d (2×2)" },
            ]},
            { label: "Cross-Attention", matrices: [
              { data: MODEL_PARAMS.Wq_c, label: "Wq_c (2×2)" },
              { data: MODEL_PARAMS.Wk_c, label: "Wk_c (2×2)" },
              { data: MODEL_PARAMS.Wv_c, label: "Wv_c (2×2)" },
            ]},
            { label: "Decoder FFN (d_ff=4)", matrices: [
              { data: MODEL_PARAMS.W1_d, label: "W1_d (2×4)" },
              { data: MODEL_PARAMS.W2_d, label: "W2_d (4×2)" },
            ]},
            { label: "Output Projection", matrices: [
              { data: MODEL_PARAMS.Wo, label: "Wo (5×2)" },
            ]},
          ],
        },
        formula: <span>Initialize Decoder</span>,
      },
      {
        id: "p1_s2", type: "full_embed",
        title: "⑪ Decoder Embedding",
        desc: "Target 토큰을 Embedding Matrix에서 lookup → 입력 행렬 X_dec 구성",
        data: { E: MODEL_PARAMS.E, X: X_dec, indices: [4, 2, 1], seq: TARGET_IN },
        formula: <span>X<sub>dec</sub> = E[target]</span>,
      },
      {
        id: "p1_s3", type: "pos_enc",
        title: "⑫ X_dec + PE → X_dec_pe",
        desc: "Sinusoidal Positional Encoding을 더해 위치 정보 부여",
        data: {
          X: X_dec, PE: PE, result: X_dec_pe,
          xLabel: "X_dec (3×2)", peLabel: "PE (3×2)", resultLabel: "X_dec_pe (3×2)",
        },
        formula: <span>X<sub>dec_pe</sub> = X<sub>dec</sub> + PE</span>,
      },
      {
        id: "p1_s4", type: "matmul_mm",
        title: "⑬ Q_dec = X_dec_pe · Wq_d",
        desc: "PE가 반영된 Decoder 입력에 Query 가중치를 곱해 Q 생성",
        data: { left: X_dec_pe, right: MODEL_PARAMS.Wq_d, result: Q_dec,
                leftLabel: "X_dec_pe (3×2)", rightLabel: "Wq_d (2×2)", resultLabel: "Q_dec (3×2)" },
        formula: <span>Q<sub>dec</sub> = X<sub>dec_pe</sub> · W<sub>q_d</sub></span>,
      },
      {
        id: "p1_s5", type: "matmul_mm",
        title: "⑭ K_dec = X_dec_pe · Wk_d",
        desc: "PE가 반영된 Decoder 입력에 Key 가중치를 곱해 K 생성",
        data: { left: X_dec_pe, right: MODEL_PARAMS.Wk_d, result: K_dec,
                leftLabel: "X_dec_pe (3×2)", rightLabel: "Wk_d (2×2)", resultLabel: "K_dec (3×2)" },
        formula: <span>K<sub>dec</sub> = X<sub>dec_pe</sub> · W<sub>k_d</sub></span>,
      },
      {
        id: "p1_s6", type: "matmul_mm",
        title: "⑮ V_dec = X_dec_pe · Wv_d",
        desc: "PE가 반영된 Decoder 입력에 Value 가중치를 곱해 V 생성",
        data: { left: X_dec_pe, right: MODEL_PARAMS.Wv_d, result: V_dec,
                leftLabel: "X_dec_pe (3×2)", rightLabel: "Wv_d (2×2)", resultLabel: "V_dec (3×2)" },
        formula: <span>V<sub>dec</sub> = X<sub>dec_pe</sub> · W<sub>v_d</sub></span>,
      },
      {
        id: "p1_s7", type: "scale_mask",
        title: "⑯ Decoder Score / √d_k + Causal Mask",
        desc: "스케일링 후, 미래 토큰(상삼각)을 -∞로 마스킹 → Decoder는 과거만 참조",
        data: { rawScores: RAW_SCORES_DEC, scaledScores: SCALED_SCORES_DEC, dk: 2, causal: true },
        formula: <span>Mask(Score<sub>dec</sub> / √d<sub>k</sub>)</span>,
      },
      {
        id: "p1_s8", type: "attn_heatmap",
        title: "⑰ Decoder Attention (Softmax)",
        desc: "행(row)별 Softmax → 각 토큰이 과거 토큰에만 집중 (Causal)",
        data: { attention: ATTN_DEC, seq: TARGET_IN, causal: true },
        formula: <span>Attn<sub>dec</sub> = softmax(Mask(Score / √d<sub>k</sub>))</span>,
      },
      {
        id: "p1_s9", type: "matmul_mm",
        title: "⑱ Dec_attn_out = Attn_dec · V_dec",
        desc: "Masked Attention으로 Value 가중 평균 → Decoder Self-Attention 출력",
        data: { left: ATTN_DEC, right: V_dec, result: DEC_ATTN_OUT,
                leftLabel: "Attn_dec (3×3)", rightLabel: "V_dec (3×2)", resultLabel: "Dec_attn_out (3×2)" },
        formula: <span>Dec<sub>attn_out</sub> = Attn<sub>dec</sub> · V<sub>dec</sub></span>,
      },
      {
        id: "p1_s10", type: "matmul_mm",
        title: "⑲ Q_c = Dec_attn_out · Wq_c",
        desc: "Cross-Attention의 Query는 Decoder Self-Attention 출력에서 생성",
        data: { left: DEC_ATTN_OUT, right: MODEL_PARAMS.Wq_c, result: Q_cross,
                leftLabel: "Dec_attn_out (3×2)", rightLabel: "Wq_c (2×2)", resultLabel: "Q_c (3×2)" },
        formula: <span>Q<sub>c</sub> = Dec<sub>attn_out</sub> · W<sub>q_c</sub></span>,
      },
      {
        id: "p1_s11", type: "matmul_mm",
        title: "⑳ K_c = Enc_out · Wk_c",
        desc: "Cross-Attention의 Key는 Encoder 출력에서 생성",
        data: { left: ENC_OUT, right: MODEL_PARAMS.Wk_c, result: K_cross,
                leftLabel: "Enc_out (3×2)", rightLabel: "Wk_c (2×2)", resultLabel: "K_c (3×2)" },
        formula: <span>K<sub>c</sub> = Enc<sub>out</sub> · W<sub>k_c</sub></span>,
      },
      {
        id: "p1_s12", type: "matmul_mm",
        title: "㉑ V_c = Enc_out · Wv_c",
        desc: "Cross-Attention의 Value는 Encoder 출력에서 생성",
        data: { left: ENC_OUT, right: MODEL_PARAMS.Wv_c, result: V_cross,
                leftLabel: "Enc_out (3×2)", rightLabel: "Wv_c (2×2)", resultLabel: "V_c (3×2)" },
        formula: <span>V<sub>c</sub> = Enc<sub>out</sub> · W<sub>v_c</sub></span>,
      },
      {
        id: "p1_s13", type: "scale_mask",
        title: "㉒ Cross Score / √d_k (마스크 없음)",
        desc: "Decoder Q와 Encoder K의 유사도 → 스케일링만, 마스크 없음",
        data: { rawScores: RAW_SCORES_CROSS, scaledScores: SCALED_SCORES_CROSS, dk: 2, causal: false,
                rowSeq: TARGET_IN, colSeq: SOURCE },
        formula: <span>Score<sub>cross</sub> / √d<sub>k</sub></span>,
      },
      {
        id: "p1_s14", type: "attn_heatmap",
        title: "㉓ Cross-Attention (Softmax)",
        desc: "Decoder가 Encoder의 어떤 토큰에 집중하는지 — 행=Decoder, 열=Encoder",
        data: { attention: ATTN_CROSS, seq: TARGET_IN, colSeq: SOURCE, causal: false,
                rowLabel: "Decoder", colLabel: "Encoder" },
        formula: <span>Attn<sub>cross</sub> = softmax(Score / √d<sub>k</sub>)</span>,
      },
      {
        id: "p1_s15", type: "matmul_mm",
        title: "㉔ Cross_out = Attn_cross · V_c",
        desc: "Cross-Attention으로 Encoder Value를 가중 평균 → Cross 출력",
        data: { left: ATTN_CROSS, right: V_cross, result: CROSS_OUT,
                leftLabel: "Attn_cross (3×3)", rightLabel: "V_c (3×2)", resultLabel: "Cross_out (3×2)" },
        formula: <span>Cross<sub>out</sub> = Attn<sub>cross</sub> · V<sub>c</sub></span>,
      },
      {
        id: "p1_s16", type: "ffn_relu",
        title: "㉕ FFN Layer 1: ReLU(x · W1_d)",
        desc: "Cross-Attention 출력을 FFN의 첫 번째 층에 통과 → ReLU 활성화",
        data: {
          input: CROSS_OUT, weight: MODEL_PARAMS.W1_d,
          preAct: DEC_FFN_PRE, postAct: DEC_FFN_POST,
          inputLabel: "Cross_out (3×2)", weightLabel: "W1_d (2×4)",
        },
        formula: <span>h = ReLU(Cross<sub>out</sub> · W<sub>1_d</sub>)</span>,
      },
      {
        id: "p1_s17", type: "matmul_mm",
        title: "㉖ FFN Layer 2: h · W2_d = Dec_out",
        desc: "ReLU 출력을 두 번째 층에 통과 → Decoder 최종 출력",
        data: { left: DEC_FFN_POST, right: MODEL_PARAMS.W2_d, result: DEC_OUT,
                leftLabel: "hidden (3×4)", rightLabel: "W2_d (4×2)", resultLabel: "Dec_out (3×2)" },
        formula: <span>Dec<sub>out</sub> = h · W<sub>2_d</sub></span>,
      },
      {
        id: "p1_s18", type: "matmul",
        title: "㉗ Logits = Wo · dec_out[-1]",
        desc: "마지막 위치의 Decoder 출력으로 다음 토큰 예측 logits 계산",
        data: { left: MODEL_PARAMS.Wo, right: DEC_OUT[2], result: LOGITS,
                leftLabel: "Wo (5×2)", rightLabel: "ctx[-1]" },
        formula: <span>z = W<sub>o</sub> · dec_out<sub>[-1]</sub></span>,
      },
      {
        id: "p1_s19", type: "softmax",
        title: "㉘ Softmax → 확률 분포",
        desc: "Logits → 다음 토큰 예측 확률 분포",
        data: { input: LOGITS, output: PROBS, target_idx: 3 },
        formula: <span>ŷ = softmax(z)</span>,
      },
      {
        id: "p1_s20", type: "loss",
        title: "㉙ Loss 계산",
        desc: '-log(P("dogs")) = -log(0.232) = 1.459',
        data: { targetToken: "dogs", targetIdx: 3, probs: PROBS, loss: LOSS },
        formula: <span>L = -log(P("dogs"))</span>,
      },
    ],
  },
];
