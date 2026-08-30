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
    source: 'IMG_1636.jpeg',
    // Anh goc khung DOC 592x1280. Cat 4:3 ngang lay phan giua - dau xe nam
    // giua khung. Khong phong to (nguon chi rong 592px).
    output: 'center/xe-tap-lai-hang-b.webp',
    width: 592,
    height: 444,
    position: 'center',
    note: 'Xe con tap lai hang B do trong nha xe cua trung tam',
  },
  {
    source: 'IMG_1637.jpeg',
    // Anh goc 1280x592 (rat rong). Cat 4:3 tu canh TRAI vi chiec xe tai nam
    // lech trai - cat giua se mat dau xe.
    output: 'center/xe-tai-tap-lai-c1.webp',
    width: 789,
    height: 592,
    position: 'left',
    note: 'Xe tai tap lai hang C1 tai san tap',
  },
  {
    source: 'IMG_1639.jpeg',
    // Cat 4:3 tu canh TRAI de giu nguoi ngoi ghe lai + vo lang; cat giua se
    // chi con bang taplo.
    output: 'center/trong-buoi-thuc-hanh.webp',
    width: 789,
    height: 592,
    position: 'left',
    note: 'Trong buoi thuc hanh - ghe lai, vo lang va thiet bi giam sat',
  },
  {
    source: 'IMG_1638.jpeg',
    // Anh goc khung DOC 592x1280, chup chinh dien - cat 4:3 lay phan giua.
    output: 'center/xe-tap-lai-chinh-dien.webp',
    width: 592,
    height: 444,
    position: 'center',
    note: 'Xe con tap lai nhin chinh dien tai san tap',
  },
  {
    source: 'IMG_1640.jpeg',
    // Anh goc 1280x592. Cat 4:3 tu canh TRAI de giu tron dau xe va bien
    // "TAP LAI"; cat giua se mat can truoc.
    output: 'center/xe-tap-lai-goc-cheo.webp',
    width: 789,
    height: 592,
    position: 'left',
    note: 'Xe con tap lai nhin goc cheo tai san tap',
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
    source: 'IMG_1658.jpeg',
    // Anh goc 5712x4284 nhung EXIF orientation = 6, tuc du lieu diem anh nam
    // NGANG con canh that phai xoay 90 do -> sau `.rotate()` thanh khung DOC
    // 4284x5712. Day dung la truong hop ma README canh bao: copy tay vao
    // public/ se ra anh nam nghieng.
    //
    // Cat 4:3 canh giua: chiec xe nam giua khung theo chieu doc nen cua so
    // giua giu tron dau xe, ca-lang, bien so va bien "TAP LAI", dong thoi con
    // lay duoc hang cay va cac bien bao phia sau. Khong can `extract` thu cong.
    output: 'center/xe-tap-lai-toyota-tai-san.webp',
    width: 1200,
    height: 900,
    position: 'center',
    note: 'Xe con tap lai Toyota bien 51G-248.37 nhin chinh dien tai san trung tam',
  },

  /*
   * ---------------------------------------------------------------------
   * ANH KHOA HOC - `public/images/courses/`
   * ---------------------------------------------------------------------
   * BAT BUOC ca 5 anh cung TY LE 8:5. `CourseCard` render anh bang
   * `h-auto w-full` (khong co khung ty le co dinh), nen anh lech ty le se
   * lam cac the trong luoi cao thap khac nhau va tieu de khong thang hang.
   * Kich thuoc pixel co the khac nhau, mien ty le giong nhau.
   */
  {
    source: 'IMG_1639.jpeg',
    // Cat tu canh TRAI: can so tu dong (x~400-800) la chi tiet quan trong
    // nhat cua khoa nay, cat giua se day no ra ria khung.
    output: 'courses/hang-b-so-tu-dong.webp',
    width: 947,
    height: 592,
    position: 'left',
    note: 'Hang B so tu dong - noi that xe, thay ro can so tu dong',
  },
  {
    source: 'IMG_1640.jpeg',
    // Chu website xac nhan xe nay (bien 51F-292.97) la xe SO SAN.
    // Cat tu canh TRAI de giu tron dau xe va bien "TAP LAI".
    output: 'courses/hang-b-so-san.webp',
    width: 947,
    height: 592,
    position: 'left',
    note: 'Hang B so san - xe con tap lai so san tai san',
  },
  {
    source: 'IMG_1637.jpeg',
    output: 'courses/hang-c1.webp',
    width: 947,
    height: 592,
    position: 'left',
    note: 'Hang C1 - xe tai tap lai',
  },
  {
    // Anh truoc day o o nay la 'thay-huong-dan-vo-lang.jpeg' - chup tren
    // CABIN MO PHONG trong phong, trong khi noi dung khoa bo tuc noi ve canh
    // duong, do xe, chay gio cao diem, len xuong ham chung cu. Anh va chu
    // khong khop nhau, lai trung canh voi anh hero trang chu (cung can phong
    // do, cung gian mo phong). Doi sang xe tap lai that cho dong bo voi 4 the
    // khoa hoc con lai - deu la xe that ngoai troi.
    //
    // Anh goc la khung DOC 592x1280. Cat 8:5 bang `position: 'center'` se lay
    // dai y=455..825, dung ngay bien so va bien "TAP LAI" va cat doi ca hai.
    // Vi vay chi dinh tay cua so y=580..950: giu tron ca-lang, den pha, bien
    // so 51L-096.03, bien "TAP LAI" va can truoc.
    source: 'IMG_1636.jpeg',
    output: 'courses/bo-tuc-tay-lai.webp',
    // Nguon chi rong 592px va `withoutEnlargement` chan phong to, nen dau ra
    // giu dung 592x370 - nho hon 4 anh kia ve pixel nhung DUNG ty le 8:5, la
    // dieu kien that su can de luoi the khong lech cao thap.
    width: 592,
    height: 370,
    position: 'center',
    extract: { left: 0, top: 580, width: 592, height: 370 },
    note: 'Bo tuc tay lai - xe con tap lai 51L-096.03 tai nha xe trung tam',
  },
  {
    source: 'xe-tap-lai-san-tap.jpeg',
    output: 'courses/luyen-sa-hinh.webp',
    width: 960,
    height: 600,
    position: 'center',
    note: 'Luyen sa hinh - xe do trong o ke vach, dung bai ghep xe',
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

/**
 * ---------------------------------------------------------------------------
 * BAN DAY DU CHO LIGHTBOX - `public/images/gallery-full/`
 * ---------------------------------------------------------------------------
 * Cac JOBS o tren deu CAT anh vao khung 4:3 cho vua luoi album. Voi anh chup
 * doc, phan bi cat di rat lon (IMG_1636 va IMG_1638 mat ~65% khung). Nen khi
 * nguoi dung bam phong to, dua lai chinh ban da cat do thi khong cho ho xem
 * them duoc gi - chi to hon phan ho da thay.
 *
 * Mang nay sinh ban GIU NGUYEN KHUNG GOC, chi thu nho cho vua hop
 * `MAX_FULL_EDGE`. Khong `extract`, khong `fit: cover`.
 *
 * VI SAO GIOI HAN 1600px chu khong lon hon: 8/10 anh nguon chi ~1200-1280px
 * canh dai (dau hieu da qua nen cua ung dung nhan tin). `withoutEnlargement`
 * chan phong to nen chung giu nguyen kich thuoc that - lightbox hien chung
 * trong khung `max-height: 88vh` la vua dep, khong bao gio bi keo gian mo.
 * Hai anh 5712px thu ve 1600px la du net o man hinh thuong ma van nhe.
 */
const MAX_FULL_EDGE = 1600;

const FULL_JOBS = [
  {
    source: 'thay-huong-dan-vo-lang.jpeg',
    name: 'thay-tung-huong-dan-hoc-vien',
  },
  { source: 'dan-xe-tap-lai.jpg', name: 'dan-xe-tap-lai' },
  { source: 'xe-tap-lai-san-tap.jpeg', name: 'san-tap-xe-tap-lai' },
  {
    source: 'congtruong.jpg',
    name: 'cong-truong',
    // Giu watermark giong ban trong album: day la anh dia diem de bi lay lai
    // nhat, va ban phong to chinh la ban dang gia nhat de lay.
    watermarkText: 'thaytungdaylaixe.com',
  },
  { source: 'IMG_1636.jpeg', name: 'xe-tap-lai-hang-b' },
  { source: 'IMG_1637.jpeg', name: 'xe-tai-tap-lai-c1' },
  { source: 'IMG_1638.jpeg', name: 'xe-tap-lai-chinh-dien' },
  { source: 'IMG_1639.jpeg', name: 'trong-buoi-thuc-hanh' },
  { source: 'IMG_1640.jpeg', name: 'xe-tap-lai-goc-cheo' },
  { source: 'IMG_1658.jpeg', name: 'xe-tap-lai-toyota-tai-san' },
];

/**
 * Sinh ban day du va IN RA dong khai bao `fullImage` de dan vao gallery.ts.
 *
 * Tra ve kich thuoc that de khong phai doan: `fit: 'inside'` cho ra kich
 * thuoc phu thuoc ti le tung anh, ma `gallery.ts` lai can con so chinh xac
 * (the <img> phai co width/height de trinh duyet giu cho, khong giat layout
 * khi anh tai xong).
 */
async function runFullJobs() {
  console.log('\n--- Ban day du cho lightbox ---');
  const declarations = [];

  for (const job of FULL_JOBS) {
    const sourcePath = join(SOURCE_DIR, job.source);
    const outputPath = join(OUTPUT_ROOT, `gallery-full/${job.name}.webp`);
    await mkdir(dirname(outputPath), { recursive: true });

    /*
     * CAI BAY: `.metadata()` doc the EXIF cua anh NGUON, KHONG phai ket qua
     * sau `.rotate()`. Anh chup dien thoai co `orientation = 6` co du lieu
     * diem anh nam ngang nhung canh that la doc - luc do `meta.width` va
     * `meta.height` bi hoan doi so voi anh nguoi ta nhin thay.
     *
     * Tinh hop co gian tren cap so chua hoan doi thi `fit: 'inside'` se do
     * anh (da xoay) vao mot hop sai chieu: anh doc 4284x5712 do vao hop
     * 1600x1200 ra 900x1200 - vua khai sai kich thuoc, vua vut di gan mot
     * nua do phan giai cua dung hai tam anh net nhat trong album.
     */
    const meta = await sharp(sourcePath).rotate().metadata();
    const swapped = (meta.orientation ?? 1) >= 5;
    const sourceWidth = swapped ? meta.height : meta.width;
    const sourceHeight = swapped ? meta.width : meta.height;

    const scale = Math.min(
      1,
      MAX_FULL_EDGE / Math.max(sourceWidth, sourceHeight),
    );
    const width = Math.round(sourceWidth * scale);
    const height = Math.round(sourceHeight * scale);

    const pipeline = sharp(sourcePath).rotate().resize(width, height, {
      fit: 'inside',
      withoutEnlargement: true,
    });

    if (job.watermarkText) {
      pipeline.composite([
        {
          input: await watermarkOverlay(job.watermarkText, width, height),
          top: 0,
          left: 0,
        },
      ]);
    }

    await pipeline.webp({ quality: 82, effort: 5 }).toFile(outputPath);

    const after = (await stat(outputPath)).size;
    console.log(
      `${job.source.padEnd(36)} -> gallery-full/${`${job.name}.webp`.padEnd(34)} ` +
        `${`${width}x${height}`.padEnd(10)} ${`${Math.round(after / 1024)} KB`.padStart(8)}`,
    );
    declarations.push(
      `      // ${job.name}\n      src: '/images/gallery-full/${job.name}.webp', width: ${width}, height: ${height},`,
    );
  }

  console.log('\nDan vao `fullImage` trong src/content/gallery.ts:');
  console.log(declarations.join('\n'));
}

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
      .rotate();

    // `extract` (tuy chon): cat thu cong theo toa do diem anh cua anh GOC,
    // tinh SAU khi da xoay theo EXIF. Dung khi `position` cua sharp - chi
    // nhan 'center' | 'top' | 'left' ... - khong du de giu dung chi tiet bat
    // buoc phai con trong khung (vi du bien so, bien "TAP LAI").
    if (job.extract) {
      pipeline.extract(job.extract);
    }

    pipeline.resize(job.width, job.height, {
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

  await runFullJobs();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
