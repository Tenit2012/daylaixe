/**
 * Sinh anh ban do tinh cua trung tam tu tile OpenStreetMap.
 *
 * VI SAO KHONG NHUNG IFRAME GOOGLE MAPS:
 * Website nay khong co bat ky iframe ben thu ba nao, khong form, khong luu du
 * lieu ca nhan. Mot iframe Google Maps se keo theo 300-900 KB tai nguyen ben
 * thu ba, dat cookie va gui dia chi IP cua khach sang Google ngay khi ho cuon
 * toi - doi han lap truong rieng tu cua trang chi de hien mot lat ban do.
 *
 * Cach lam o day: tai tile MOT LAN o may nguoi phat trien, ghep thanh mot anh
 * WebP nam trong `public/`. Luc nguoi dung xem trang: khong request ben thu ba
 * nao, khong cookie, chi la mot tam anh vai chuc KB nhu moi anh khac.
 *
 * VI SAO KHONG DUNG Google Static Maps API: can khoa API va bat thanh toan,
 * lai la mot phu thuoc phai gia han. OpenStreetMap khong can khoa.
 *
 * GIAY PHEP: du lieu OpenStreetMap dung giay phep ODbL, BAT BUOC ghi cong
 * "© OpenStreetMap contributors" o noi hien thi anh. Dong ghi cong da duoc
 * dat trong trang /lien-he - neu doi cho hien anh, phai mang dong do theo.
 *
 * CHAY LAI khi nao: chi khi doi dia chi trung tam. Anh sinh ra duoc commit
 * vao repo nen build binh thuong khong can chay script nay.
 *
 *   node scripts/build-map-image.mjs
 */

import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import sharp from 'sharp';

/*
  Toa do lay tu chinh lien ket Google Maps dang cau hinh trong
  NEXT_PUBLIC_GOOGLE_MAPS_URL (da giai nen tu dang rut gon maps.app.goo.gl).
  Doi dia chi thi sua o day roi chay lai script.
*/
const CENTER = { lat: 10.8707802, lon: 106.8054619 };

/*
  Zoom 15: du gan de doc duoc ten duong quanh trung tam, du xa de nhin ra cac
  truc lon (Vo Nguyen Giap, xa lo) ma nguoi di duong dung de dinh huong.
  Zoom cao hon chi thay vai con hem, thap hon thi chu duong khong doc duoc.
*/
const ZOOM = 15;

/* Ty le 2:1 hop voi o luoi tren trang lien he. Nhan doi cho man hinh Retina. */
const WIDTH = 1200;
const HEIGHT = 600;

const TILE_SIZE = 256;
const OUTPUT = 'public/images/center/ban-do-trung-tam.webp';

/*
  Chinh sach dung tile cua OpenStreetMap yeu cau User-Agent nhan dang duoc ung
  dung va cam tai hang loat. Script nay tai dung 12-15 tile, chay tay vai lan
  trong doi du an - nam trong pham vi duoc phep.
*/
const USER_AGENT =
  'daylayxe-site-build/1.0 (script sinh anh ban do tinh, chay thu cong)';

/** Doi kinh do/vi do sang toa do diem anh trong he toa do the gioi cua tile. */
function project(lat, lon, zoom) {
  const scale = 2 ** zoom * TILE_SIZE;
  const latRad = (lat * Math.PI) / 180;
  return {
    x: ((lon + 180) / 360) * scale,
    y:
      ((1 -
        Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) /
        2) *
      scale,
  };
}

async function fetchTile(z, x, y) {
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Tai tile ${z}/${x}/${y} that bai: HTTP ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

/** Ghim do danh dau vi tri trung tam, ve bang SVG de net o moi do phan giai. */
function markerSvg() {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="72" viewBox="0 0 28 36">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22c0-7.73-6.27-14-14-14z"
        fill="#b0520a" stroke="#ffffff" stroke-width="2.5"/>
      <circle cx="14" cy="14" r="5.2" fill="#ffffff"/>
    </svg>`,
  );
}

async function run() {
  const center = project(CENTER.lat, CENTER.lon, ZOOM);

  // Goc trai-tren cua khung anh, tinh trong he toa do diem anh the gioi.
  const left = center.x - WIDTH / 2;
  const top = center.y - HEIGHT / 2;

  const tileX0 = Math.floor(left / TILE_SIZE);
  const tileY0 = Math.floor(top / TILE_SIZE);
  const tileX1 = Math.floor((left + WIDTH - 1) / TILE_SIZE);
  const tileY1 = Math.floor((top + HEIGHT - 1) / TILE_SIZE);

  const cols = tileX1 - tileX0 + 1;
  const rows = tileY1 - tileY0 + 1;
  console.log(
    `Can ${cols * rows} tile (${cols}x${rows}) o muc zoom ${ZOOM}...`,
  );

  const layers = [];
  for (let x = tileX0; x <= tileX1; x++) {
    for (let y = tileY0; y <= tileY1; y++) {
      const buffer = await fetchTile(ZOOM, x, y);
      layers.push({
        input: buffer,
        left: (x - tileX0) * TILE_SIZE,
        top: (y - tileY0) * TILE_SIZE,
      });
      process.stdout.write('.');
    }
  }
  console.log(' xong');

  // Ghep toan bo tile thanh mot tam lon, roi cat dung khung can giua diem moc.
  const mosaic = await sharp({
    create: {
      width: cols * TILE_SIZE,
      height: rows * TILE_SIZE,
      channels: 3,
      background: { r: 235, g: 232, b: 226 },
    },
  })
    .composite(layers)
    .png()
    .toBuffer();

  const offsetX = Math.round(left - tileX0 * TILE_SIZE);
  const offsetY = Math.round(top - tileY0 * TILE_SIZE);

  await mkdir(dirname(OUTPUT), { recursive: true });

  await sharp(mosaic)
    .extract({ left: offsetX, top: offsetY, width: WIDTH, height: HEIGHT })
    .composite([
      {
        input: await sharp(markerSvg()).png().toBuffer(),
        // Dat sao cho DAU NHON cua ghim tro dung vao tam anh, khong phai tam ghim.
        left: Math.round(WIDTH / 2 - 28),
        top: Math.round(HEIGHT / 2 - 72),
      },
    ])
    .webp({ quality: 82, effort: 6 })
    .toFile(OUTPUT);

  const { size } = await sharp(OUTPUT).metadata().then(async () => {
    const { default: fs } = await import('node:fs/promises');
    return fs.stat(OUTPUT);
  });

  console.log(`Da ghi ${OUTPUT} (${WIDTH}x${HEIGHT}, ${Math.round(size / 1024)} KB)`);
  console.log('NHO: giu dong ghi cong "© OpenStreetMap contributors" o noi hien anh.');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
