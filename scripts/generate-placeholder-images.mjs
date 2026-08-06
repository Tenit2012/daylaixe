/**
 * Sinh anh minh hoa dang SVG cho toan bo website.
 *
 * Cac anh nay la HINH VE TRUU TUONG (khoi hinh hoc + bieu tuong don gian),
 * KHONG mo phong anh chup nguoi that. Muc dich la giu bo cuc va ty le dung
 * cho den khi co anh that.
 *
 * Chay lai: node scripts/generate-placeholder-images.mjs
 * Danh sach anh that can cung cap: docs/REQUIRED_ASSETS.md
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const palette = {
  navy: '#182F58',
  navyDeep: '#112242',
  navyLight: '#3C6CB2',
  sky: '#DEE9F7',
  orange: '#EA760E',
  orangeSoft: '#FCB367',
  green: '#169855',
  paper: '#F7F9FC',
  line: '#C6D0DE',
  white: '#FFFFFF',
};

function svgWrapper(width, height, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${title}">
  <title>${title}</title>
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.sky}"/>
      <stop offset="100%" stop-color="${palette.paper}"/>
    </linearGradient>
    <linearGradient id="navyGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.navy}"/>
      <stop offset="100%" stop-color="${palette.navyDeep}"/>
    </linearGradient>
  </defs>
${body}
</svg>
`;
}

/** Khoi xe hoi nhin nghieng, dat tai (x, y) voi chieu rong w. */
function carShape(x, y, w, bodyColor = palette.navy, roofColor = palette.navyLight) {
  const h = w * 0.42;
  return `  <g transform="translate(${x} ${y})">
    <rect x="0" y="${h * 0.42}" width="${w}" height="${h * 0.42}" rx="${h * 0.16}" fill="${bodyColor}"/>
    <path d="M ${w * 0.18} ${h * 0.44} L ${w * 0.3} ${h * 0.1} L ${w * 0.72} ${h * 0.1} L ${w * 0.84} ${h * 0.44} Z" fill="${roofColor}"/>
    <rect x="${w * 0.32}" y="${h * 0.16}" width="${w * 0.16}" height="${h * 0.24}" rx="3" fill="${palette.sky}"/>
    <rect x="${w * 0.52}" y="${h * 0.16}" width="${w * 0.16}" height="${h * 0.24}" rx="3" fill="${palette.sky}"/>
    <circle cx="${w * 0.26}" cy="${h * 0.86}" r="${h * 0.16}" fill="${palette.navyDeep}"/>
    <circle cx="${w * 0.26}" cy="${h * 0.86}" r="${h * 0.07}" fill="${palette.line}"/>
    <circle cx="${w * 0.76}" cy="${h * 0.86}" r="${h * 0.16}" fill="${palette.navyDeep}"/>
    <circle cx="${w * 0.76}" cy="${h * 0.86}" r="${h * 0.07}" fill="${palette.line}"/>
    <rect x="${w * 0.86}" y="${h * 0.5}" width="${w * 0.1}" height="${h * 0.1}" rx="3" fill="${palette.orange}"/>
  </g>`;
}

/** Bang chu "TAP LAI" tren noc xe. */
function trainingSign(x, y, w) {
  return `  <g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="${w}" height="${w * 0.34}" rx="4" fill="${palette.orange}"/>
    <text x="${w / 2}" y="${w * 0.24}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${w * 0.2}" font-weight="700" fill="${palette.white}">TẬP LÁI</text>
  </g>`;
}

function label(x, y, text, size = 20, color = palette.navy, anchor = 'middle') {
  return `  <text x="${x}" y="${y}" text-anchor="${anchor}" font-family="system-ui, sans-serif" font-size="${size}" font-weight="600" fill="${color}">${text}</text>`;
}

/** Anh chan dung / nguoi: dung bieu tuong truu tuong, KHONG ve mat nguoi. */
function personGlyph(cx, cy, scale = 1, color = palette.navyLight) {
  const r = 26 * scale;
  return `  <g>
    <circle cx="${cx}" cy="${cy - r * 1.5}" r="${r}" fill="${color}"/>
    <path d="M ${cx - r * 1.7} ${cy + r * 1.6} a ${r * 1.7} ${r * 1.9} 0 0 1 ${r * 3.4} 0 Z" fill="${color}"/>
  </g>`;
}

const images = [];

