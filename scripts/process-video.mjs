/**
 * Chuyen video goc trong `assets/videos/` thanh video dung duoc tren web,
 * kem anh poster.
 *
 * Vi sao khong copy thang file .mov vao public/:
 *  - File goc dung container QuickTime (`ftyp` major brand = "qt  ", khong co
 *    brand "isom"/"mp42"). Ben trong tuy da la H.264 + AAC nhung Firefox va
 *    mot so ban Chrome VAN tu choi phat vi doc brand cua container. Doi sang
 *    MP4 chuan la bat buoc, khong phai toi uu cho vui.
 *  - `-movflags +faststart` day bang chi muc (moov atom) len DAU file. Neu
 *    khong, trinh duyet phai tai gan het file moi bat dau phat duoc.
 *
 * Anh poster la BAT BUOC vi the <video> dung `preload="none"` - khong co
 * poster thi nguoi dung nhin thay o den truoc khi bam play.
 *
 * Chay:  node scripts/process-video.mjs
 * Can devDependency `ffmpeg-static` (tu tai san ffmpeg, khong phai cai tay).
 */

import { execFileSync } from 'node:child_process';
import { mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const SOURCE_DIR = 'assets/videos';

const JOBS = [
  {
    source: 'buoi-hoc-thuc-te.mp4',
    video: 'public/videos/buoi-hoc-thuc-te.mp4',
    poster: 'public/images/teacher/buoi-hoc-thuc-te-poster.jpg',
    /** Giay thu may dung lam anh poster - chon khung thay ro ca thay lan hoc vien. */
    posterAtSecond: 12,
    /**
     * File goc co watermark "CapCut Ai" co dinh o goc tren-trai suot video.
     * Bop khung 7% (het canh tren + vien trai/phai) roi phong lai dung kich
     * thuoc cu de cat watermark ma khong bop meo ty le khung hinh 480x854.
     */
    cropFilter: 'crop=446:794:17:60,scale=480:854',
    note: 'Thay huong dan hoc vien tren xe tap lai',
  },
  {
    source: 'videoplayback.mp4',
    video: 'public/videos/thuc-hanh-san-tap.mp4',
    poster: 'public/images/center/thuc-hanh-san-tap-poster.jpg',
    posterAtSecond: 20,
    note: 'Thuc hanh tai san tap - video da tung dang YouTube, tai lai de tu luu',
  },
];

/** Chay ffmpeg, chi in loi khi that bai. */
function ffmpeg(args) {
  execFileSync(ffmpegPath, [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    ...args,
  ]);
}

async function run() {
  for (const job of JOBS) {
    const sourcePath = join(SOURCE_DIR, job.source);
    await mkdir(dirname(job.video), { recursive: true });
    await mkdir(dirname(job.poster), { recursive: true });

    const before = (await stat(sourcePath)).size;
    const cropArgs = job.cropFilter ? ['-vf', job.cropFilter] : [];

    ffmpeg([
      '-i',
      sourcePath,
      ...cropArgs,
      // H.264 High profile + yuv420p: to hop duoc moi trinh duyet hien nay doc.
      '-c:v',
      'libx264',
      '-profile:v',
      'high',
      '-pix_fmt',
      'yuv420p',
      '-crf',
      '26',
      '-preset',
      'slow',
      '-c:a',
      'aac',
      '-b:a',
      '96k',
      '-movflags',
      '+faststart',
      job.video,
    ]);

    ffmpeg([
      '-ss',
      String(job.posterAtSecond),
      '-i',
      sourcePath,
      ...cropArgs,
      '-frames:v',
      '1',
      '-q:v',
      '4',
      job.poster,
    ]);

    const after = (await stat(job.video)).size;
    const posterSize = (await stat(job.poster)).size;
    const kb = (n) => `${Math.round(n / 1024)} KB`;

    console.log(
      `${job.source} -> ${job.video}\n` +
        `   video : ${kb(before)} -> ${kb(after)}\n` +
        `   poster: ${job.poster} (${kb(posterSize)})`,
    );
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
