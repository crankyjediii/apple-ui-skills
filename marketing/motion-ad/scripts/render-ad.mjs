// Frame-exact renderer: drives index.html with puppeteer-core, pipes JPEG frames into ffmpeg.
// Usage: npm run render [-- --only=wide|square] [--frames=N] [--stills=0.5,3.9,...]
import puppeteer from 'puppeteer-core';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { loadTimeline, makeAudio } from './make-audio.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
fs.mkdirSync(out, { recursive: true });
const args = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')).map(([k, v]) => [k, v ?? true]));
const TL = loadTimeline(path.join(root, 'timeline.js'));
const FPS = TL.fps, TOTAL = +(args.frames || TL.frames);

const CHROME = process.env.CHROME_PATH || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].find(p => fs.existsSync(p));
if (!CHROME) throw new Error('Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.');
try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); } catch { throw new Error('ffmpeg not found on PATH (brew install ffmpeg).'); }

async function openPage(browser, size) {
  const [W, H] = size === 'square' ? [1080, 1080] : [1920, 1080];
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', e => errors.push(e));
  await page.goto(pathToFileURL(path.join(root, 'index.html')).href + `?render&size=${size}`);
  await page.evaluate(() => document.fonts.ready);
  if (errors.length) throw errors[0];
  return page;
}

async function renderVideo(browser, size, file, wav) {
  const page = await openPage(browser, size);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', `${FPS}`, '-c:v', 'mjpeg', '-i', '-',
    '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-r', `${FPS}`, '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', file], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', c => (c ? rej(new Error(`ffmpeg exited ${c}`)) : res())));
  const t0 = Date.now();
  for (let f = 0; f < TOTAL; f++) {
    await page.evaluate(n => window.renderFrame(n), f);
    const jpg = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(jpg)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 60 === 59 || f === TOTAL - 1) process.stdout.write(`\r${size}: ${f + 1}/${TOTAL} frames (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  }
  ff.stdin.end(); await done; await page.close();
  process.stdout.write('\n');
  // self-check: every frame made it into the file
  const n = parseInt(execFileSync('ffprobe', ['-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', file]).toString(), 10);
  if (n !== TOTAL) throw new Error(`${path.basename(file)}: expected ${TOTAL} frames, got ${n}`);
  console.log(`✓ ${path.relative(root, file)}: ${n} frames @ ${FPS}fps, ${(fs.statSync(file).size / 1e6).toFixed(1)} MB`);
}

function makeGif(mp4, gif) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4, '-vf',
    'fps=15,scale=720:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=160:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle',
    '-loop', '0', gif]);
  const mb = fs.statSync(gif).size / 1e6;
  console.log(`✓ ${path.relative(root, gif)}: ${mb.toFixed(1)} MB${mb > 10 ? '  (over GitHub 10 MB inline limit)' : ''}`);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars', '--force-color-profile=srgb', '--font-render-hinting=none'] });
try {
  if (args.stills) {
    for (const size of ['wide', 'square']) {
      const page = await openPage(browser, size);
      for (const s of String(args.stills).split(',').map(Number)) {
        await page.evaluate(n => window.renderFrame(n), Math.round(s * FPS));
        await page.screenshot({ path: path.join(out, `still-${size}-${s}s.png`) });
      }
      await page.close();
    }
    console.log(`✓ stills written to ${path.relative(root, out)}/`);
  } else {
    const wav = path.join(out, 'audio.wav');
    makeAudio(TL, wav);
    if (args.only !== 'square') {
      const mp4 = path.join(out, 'apple-ui-skills-ad.mp4');
      await renderVideo(browser, 'wide', mp4, wav);
      makeGif(mp4, path.join(out, 'apple-ui-skills-ad.gif'));
    }
    if (args.only !== 'wide') await renderVideo(browser, 'square', path.join(out, 'apple-ui-skills-ad-square.mp4'), wav);
  }
} finally {
  await browser.close();
}
