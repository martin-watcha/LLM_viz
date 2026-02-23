# src/models/

Each model is a self-contained module. One folder per model.

## Required Structure
```
models/{name}/
├── CLAUDE.md           # Model description, formula reference, data format
├── data.jsx            # All constants: vocab, params, STEPS_DATA
├── index.jsx           # The View: play/step state, layout, keyboard nav
└── components/
    ├── CLAUDE.md
    ├── FlowDiagram.jsx  # Architecture diagram showing current timestep
    ├── FormulaBar.jsx   # Formula highlighter tied to current substep
    └── StepRenderer.jsx # Switch on step type → correct visualization
```

## data.jsx Conventions
- Named exports: `VOCAB`, `MODEL_PARAMS`, `STEPS_DATA`
- `STEPS_DATA`: array of timestep/phase objects, each with a `substeps` array
- Formula JSX (`<span>...</span>`) is stored in each substep's `formula` field

## index.jsx Conventions
- State: `tIndex`, `subStepIndex`, `isPlaying`, `speed`
- `handleNext` / `handlePrev` as `useCallback`
- Keyboard: ArrowLeft, ArrowRight, Space via `useEffect`
- Layout: header → sidebar timeline → main content → footer controls

## Step Type Registry
`StepRenderer` switches on `substep.type`:

| type | Visualization | Used by |
|---|---|---|
| `init` | Parameter tables + dataset overview | RNN, Transformer |
| `embed` | Matrix with highlighted row → result vector | RNN |
| `matmul` | Left matrix × right vector = result | RNN |
| `tanh` | TanhGraph (shared) | RNN |
| `softmax` | SoftmaxChart (shared) | RNN |
| `loss` | LossDisplay (shared) | RNN |
| `full_embed` | E matrix with highlighted rows → X matrix | Transformer |
| `matmul_mm` | matrix × matrix = matrix | Transformer |
| `pos_enc` | X + PE = X_pe (three matrices) | Transformer |
| `scale_mask` | raw scores → scaled (+ optional causal mask) | Transformer |
| `attn_heatmap` | attention weight heatmap | Transformer |
| `ffn_relu` | input × W1 → ReLU → post_act | Transformer |
| `softmax_parallel` | per-position softmax bar charts | Transformer |
| `loss_parallel` | per-position cross-entropy + average loss | Transformer |

Add new types here when a model needs a unique operation (e.g., `gate`, `ssm`).
