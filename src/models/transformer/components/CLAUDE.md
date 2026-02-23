# src/models/transformer/components/

## Components

### FlowDiagram.jsx
2-block horizontal pipeline: Encoder → Decoder, each with sub-block labels.
Props: `currentPhaseIdx: number`

### FormulaBar.jsx
Full-width formula bar with three groups: Enc | Dec | Out.
Uses `HIGHLIGHT_MAP` keyed by `currentS.id` (e.g., `'p0_s3'`) to highlight active terms.
Props: `currentS: substep object`

### StepRenderer.jsx
Switch on `stepData.type`. Types:
- `init` — Dataset + parameter group tables
- `full_embed` — E matrix with highlighted rows + X matrix
- `pos_enc` — PosEncoding component (X + PE = X_pe)
- `matmul_mm` — matrix × matrix = matrix
- `scale_mask` — ScaleMask component
- `attn_heatmap` — AttentionHeatmap component
- `ffn_relu` — FfnRelu component (input × W1 → ReLU)
Reused shared types: `matmul`, `softmax`, `loss`

### PosEncoding.jsx
Props: `X, PE, result, xLabel, peLabel, resultLabel`
Three matrices side by side: [X] + [PE] = [X_pe]

### FfnRelu.jsx
Props: `input, weight, preAct, postAct, inputLabel, weightLabel`
Shows: [input] × [W1] = [pre_act] → ReLU → [post_act]
Negative values in pre_act shown in red; zeroed cells in post_act shown in grey.

### AttentionHeatmap.jsx
Props: `attention: number[][]`, `seq: string[]`, `colSeq?: string[]`, `causal: boolean`
Colored grid (blue intensity = weight). Masked cells (j > i) shown as `—`.

### ScaleMask.jsx
Props: `rawScores: number[][]`, `scaledScores: number[][]`, `dk: number`, `causal: boolean`
Side-by-side comparison of raw scores vs scaled+masked scores.
