const HIGHLIGHT_MAP = {
  // Encoder
  'p0_s1':  [],
  'p0_s2':  ['enc_embed'],
  'p0_s3':  ['enc_pe'],
  'p0_s4':  ['enc_Q'],
  'p0_s5':  ['enc_K'],
  'p0_s6':  ['enc_V'],
  'p0_s7':  ['enc_score', 'enc_scale'],
  'p0_s8':  ['enc_attn'],
  'p0_s9':  ['enc_attn_out'],
  'p0_s10': ['enc_ffn1'],
  'p0_s11': ['enc_ffn2'],
  // Decoder
  'p1_s1':  [],
  'p1_s2':  ['dec_embed'],
  'p1_s3':  ['dec_pe'],
  'p1_s4':  ['dec_Q'],
  'p1_s5':  ['dec_K'],
  'p1_s6':  ['dec_V'],
  'p1_s7':  ['dec_score', 'dec_mask'],
  'p1_s8':  ['dec_attn'],
  'p1_s9':  ['dec_attn_out'],
  'p1_s10': ['cross_Q'],
  'p1_s11': ['cross_K'],
  'p1_s12': ['cross_V'],
  'p1_s13': ['cross_score'],
  'p1_s14': ['cross_attn'],
  'p1_s15': ['cross_out'],
  'p1_s16': ['dec_ffn1'],
  'p1_s17': ['dec_ffn2'],
  'p1_s18': ['out_proj'],
  'p1_s19': ['softmax'],
  'p1_s20': ['loss'],
};

const FormulaBar = ({ currentS }) => {
  const active = HIGHLIGHT_MAP[currentS?.id] ?? [];

  const hl = (terms) => {
    const hit = terms.some(t => active.includes(t));
    return hit
      ? 'bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-md border border-blue-200 shadow-sm mx-0.5 transition-all duration-300'
      : 'text-slate-500 mx-0.5 transition-all duration-300';
  };

  const groupActive = (terms) => terms.some(t => active.includes(t)) ? 'opacity-100' : 'opacity-40';

  return (
    <div
      className="w-full bg-white border-b border-slate-200 py-3 flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 md:gap-4 font-mono text-[10px] sm:text-xs md:text-sm shadow-sm z-10 select-none"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace" }}
    >
      {/* Group 1: Encoder */}
      <div className={`flex items-center gap-1 transition-opacity duration-300 ${groupActive(['enc_embed', 'enc_pe', 'enc_Q', 'enc_K', 'enc_V', 'enc_score', 'enc_scale', 'enc_attn', 'enc_attn_out', 'enc_ffn1', 'enc_ffn2'])}`}>
        <span className="text-slate-300 text-[9px] mr-1">Enc</span>
        <span className={hl(['enc_embed'])}>X=E[src]</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['enc_pe'])}>+PE</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['enc_Q', 'enc_K', 'enc_V'])}>Q,K,V</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['enc_attn'])}>Attn(</span>
        <span className={hl(['enc_score'])}>QK<sup>T</sup></span>
        <span className={hl(['enc_scale'])}>/√d</span>
        <span className={hl(['enc_attn'])}>)</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['enc_attn_out'])}>AV</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['enc_ffn1', 'enc_ffn2'])}>FFN</span>
      </div>

      <div className="hidden md:block w-px h-5 bg-slate-300" />

      {/* Group 2: Decoder */}
      <div className={`flex items-center gap-1 transition-opacity duration-300 ${groupActive(['dec_embed', 'dec_pe', 'dec_Q', 'dec_K', 'dec_V', 'dec_score', 'dec_mask', 'dec_attn', 'dec_attn_out', 'cross_Q', 'cross_K', 'cross_V', 'cross_score', 'cross_attn', 'cross_out', 'dec_ffn1', 'dec_ffn2'])}`}>
        <span className="text-slate-300 text-[9px] mr-1">Dec</span>
        <span className={hl(['dec_embed'])}>X=E[tgt]</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['dec_pe'])}>+PE</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['dec_mask'])}>Mask(</span>
        <span className={hl(['dec_score'])}>QK<sup>T</sup>/√d</span>
        <span className={hl(['dec_mask'])}>)</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['cross_Q', 'cross_K', 'cross_V', 'cross_score', 'cross_attn', 'cross_out'])}>Cross</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['dec_ffn1', 'dec_ffn2'])}>FFN</span>
      </div>

      <div className="hidden md:block w-px h-5 bg-slate-300" />

      {/* Group 3: Output */}
      <div className={`flex items-center gap-1 transition-opacity duration-300 ${groupActive(['out_proj', 'softmax', 'loss'])}`}>
        <span className="text-slate-300 text-[9px] mr-1">Out</span>
        <span className={hl(['out_proj'])}>Z=X·W<sub>o</sub><sup>T</sup></span>
        <span className="text-slate-300">|</span>
        <span className={hl(['softmax'])}>softmax</span>
        <span className="text-slate-300">|</span>
        <span className={hl(['loss'])}>L=avg(-log)</span>
      </div>
    </div>
  );
};

export default FormulaBar;
