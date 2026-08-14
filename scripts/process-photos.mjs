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
 * `position` nhan gia tri cua sharp: 'top' | 'center' | 'bottom' | 'left' |
 * 'right' ... Voi anh chan dung cat thanh khung ngang, thuong phai chon 'top'
 * hoac 'center' de giu phan dau nguoi.
 *
 * `format` mac dinh 'webp'. Chi dung 'jpeg' cho anh Open Graph: nhieu trinh
 * thu thap cua mang xa hoi (Zalo, mot so phien ban Facebook) van khong doc
 * duoc WebP khi render anh xem truoc.
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
    source: 'cabin-mo-phong-hoc-vien.jpg',
    output: 'center/cabin-mo-phong.webp',
    width: 1200,
    height: 674,
    position: 'center',
    note: 'Trang thiet bi cua trung tam - cabin hoc lai mo phong',
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
