/**
 * Chuyen anh goc trong `assets/photos/` thanh anh dung duoc tren web.
 *
 * Vi sao can script nay thay vi copy tay:
 *  1. Anh chup tu dien thoai (IMG_15xx) co the EXIF `orientation = 6`, nghia la
 *     du lieu diem anh nam ngang nhung phai xoay 90 do khi hien thi. `.rotate()`
 *     khong tham so se "nuong" huong xoay do vao chinh diem anh, nho vay anh
 *     hien dung o MOI trinh duyet va moi cong cu, khong phu thuoc EXIF nua.
 *  2. Anh goc nang ~3,7 MB moi tam - qua nang cho web.
 *  3. Mot so o tren giao dien la khung ngang, trong khi anh goc la khung doc,
 *     nen phai cat. `position` duoc chi dinh THU CONG cho tung anh (khong dung
 *     cat tu dong) de khong bao gio cat mat dau nguoi.
 *  4. Website dung `output: 'export'` nen Next.js KHONG con toi uu anh luc
 *     chay. Toan bo viec nen va doi dinh dang phai lam o day. Dau ra mac dinh
 *     la WebP - nho hon JPEG khoang 25-35% o cung chat luong va duoc moi
 *     trinh duyet con duoc ho tro doc.
 *
 * Chay lai bat cu luc nao:  node scripts/process-photos.mjs
 * Script chi DOC `assets/photos/` va GHI vao `public/images/` - khong sua file
 * nao khac, chay lai nhieu lan cho ket qua giong nhau.
 */

import { mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'assets/photos';
const OUTPUT_ROOT = 'public/images';

/**
 * Tao lop phu PNG chua chu ky/watermark, dat giua-duoi (KHONG dat goc-phai).
 *
 * Ly do dat giua thay vi goc: gallery hien anh trong khung ti le co dinh
 * (`aspect-[4/3]`, `object-cover`), crop can giua theo chieu ngang. Anh nguon
 * cang "toan canh" (ti le rong) thi crop cang an vao 2 canh - chu o goc duoi-
 * phai co the bi cat mat mot phan. Dat giua-duoi la vung song sot moi kieu
 * crop-can-giua, du ti le khung hien thi la gi.
 *
 * Dung vien den mo (stroke) quanh chu trang de doc duoc tren moi nen anh ma
 * khong can them thanh mau phia sau - giu anh sach, khong che noi dung.
 *
 * Rasterize SVG roi resize ep dung `width x height`: librsvg co the xuat ra
 * kich thuoc lech 1px so voi khai bao trong SVG, khien `composite()` bao loi
 * "must have same dimensions or smaller" neu dua thang buffer SVG vao.
 */
async function watermarkOverlay(text, width, height) {
  const fontSize = Math.round(width * 0.024);
  const paddingY = Math.round(height * 0.05);
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${width / 2}" y="${height - paddingY}" text-anchor="middle"
        font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="600"
        fill="rgba(255,255,255,0.92)" stroke="rgba(0,0,0,0.55)"
        stroke-width="${Math.max(2, Math.round(fontSize * 0.12))}" paint-order="stroke">${escaped}</text>
    </svg>`,
  );
  return sharp(svg).resize(width, height, { fit: 'fill' }).png().toBuffer();
}

/**
 * `position` nhan gia tri cua sharp: 'top' | 'center' | 'bottom' | 'left' |
 * 'right' ... Voi anh chan dung cat thanh khung ngang, thuong phai chon 'top'
 * hoac 'center' de giu phan dau nguoi.
 *
 * `format` mac dinh 'webp'. Chi dung 'jpeg' cho anh Open Graph: nhieu trinh
 * thu thap cua mang xa hoi (Zalo, mot so phien ban Facebook) van khong doc
 * duoc WebP khi render anh xem truoc.
 *
 * `watermarkText` (tuy chon): dong chu ky nho o goc duoi-phai anh, vi du
 * ten mien website. Chi dung cho anh chup dia diem/hoat dong chung - KHONG
 * dung cho chan dung ca nhan.
 */
const JOBS = [
  {
    source: 'thay-tai-phong-lam-viec.jpeg',
    output: 'teacher/thay-tung-chan-dung.webp',
    width: 900,
    height: 1125,
    position: 'center',
    note: 'Chan dung thay - khung doc 4:5, dung o trang chu va /gioi-thieu',
  },
  {
    source: 'thay-giai-thich-man-hinh-cabin.jpeg',
    output: 'teacher/thay-tung-cabin.webp',
    width: 1400,
    height: 1050,
    position: 'center',
    note: 'Hero trang chu - thay giai thich tren cabin mo phong',
  },
  {
    source: 'thay-huong-dan-vo-lang.jpeg',
    output: 'teacher/thay-tung-huong-dan-hoc-vien.webp',
    width: 1200,
    height: 900,
    position: 'center',
    note: 'Gallery - thay cam vo lang huong dan hoc vien',
  },
  {
    source: 'NguyenThanhTung-laixeanninh.jpg',
    // Anh nguon vuong 598x598, do phan giai thap - GIU nguyen ty le goc
    // (598x449, cat 4:3) thay vi phong to len 1200 nhu cac anh khac, tranh
    // lam anh ro net thap cang lo hon.
    output: 'teacher/thay-tung-ben-xe.webp',
    width: 598,
    height: 449,
    position: 'center',
    note: 'Chan dung thay Tung dung canh xe - Album',
  },
  {
    source: 'dan-xe-tap-lai.jpg',
    output: 'center/dan-xe-tap-lai.webp',
    width: 1200,
    height: 674,
    position: 'center',
    note: 'Dan xe tap lai hang C1 tai trung tam',
  },
  {
    source: 'xe-tap-lai-san-tap.jpeg',
    // Anh goc la khung DOC 960x1280. Cat thanh 4:3 ngang, lay phan giua
    // vi chiec xe nam o giua khung.
    output: 'center/san-tap-xe-tap-lai.webp',
    width: 960,
    height: 720,
    position: 'center',
    note: 'San tap - xe tap lai do trong o ke vach vang',
  },
  {
    source: 'congtruong.jpg',
    // Anh goc rat panorama (1241x580, ti le ~2.14:1) - giu dung ti le goc
    // (1200x561) thay vi ep 1200x674 nhu cac anh khac, vi ep vay se can
    // phong to anh len (withoutEnlargement se chan va gay loi composite).
    output: 'center/cong-truong.webp',
    width: 1200,
    height: 561,
    position: 'center',
    watermarkText: 'thaytungdaylaixe.com',
    note: 'Cong Trung tam Sat hach Lai xe - Truong Dai hoc An ninh Nhan dan',
  },
  {
    source: 'thay-giai-thich-man-hinh-cabin.jpeg',
    output: 'og/og-default.jpg',
    format: 'jpeg',
    width: 1200,
    height: 630,
    position: 'center',
    note: 'Anh Open Graph khi chia se link len Zalo/Facebook - GIU JPEG',
  },
];

async function run() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const job of JOBS) {
    const sourcePath = join(SOURCE_DIR, job.source);
    const outputPath = join(OUTPUT_ROOT, job.output);
    await mkdir(dirname(outputPath), { recursive: true });

    const before = (await stat(sourcePath)).size;

    const pipeline = sharp(sourcePath)
      // Khong truyen tham so => ap dung dung goc xoay ghi trong EXIF.
      .rotate()
      .resize(job.width, job.height, {
        fit: 'cover',
        position: job.position,
        withoutEnlargement: true,
      });

    if (job.watermarkText) {
      pipeline.composite([
        {
          input: await watermarkOverlay(
            job.watermarkText,
            job.width,
            job.height,
          ),
          top: 0,
          left: 0,
        },
      ]);
    }

    if (job.format === 'jpeg') {
      pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
    } else {
      pipeline.webp({ quality: 80, effort: 5 });
    }

    await pipeline.toFile(outputPath);

    const after = (await stat(outputPath)).size;
    totalBefore += before;
    totalAfter += after;

    const kb = (n) => `${Math.round(n / 1024)} KB`;
    console.log(
      `${job.source.padEnd(36)} -> ${job.output.padEnd(42)} ` +
        `${`${job.width}x${job.height}`.padEnd(10)} ${kb(before).padStart(9)} -> ${kb(after).padStart(8)}`,
    );
  }

  const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
  console.log(`\nTong: ${mb(totalBefore)} -> ${mb(totalAfter)}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
