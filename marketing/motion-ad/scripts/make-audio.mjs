// Procedural sound design synced to timeline.js. No samples, no third-party audio.
import fs from 'node:fs';

export function loadTimeline(file) {
  return new Function(fs.readFileSync(file, 'utf8') + ';return TL;')();
}

export function makeAudio(TL, outFile) {
  const SR = 48000, N = SR * TL.end;
  const L = new Float32Array(N), R = new Float32Array(N);
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647 * 2 - 1;
  const add = (t0, dur, fn, pan = 0, gain = 1) => {
    const s0 = Math.floor(t0 * SR), n = Math.floor(dur * SR);
    for (let i = 0; i < n; i++) {
      const k = s0 + i; if (k < 0 || k >= N) continue;
      const v = fn(i / SR, i / n) * gain;
      L[k] += v * (1 - pan); R[k] += v * (1 + pan);
    }
  };
  const sin = (f, x) => Math.sin(2 * Math.PI * f * x);
  const click = (t, g = .2) => { let p = 0; const pan = rnd() * .4; add(t, .014, x => { const n = rnd(), v = n - p; p = n; return v * Math.exp(-x * 380); }, pan, g); };
  const tone = (t, f, dur, g, decay = 4, attack = .004, pan = 0) => add(t, dur, (x, q) => sin(f, x) * Math.min(1, x / attack) * Math.exp(-x * decay) * (1 - q ** 8), pan, g);
  const whoosh = (t, dur, g = .18, rising = true) => {
    let y = 0;
    add(t, dur, (x, q) => { const c = rising ? .01 + .25 * q * q : .3 - .28 * q; y += c * (rnd() - y); return y * Math.sin(Math.PI * q) ** 2 * 3; }, 0, g);
  };
  const thump = (t, f = 60, g = .4, decay = 12) => add(t, .35, x => sin(f * (1 + 1.5 * Math.exp(-x * 40)), x) * Math.exp(-x * decay), 0, g);

  // Scene 1: typing clatter, glitch, error chime
  const p = TL.prompt; for (let i = 0; i < p.text.length; i++) click(p.start + i / p.cps, .16 + .08 * Math.abs(rnd()));
  const chars = TL.code.lines.join('').length; for (let i = 0; i < chars; i++) click(TL.code.start + i / TL.code.cps, .09);
  const b = TL.banner;
  add(b, .22, (x, q) => Math.sign(sin(110, x)) * .5 * (1 - q) * (Math.floor(x * 40) % 2), 0, .1);
  tone(b + .02, 659.25, 1.3, .22, 3); tone(b + .16, 523.25, 1.6, .22, 2.4);
  whoosh(b + .7, TL.bloom - b - .7, .2, true);

  // Scene 2: bass drop + glass hum
  const tb = TL.bloom;
  add(tb, 2.2, x => Math.sin(2 * Math.PI * (45 * x + 45 * (1 - Math.exp(-4 * x)) / 4)) * Math.min(1, x / .008) * Math.exp(-x * 1.6), 0, .75);
  click(tb, .5);
  [220, 329.63, 440, 554.37, 659.25].forEach(f => {
    const env = (x, q) => Math.min(1, x / .8) * Math.min(1, (1 - q) * 4) * (1 + .15 * sin(4.5, x));
    add(tb + .35, 3.4, (x, q) => sin(f, x) * env(x, q), -.3, .045);
    add(tb + .35, 3.4, (x, q) => sin(f * 1.003, x) * env(x, q), .3, .045);
  });
  tone(TL.brand + .05, 1760, 1.2, .06, 3, .002); tone(TL.brand + .5, 2637, 1, .04, 3, .002, .3);

  // Scene 3: pulse bed, transitions, UI foley
  const [v0, v1, v2, v3] = TL.vign;
  for (let t = v0; t < TL.cta; t += .5) { thump(t, 58, .32); add(t + .25, .05, x => rnd() * Math.exp(-x * 90), .2, .05); }
  TL.vign.forEach(t => whoosh(t - .3, .55, .14, true));
  tone(v0 + TL.iosIsland, 600, .25, .12, 10); tone(v0 + TL.iosIsland + .06, 900, .3, .1, 9);
  for (let j = 0; j < 4; j++) thump(v0 + .95 + j * .1, 90, .15, 25);
  whoosh(v1 + TL.macInspector - .05, .35, .1, false);
  tone(v2 + TL.visDetach, 1760, 1.2, .07, 3.5, .002, -.3); tone(v2 + TL.visDetach + .08, 2349, 1.2, .05, 3.5, .002, .3);
  TL.watchTicks.forEach(tk => { for (let d = 0; d < 4; d++) click(v3 + tk - .06 + d * .03, .14); });

  // Scene 4: typewriter + success pings
  const c = TL.cmd; for (let i = 0; i < c.text.length; i++) { const t = c.start + i / c.cps; click(t, .26); tone(t, 180, .05, .08, 60); }
  TL.checks.forEach(t => { tone(t, 1318.5, .7, .16, 6); tone(t, 1975.5, .6, .08, 7); });
  whoosh(TL.morph - .05, .5, .14, true);
  tone(TL.morph + .3, 880, .5, .06, 6);

  // Scene 5: collapse, resolve chord, copy click
  whoosh(TL.cta - .4, .7, .22, true); thump(TL.cta + .3, 50, .5, 5);
  [261.63, 329.63, 392, 493.88, 587.33].forEach((f, i) => add(TL.cta + .3, TL.end - TL.cta - .3, (x, q) => sin(f, x) * Math.min(1, x / 1.2) * Math.min(1, (1 - q) * 5) * (1 + .1 * sin(.6, x)), i % 2 ? .25 : -.25, .045));
  click(TL.copy, .4); tone(TL.copy + .05, 1046.5, .3, .08, 10);

  // master: normalize, soft-clip, fade tail, write 16-bit stereo WAV
  let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const buf = Buffer.alloc(44 + N * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
  const fadeStart = (TL.end - .3) * SR;
  for (let i = 0; i < N; i++) {
    const fade = i > fadeStart ? 1 - (i - fadeStart) / (.3 * SR) : 1;
    const m = s => Math.tanh(s / peak * 1.3) / Math.tanh(1.3) * .89 * fade;
    buf.writeInt16LE(Math.round(m(L[i]) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(m(R[i]) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(outFile, buf);
}
