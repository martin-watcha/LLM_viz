# src/models/transformer/ — Transformer (Encoder-Decoder with Cross-Attention)

## What This Demonstrates
Forward pass of an Encoder-Decoder Transformer on a Seq2Seq task.
Covers Positional Encoding, Encoder Self-Attention (bidirectional), Decoder Masked Self-Attention (causal), Cross-Attention, and FFN layers with ReLU.

**Core equations:**
```
Positional Encoding:
  PE(pos, 0) = sin(pos)
  PE(pos, 1) = cos(pos)

Encoder:
  X_enc     = E[source]
  X_enc_pe  = X_enc + PE
  Q,K,V     = X_enc_pe·Wq_e, X_enc_pe·Wk_e, X_enc_pe·Wv_e
  Attn_enc  = softmax(Q·Kᵀ / √d_k)          # no mask
  Enc_attn_out = Attn_enc · V
  FFN:  h = ReLU(Enc_attn_out · W1_e)
  Enc_out = h · W2_e

Decoder:
  X_dec     = E[target]
  X_dec_pe  = X_dec + PE
  Q,K,V     = X_dec_pe·Wq_d, X_dec_pe·Wk_d, X_dec_pe·Wv_d
  Attn_dec  = softmax(Mask(Q·Kᵀ / √d_k))    # causal mask
  Dec_attn_out = Attn_dec · V

Cross-Attention:
  Q_c       = Dec_attn_out · Wq_c
  K_c, V_c  = Enc_out · Wk_c, Enc_out · Wv_c
  Attn_cross= softmax(Q_c·K_cᵀ / √d_k)      # no mask
  Cross_out = Attn_cross · V_c

Decoder FFN:
  h = ReLU(Cross_out · W1_d)
  Dec_out = h · W2_d

Output:
  ŷ = softmax(Wo · dec_out[-1])
  L = -log(ŷ_target)
```

## Toy Dataset
- Vocab: `["I", "like", "cats", "dogs", "<s>"]` (size 5)
- Source (Encoder): `["I", "like", "cats"]` → idx [0,1,2]
- Target input (Decoder): `["<s>", "cats", "like"]` → idx [4,2,1]
- Target output: `["cats", "like", "dogs"]`
- Loss at last position: predict "dogs" (idx 3)

## Dimensions
| Param | Shape | Role |
|---|---|---|
| E | 5×2 | Shared Embedding |
| Wq_e, Wk_e, Wv_e | 2×2 | Encoder Self-Attention |
| W1_e | 2×4 | Encoder FFN Layer 1 |
| W2_e | 4×2 | Encoder FFN Layer 2 |
| Wq_d, Wk_d, Wv_d | 2×2 | Decoder Masked Self-Attention |
| Wq_c, Wk_c, Wv_c | 2×2 | Cross-Attention (Q←Dec, KV←Enc) |
| W1_d | 2×4 | Decoder FFN Layer 1 |
| W2_d | 4×2 | Decoder FFN Layer 2 |
| Wo | 5×2 | Output Projection |

d_model=2, d_k=2, d_ff=4, seq_len=3, vocab=5, 15 parameter matrices

## Phase Structure (2 phases, 31 substeps)
| Phase | Label | Steps |
|---|---|---|
| 0 | Encoder | init, full_embed, pos_enc, matmul_mm×3, scale_mask, attn_heatmap, matmul_mm, ffn_relu, matmul_mm (11) |
| 1 | Decoder | init, full_embed, pos_enc, matmul_mm×3, scale_mask, attn_heatmap, matmul_mm, matmul_mm×3, scale_mask, attn_heatmap, matmul_mm, ffn_relu, matmul_mm, matmul, softmax, loss (20) |

## Step Types
| type | Visualization |
|---|---|
| `init` | Dataset + parameter group tables |
| `full_embed` | E matrix with highlighted rows → X matrix |
| `pos_enc` | X + PE = X_pe (three matrices side by side) |
| `matmul_mm` | matrix × matrix = matrix |
| `scale_mask` | raw scores → scaled (+ optional causal mask) |
| `attn_heatmap` | attention weight heatmap |
| `ffn_relu` | input × W1 = pre_act → ReLU → post_act |
| `matmul` | matrix × vector = vector |
| `softmax` | probability bar chart |
| `loss` | cross-entropy loss breakdown |

## Key Computed Values
| Value | Result |
|---|---|
| PE | [[0.000, 1.000], [0.841, 0.540], [0.909, -0.416]] |
| Enc Attention row 0 | [1.000, 0.000, 0.000] |
| Dec Attention row 2 | [0.017, 0.018, 0.965] |
| Cross Attention row 2 | [0.207, 0.289, 0.504] |
| Dec_out[-1] | [-0.105, 0.371] |
| Logits | [0.154, 0.012, 0.107, 0.276, 0.059] |
| Loss | 1.459 |
