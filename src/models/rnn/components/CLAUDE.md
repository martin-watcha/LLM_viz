# src/models/rnn/components/

RNN-specific visualization components.

## FlowDiagram.jsx
Compact h₀→h₁→h₂→h₃ recurrence diagram.
- **Props:** `currentT: number`
- Past timesteps: muted blue / Active: bold + scale-110 / Future: grey

## FormulaBar.jsx
Full-width bar showing all three RNN equations; highlights the active term per substep.
- **Props:** `currentT: number`, `currentS: substep object`
- Reads step index from `currentS.id.split('_s')[1]`

| Step | Highlighted term |
|---|---|
| 1 (embed) | `x_t` |
| 2 (Wh matmul) | `Wh·h_{t-1}` |
| 3 (Wx matmul) | `Wx·x_t` |
| 4 (tanh) | full `h_t = tanh(...)` |
| 5 (Wy matmul) | `Wy·h_t` |
| 6 (softmax) | `ŷ_t = softmax(...)` |
| 7 (loss) | `L_t` |

## StepRenderer.jsx
Receives a `substep` object, switches on `type`, renders the correct visualization.
Uses shared components from `src/components/` for `tanh`, `softmax`, `loss`.
