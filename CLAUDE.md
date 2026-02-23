# LLM_viz — AI by Hand Visualizer

## Purpose
Step-by-step interactive visualization of AI/LLM model internals for educational use.
Each model is broken into discrete substeps with formulas, diagrams, and numeric breakdowns.

## Tech Stack
- React + JSX, Tailwind CSS, lucide-react icons
- Vite (build tool)

## Model Status
| Model | Status | Directory |
|---|---|---|
| Vanilla RNN | ✅ Complete | `src/models/rnn/` |
| Transformer | ✅ Complete | `src/models/transformer/` |
| Linear RNN | 🔲 Planned | `src/models/linear_rnn/` |
| Mamba (SSM) | 🔲 Planned | `src/models/mamba/` |
| Titans (MAC) | 🔲 Planned | `src/models/titans/` |

## Directory Overview
```
src/
├── App.jsx          # Route switcher only
├── config/          # MODELS metadata array
├── components/      # Shared UI: Matrix, TanhGraph, SoftmaxChart, LossDisplay, HomeScreen, PlaceholderView
└── models/          # One self-contained folder per model
```

## Adding a New Model
1. Create `src/models/{name}/` with `data.js`, `index.jsx`, `components/`
2. Add entry in `src/config/models.js` with `ready: true`
3. Add route in `App.jsx`
4. See `src/models/CLAUDE.md` for full conventions
