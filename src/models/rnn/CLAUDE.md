# src/models/rnn/ — Vanilla RNN

## What This Demonstrates
Forward pass of a simple RNN on a next-token prediction task.

**Core equations:**
```
h_t = tanh(Wh·h_{t-1} + Wx·x_t + b)
ŷ_t = softmax(Wy·h_t)
L_t = -log(ŷ_{t, target})
```

## Toy Dataset
- Vocab: `["I", "like", "cats", "dogs"]` (size 4)
- Input: `["I", "like", "cats"]` → Targets: `["like", "cats", "dogs"]`

## Parameter Shapes
| Param | Shape | Role |
|---|---|---|
| E | 4×3 | Embedding matrix |
| Wx | 2×3 | Input → hidden |
| Wh | 2×2 | Hidden → hidden |
| b | 2 | Hidden bias |
| Wy | 4×2 | Hidden → output |

## STEPS_DATA Format
```js
{
  timestep: 1,       // 0 = init, 1–3 = token steps
  token: "I",
  target: "like",
  substeps: [
    {
      id: "t1_s1",   // "t{timestep}_s{stepIndex}" — used by FormulaBar
      type: "embed",
      title: "① Embedding Lookup",
      desc: "E[0] → x₁ = [0.1, 0.9, 0.2]",
      data: { ... }, // type-specific payload
      formula: <span>...</span>
    }
  ]
}
```

## Computed Values Reference
| Timestep | Input | h_t | Loss |
|---|---|---|---|
| t=1 | "I" | [0.080, 0.405] | 1.214 |
| t=2 | "like" | [0.148, 0.420] | 1.431 |
| t=3 | "cats" | [0.111, 0.556] | 1.309 |