// --- Hero -----------------------------------------------------------------
images.push({
  path: 'images/hero/thay-va-xe-tap-lai.svg',
  content: svgWrapper(
    900,
    700,
    `  <rect width="900" height="700" fill="url(#skyGrad)"/>
  <rect x="0" y="470" width="900" height="230" fill="${palette.paper}"/>
  <rect x="0" y="470" width="900" height="6" fill="${palette.line}"/>
  <g opacity="0.5">
    <rect x="60" y="150" width="130" height="230" rx="10" fill="${palette.sky}"/>
    <rect x="720" y="120" width="140" height="260" rx="10" fill="${palette.sky}"/>
  </g>
${carShape(300, 300, 520)}
${trainingSign(470, 288, 90)}
${personGlyph(220, 430, 1.5)}
  <rect x="0" y="600" width="900" height="14" fill="${palette.line}" opacity="0.6"/>
  <g>
    <rect x="60" y="620" width="70" height="10" rx="5" fill="${palette.white}"/>
    <rect x="180" y="620" width="70" height="10" rx="5" fill="${palette.white}"/>
    <rect x="300" y="620" width="70" height="10" rx="5" fill="${palette.white}"/>
    <rect x="420" y="620" width="70" height="10" rx="5" fill="${palette.white}"/>
    <rect x="540" y="620" width="70" height="10" rx="5" fill="${palette.white}"/>
    <rect x="660" y="620" width="70" height="10" rx="5" fill="${palette.white}"/>
    <rect x="780" y="620" width="70" height="10" rx="5" fill="${palette.white}"/>
  </g>
${label(450, 672, 'Ảnh minh họa — sẽ thay bằng ảnh thật', 20, palette.navyLight)}`,
    'Minh họa giáo viên đứng cạnh xe tập lái',
  ),
});

// --- Chan dung thay -------------------------------------------------------
images.push({
  path: 'images/about/chan-dung-thay.svg',
  content: svgWrapper(
    600,
    750,
    `  <rect width="600" height="750" fill="url(#skyGrad)"/>
  <circle cx="300" cy="300" r="190" fill="${palette.white}" opacity="0.65"/>
${personGlyph(300, 360, 3.4, palette.navy)}
  <rect x="150" y="620" width="300" height="46" rx="23" fill="${palette.white}"/>
${label(300, 651, 'Ảnh chân dung — cần bổ sung', 19, palette.navyLight)}`,
    'Vị trí đặt ảnh chân dung của thầy',
  ),
});

// --- Khoa hoc -------------------------------------------------------------
const courseImages = [
  ['hang-b-so-tu-dong', 'Hạng B — Số tự động', palette.navyLight],
  ['hang-b-so-san', 'Hạng B — Số sàn', palette.navy],
  ['hang-c1', 'Hạng C1', palette.navyDeep],
  ['bo-tuc-tay-lai', 'Bổ túc tay lái', palette.green],
  ['luyen-sa-hinh', 'Luyện sa hình', palette.orange],
];

for (const [slug, title, accent] of courseImages) {
  images.push({
    path: `images/courses/${slug}.svg`,
    content: svgWrapper(
      800,
      500,
      `  <rect width="800" height="500" fill="url(#skyGrad)"/>
  <rect x="0" y="380" width="800" height="120" fill="${palette.paper}"/>
  <rect x="0" y="380" width="800" height="5" fill="${palette.line}"/>
  <rect x="0" y="0" width="10" height="500" fill="${accent}"/>
${carShape(220, 210, 400, accent, palette.navyLight)}
${trainingSign(360, 200, 76)}
${label(400, 448, title, 26, palette.navy)}`,
      `Minh họa khóa học ${title}`,
    ),
  });
}

// --- Gallery --------------------------------------------------------------
images.push({
  path: 'images/gallery/xe-tap-lai.svg',
  content: svgWrapper(
    800,
    600,
    `  <rect width="800" height="600" fill="url(#skyGrad)"/>
  <rect x="0" y="440" width="800" height="160" fill="${palette.paper}"/>
${carShape(160, 250, 480)}
${trainingSign(340, 238, 90)}
${label(400, 545, 'Xe tập lái', 26, palette.navy)}`,
    'Minh họa xe tập lái',
  ),
});

images.push({
  path: 'images/gallery/san-tap.svg',
  content: svgWrapper(
    800,
    600,
    `  <rect width="800" height="600" fill="${palette.paper}"/>
  <rect x="40" y="40" width="720" height="440" rx="12" fill="${palette.navy}" opacity="0.08"/>
  <g stroke="${palette.white}" stroke-width="6" stroke-dasharray="26 20" fill="none">
    <path d="M 90 420 L 90 120 L 400 120 L 400 380 L 710 380"/>
  </g>
  <g fill="${palette.orange}">
    <circle cx="200" cy="200" r="12"/><circle cx="280" cy="200" r="12"/>
    <circle cx="360" cy="200" r="12"/><circle cx="520" cy="300" r="12"/>
    <circle cx="600" cy="300" r="12"/><circle cx="680" cy="300" r="12"/>
  </g>
${carShape(120, 380, 200)}
${label(400, 545, 'Sân tập', 26, palette.navy)}`,
    'Minh họa sân tập lái xe',
  ),
});

