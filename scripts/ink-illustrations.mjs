// Prepares supplied manga illustrations for the site.
// - scene: trims the white/letterbox margin and the drawn outer panel border (the site draws its own frames)
// - cutout: derives a real alpha matte from the line art (flood fill of the paper from the edges,
//   with the ink dilated first so gaps in the outline can't leak), leaving a thin paper halo round the figure
// Usage: node scripts/ink-illustrations.mjs  → writes public/illustrations/*.webp and prints dimensions
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "illustrations");
fs.mkdirSync(outDir, { recursive: true });

const jobs = [
  { src: "vedvoice.png", out: "vedavoice-scene.webp", kind: "scene" },
  { src: "robo-rumble.png", out: "roborumble-scene.webp", kind: "scene" },
  { src: "airgated.png", out: "airgated-scene.webp", kind: "scene" },
  { src: "snake-ai.png", out: "snake-scene.webp", kind: "scene" },
  { src: "rise-up-public-school.png", out: "riseup-scene.webp", kind: "scene" },
  { src: "remote-sensing.png", out: "drishtikon-scene.webp", kind: "scene" },
  { src: "railway-overcrowd.png", out: "railways-scene.webp", kind: "scene" },
  { src: "emotion-detection.png", out: "ambisense-scene.webp", kind: "scene" },
  { src: "arc-01.png", out: "arc-origin-card.webp", kind: "scene" },
  { src: "arc-02.png", out: "arc-party-card.webp", kind: "scene" },
  { src: "arc-03.png", out: "arc-awakening-card.webp", kind: "scene" },
  { src: "arc-04.png", out: "arc-horizon-card.webp", kind: "scene" },
  { src: "me.png", out: "hero-author.webp", kind: "cutout" },
  { src: "hobby.png", out: "origin-portrait.webp", kind: "cutout" },
  { src: "contact.png", out: "contact-sendoff.webp", kind: "cutout" },
];

async function grey(file) {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

/** content box: rows/columns that actually vary (uniform margins and letterbox bars are dropped) */
function contentBox({ data, w, h }) {
  const lineStats = (get, len) => {
    let sum = 0;
    let sq = 0;
    for (let i = 0; i < len; i++) {
      const v = get(i);
      sum += v;
      sq += v * v;
    }
    const mean = sum / len;
    return { mean, sd: Math.sqrt(Math.max(0, sq / len - mean * mean)) };
  };
  const rowOk = (y) => lineStats((i) => data[y * w + i], w).sd > 12;
  const colOk = (x) => lineStats((i) => data[i * w + x], h).sd > 12;
  let top = 0;
  while (top < h - 1 && !rowOk(top)) top++;
  let bottom = h - 1;
  while (bottom > top && !rowOk(bottom)) bottom--;
  let left = 0;
  while (left < w - 1 && !colOk(left)) left++;
  let right = w - 1;
  while (right > left && !colOk(right)) right--;
  return { left, top, right, bottom };
}

/** walk inward past a drawn border: lines that are mostly ink, then any paper gap before the art */
function stripBorder({ data, w }, box) {
  const dark = (v) => v < 110;
  const rowInk = (y) => {
    let n = 0;
    for (let x = box.left; x <= box.right; x++) if (dark(data[y * w + x])) n++;
    return n / (box.right - box.left + 1);
  };
  const colInk = (x) => {
    let n = 0;
    for (let y = box.top; y <= box.bottom; y++) if (dark(data[y * w + x])) n++;
    return n / (box.bottom - box.top + 1);
  };
  const b = { ...box };
  const limit = 40;
  const walk = (get, from, dir) => {
    let p = from;
    let steps = 0;
    while (steps < limit && get(p) > 0.55) {
      p += dir;
      steps++;
    }
    return steps > 0 ? p + dir * 3 : from; // clear the antialiased edge of the rule
  };
  b.top = walk(rowInk, b.top, 1);
  b.bottom = walk(rowInk, b.bottom, -1);
  b.left = walk(colInk, b.left, 1);
  b.right = walk(colInk, b.right, -1);
  return b;
}

async function scene(job) {
  const file = path.join(root, "public", job.src);
  const g = await grey(file);
  const box = stripBorder(g, contentBox(g));
  const width = box.right - box.left + 1;
  const height = box.bottom - box.top + 1;
  // ink on paper only: drop any generator tint (arc-01 came back sepia) and pin the paper to true white,
  // so mix-blend-multiply lands exactly on the site's paper colour
  await sharp(file)
    .extract({ left: box.left, top: box.top, width, height })
    .greyscale()
    .normalise({ lower: 0.5, upper: 99 })
    .webp({ quality: 86, effort: 6 })
    .toFile(path.join(outDir, job.out));
  return { width, height, box };
}

async function cutout(job) {
  const file = path.join(root, "public", job.src);
  const { data, w, h } = await grey(file);
  const ink = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) ink[i] = data[i] < 200 ? 1 : 0;
  // dilate ink by r px to seal hairline gaps before the flood
  const r = 3;
  const sealed = new Uint8Array(w * h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      if (!ink[y * w + x]) continue;
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) {
          const yy = y + dy;
          const xx = x + dx;
          if (yy >= 0 && yy < h && xx >= 0 && xx < w) sealed[yy * w + xx] = 1;
        }
    }
  // flood the paper from every edge pixel
  const bg = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    const i = y * w + x;
    if (!bg[i] && !sealed[i]) {
      bg[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % w;
    const y = (i - x) / w;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }
  const alpha = Buffer.alloc(w * h);
  let kept = 0;
  for (let i = 0; i < w * h; i++) {
    alpha[i] = bg[i] ? 0 : 255;
    kept += alpha[i] ? 1 : 0;
  }
  const softAlpha = await sharp(alpha, { raw: { width: w, height: h, channels: 1 } }).blur(0.8).extractChannel(0).raw().toBuffer();
  // assemble RGBA by hand: joinChannel + trim drops the alpha band on some inputs
  const rgb = await sharp(file).removeAlpha().toColourspace("srgb").raw().toBuffer();
  const rgba = Buffer.alloc(w * h * 4);
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4] = rgb[i * 3];
    rgba[i * 4 + 1] = rgb[i * 3 + 1];
    rgba[i * 4 + 2] = rgb[i * 3 + 2];
    rgba[i * 4 + 3] = softAlpha[i];
    if (softAlpha[i] > 8) {
      const x = i % w;
      const y = (i - x) / w;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(path.join(outDir, job.out));
  const meta = await sharp(path.join(outDir, job.out)).metadata();
  return { width: meta.width, height: meta.height, opaqueShare: +(kept / (w * h)).toFixed(3) };
}

const report = {};
for (const job of jobs) {
  report[job.out] = job.kind === "scene" ? await scene(job) : await cutout(job);
  const kb = Math.round(fs.statSync(path.join(outDir, job.out)).size / 1024);
  report[job.out].kb = kb;
}
console.log(JSON.stringify(report, null, 2));
