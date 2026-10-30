// Shared timeline (seconds). Loaded by index.html and by scripts/make-audio.mjs so picture and sound stay in sync.
var TL = {
  fps: 60,
  frames: 1800,
  prompt: { text: '"Build a modern settings screen for iOS"', start: 0.6, cps: 26 },
  code: {
    start: 2.35,
    cps: 60,
    lines: ['import UIKit', 'let table = UITableView(style: .plain)', 'cell.backgroundColor = .gray'],
  },
  banner: 3.75,
  bloom: 5.0,
  brand: 5.3,
  vign: [9, 11.5, 14, 16.5, 19],
  iosIsland: 0.5, // seconds into the iOS vignette
  macInspector: 0.85,
  visDetach: 0.7,
  watchTicks: [0.55, 0.95, 1.35, 1.75],
  cmd: { text: 'npx skills add crankyjediii/apple-ui-skills', start: 19.4, cps: 34 },
  checks: [20.95, 21.35, 21.75],
  morph: 21.75,
  cta: 24.0,
  copy: 26.6,
  end: 30,
};