images.push({
  path: 'images/gallery/sa-hinh.svg',
  content: svgWrapper(
    800,
    600,
    `  <rect width="800" height="600" fill="${palette.paper}"/>
  <rect x="40" y="40" width="720" height="440" rx="12" fill="${palette.sky}"/>
  <g stroke="${palette.navy}" stroke-width="5" fill="none">
    <rect x="100" y="100" width="180" height="110" rx="6"/>
    <rect x="320" y="100" width="180" height="110" rx="6"/>
    <rect x="540" y="100" width="160" height="110" rx="6"/>
    <rect x="100" y="270" width="180" height="150" rx="6"/>
    <rect x="320" y="270" width="380" height="150" rx="6"/>
  </g>
  <g fill="${palette.navyLight}" font-family="system-ui, sans-serif" font-size="17" font-weight="600" text-anchor="middle">
    <text x="190" y="162">Xuất phát</text>
    <text x="410" y="162">Dừng ngang dốc</text>
    <text x="620" y="162">Vuông góc</text>
    <text x="190" y="352">Quanh co</text>
    <text x="510" y="352">Ghép dọc &amp; ghép ngang</text>
  </g>
${label(400, 545, 'Sơ đồ bài thi sa hình', 26, palette.navy)}`,
    'Minh họa sơ đồ bài thi sa hình',
  ),
});

images.push({
  path: 'images/gallery/duong-truong.svg',
  content: svgWrapper(
    800,
    600,
    `  <rect width="800" height="600" fill="url(#skyGrad)"/>
  <path d="M 0 480 L 800 480 L 800 600 L 0 600 Z" fill="${palette.navyDeep}" opacity="0.85"/>
  <g stroke="${palette.white}" stroke-width="7" stroke-dasharray="46 34">
    <line x1="0" y1="540" x2="800" y2="540"/>
  </g>
  <g opacity="0.35" fill="${palette.navyLight}">
    <rect x="40" y="180" width="90" height="230" rx="8"/>
    <rect x="160" y="230" width="70" height="180" rx="8"/>
    <rect x="600" y="200" width="80" height="210" rx="8"/>
    <rect x="700" y="250" width="70" height="160" rx="8"/>
  </g>
${carShape(280, 330, 260)}
${label(400, 445, 'Buổi học đường trường', 26, palette.navy)}`,
    'Minh họa buổi học lái xe đường trường',
  ),
});

images.push({
  path: 'images/gallery/ly-thuyet.svg',
  content: svgWrapper(
    800,
    600,
    `  <rect width="800" height="600" fill="${palette.paper}"/>
  <rect x="120" y="70" width="560" height="300" rx="10" fill="url(#navyGrad)"/>
  <g fill="${palette.white}" opacity="0.85">
    <rect x="160" y="120" width="330" height="16" rx="8"/>
    <rect x="160" y="160" width="440" height="12" rx="6"/>
    <rect x="160" y="192" width="400" height="12" rx="6"/>
    <rect x="160" y="224" width="300" height="12" rx="6"/>
  </g>
  <g fill="${palette.orangeSoft}">
    <circle cx="560" cy="300" r="34"/>
  </g>
${personGlyph(230, 480, 1.2)}
${personGlyph(380, 480, 1.2)}
${personGlyph(530, 480, 1.2)}
${label(400, 560, 'Buổi học lý thuyết', 26, palette.navy)}`,
    'Minh họa buổi học lý thuyết',
  ),
});

images.push({
  path: 'images/gallery/huong-dan.svg',
  content: svgWrapper(
    800,
    600,
    `  <rect width="800" height="600" fill="url(#skyGrad)"/>
  <rect x="90" y="110" width="620" height="330" rx="24" fill="${palette.white}"/>
  <rect x="130" y="150" width="250" height="180" rx="12" fill="${palette.sky}"/>
  <rect x="420" y="150" width="250" height="180" rx="12" fill="${palette.sky}"/>
  <circle cx="255" cy="380" r="40" fill="none" stroke="${palette.navy}" stroke-width="12"/>
  <circle cx="255" cy="380" r="10" fill="${palette.navy}"/>
${personGlyph(255, 300, 1.1, palette.navyLight)}
${personGlyph(545, 300, 1.1, palette.orange)}
${label(400, 510, 'Thầy hướng dẫn trực tiếp trên xe', 25, palette.navy)}`,
    'Minh họa giáo viên hướng dẫn học viên trong xe',
  ),
});

