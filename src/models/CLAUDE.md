# src/models/

Each model is a self-contained module. One folder per model.

## Required Structure
```
models/{name}/
├── CLAUDE.md           # Model description, formula reference, data format
├── data.js             # All constants: vocab, params, STEPS_DATA
├── index.jsx           # The View: play/step state, layout, keyboard nav
└── components/
    ├── CLAUDE.md
    ├── FlowDiagram.jsx  # Architecture diagram showing current timestep
    ├── FormulaBar.jsx   # Formula highlighter tied to current substep
    └── StepRenderer.jsx # Switch on step type → correct visualization
```

## data.js Conventions
- Named exports: `VOCAB`, `MODEL_PARAMS`, `STEPS_DATA`
- `STEPS_DATA`: array of timestep objects, each with a `substeps` array
- No JSX in data.js — formula JSX lives in components

## index.jsx Conventions
- State: `tIndex`, `subStepIndex`, `isPlaying`, `speed`
- `handleNext` / `handlePrev` as `useCallback`
- Keyboard: ArrowLeft, ArrowRight, Space via `useEffect`
- Layout: header → sidebar timeline → main content → footer controls

## Step Type Registry
`StepRenderer` switches on `substep.type`:

| type | Visualization |
|---|---|
| `init` | Parameter tables + dataset overview |
| `embed` | Matrix with highlighted row → result vector |
| `matmul` | Left matrix × right vector = result |
| `tanh` | TanhGraph (shared) |
| `softmax` | SoftmaxChart (shared) |
| `loss` | LossDisplay (shared) |

Add new types here when a model needs a unique operation (e.g., `attention`, `gate`, `ssm`).
