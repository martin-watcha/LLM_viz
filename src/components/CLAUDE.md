# src/components/

All shared UI — both reusable primitives and model-agnostic screens.

## Shared Visualizations
| File | Props | Purpose |
|---|---|---|
| `Matrix.jsx` | `data, highlightRow, highlightCol, label` | 1D/2D array as a grid with optional row/col highlight |
| `TanhGraph.jsx` | `inputVal[], outputVal[]` | SVG tanh curve with plotted input→output points |
| `SoftmaxChart.jsx` | `output[], targetIdx` | Bar chart of softmax probability distribution |
| `LossDisplay.jsx` | `data` | Cross-entropy loss breakdown: one-hot vs predicted |

## Shared Screens
| File | Props | Purpose |
|---|---|---|
| `HomeScreen.jsx` | `onSelect(modelId)` | Grid of model cards; routes to a model or PlaceholderView |
| `PlaceholderView.jsx` | `model, onBack` | "Coming Soon" screen for models with `ready: false` |

## Rules
- If a component is only used by one model → put it in `src/models/{name}/components/`
- Props are plain values (numbers, arrays, strings) — no model-specific types
- Purely presentational — no internal state except simple animations
- Tailwind only; inline style only for dynamic values (e.g., `width: \`${n}%\``)
- Promote a model-specific component here only when a second model needs it