images.push({
  path: 'images/gallery/video-placeholder.svg',
  content: svgWrapper(
    800,
    450,
    `  <rect width="800" height="450" fill="url(#navyGrad)"/>
  <circle cx="400" cy="200" r="60" fill="${palette.white}" opacity="0.9"/>
  <path d="M 383 170 L 432 200 L 383 230 Z" fill="${palette.navy}"/>
${label(400, 330, 'Video cảm nhận sẽ được đăng sau', 24, palette.sky)}
${label(400, 366, 'khi học viên đồng ý chia sẻ', 20, palette.navyLight)}`,
    'Vị trí đặt video cảm nhận học viên',
  ),
});

// --- Blog cover -----------------------------------------------------------
const blogCovers = [
  ['so-san-so-tu-dong', 'Số sàn hay số tự động?'],
  ['loi-sa-hinh', 'Lỗi thường gặp khi học sa hình'],
  ['buoi-hoc-dau-tien', 'Chuẩn bị buổi học đầu tiên'],
  ['co-bang-khong-dam-lai', 'Có bằng nhưng chưa dám lái'],
  ['quy-trinh-dang-ky', 'Quy trình đăng ký học lái xe'],
  ['duong-dong-tphcm', 'Lái xe đường đông tại TP.HCM'],
  ['giu-binh-tinh', 'Giữ bình tĩnh khi lái xe'],
  ['bo-tuc-tay-lai', 'Khi nào nên bổ túc tay lái?'],
];

blogCovers.forEach(([slug, title], index) => {
  const accent = [palette.navyLight, palette.orange, palette.green][index % 3];
  images.push({
    path: `images/blog/${slug}.svg`,
    content: svgWrapper(
      1200,
      630,
      `  <rect width="1200" height="630" fill="url(#skyGrad)"/>
  <rect x="0" y="0" width="1200" height="14" fill="${accent}"/>
  <circle cx="1020" cy="150" r="120" fill="${accent}" opacity="0.14"/>
  <circle cx="150" cy="520" r="90" fill="${accent}" opacity="0.14"/>
${carShape(430, 300, 340, palette.navy, accent)}
  <text x="600" y="200" text-anchor="middle" font-family="system-ui, sans-serif" font-size="44" font-weight="700" fill="${palette.navy}">${title}</text>
${label(600, 250, 'Kiến thức học lái xe', 22, palette.navyLight)}`,
      title,
    ),
  });
});

// --- OG image mac dinh ----------------------------------------------------
images.push({
  path: 'images/og/og-default.svg',
  content: svgWrapper(
    1200,
    630,
    `  <rect width="1200" height="630" fill="url(#navyGrad)"/>
  <circle cx="1050" cy="120" r="170" fill="${palette.navyLight}" opacity="0.25"/>
${carShape(120, 330, 420, palette.white, palette.sky)}
  <text x="120" y="200" font-family="system-ui, sans-serif" font-size="52" font-weight="700" fill="${palette.white}">Học lái xe cùng thầy</text>
  <text x="120" y="268" font-family="system-ui, sans-serif" font-size="30" font-weight="500" fill="${palette.sky}">Tận tình từ buổi đầu đến ngày thi sát hạch</text>
  <rect x="700" y="420" width="380" height="80" rx="40" fill="${palette.orange}"/>
  <text x="890" y="470" text-anchor="middle" font-family="system-ui, sans-serif" font-size="30" font-weight="700" fill="${palette.white}">Đăng ký tư vấn</text>`,
    'Ảnh chia sẻ mạng xã hội mặc định',
  ),
});

// --- Favicon --------------------------------------------------------------
images.push({
  path: 'icon.svg',
  content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Biểu tượng website học lái xe">
  <rect width="64" height="64" rx="14" fill="${palette.navy}"/>
  <rect x="12" y="30" width="40" height="14" rx="6" fill="${palette.white}"/>
  <path d="M 18 30 L 22 19 L 42 19 L 46 30 Z" fill="${palette.orangeSoft}"/>
  <circle cx="21" cy="46" r="5" fill="${palette.white}"/>
  <circle cx="43" cy="46" r="5" fill="${palette.white}"/>
</svg>
`,
});

for (const image of images) {
  const target = join(publicDir, image.path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, image.content, 'utf8');
}

console.log(`Da tao ${images.length} anh minh hoa trong thu muc public/.`);
