/**
 * Seed du lieu cho moi truong PHAT TRIEN.
 *
 * Chay: npm run db:seed
 *
 * QUAN TRONG:
 *  - Tai khoan quan tri lay tu bien moi truong ADMIN_EMAIL / ADMIN_PASSWORD.
 *    KHONG hard-code mat khau trong file nay.
 *  - Cac lead mau deu duoc danh dau ro trong ghi chu la du lieu development
 *    va dung so dien thoai thuoc dai 0912 34x xxx de tranh trung so that.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SEED_MARKER = '[DEV SEED] Dữ liệu mẫu cho môi trường phát triển.';

async function seedAdminUser(): Promise<void> {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Thieu ADMIN_EMAIL hoac ADMIN_PASSWORD trong file .env. Xem .env.example.',
    );
  }

  if (password.length < 6) {
    throw new Error('ADMIN_PASSWORD phai co it nhat 6 ky tu.');
  }

  if (process.env.NODE_ENV === 'production' && password === 'change-me') {
    throw new Error(
      'Khong duoc dung mat khau mac dinh "change-me" o moi truong production.',
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, isActive: true },
    create: {
      email,
      passwordHash,
      name: 'Quản trị viên',
      role: 'OWNER',
      isActive: true,
    },
  });

  console.log(`  - Tai khoan quan tri: ${user.email} (mat khau lay tu .env)`);
}

interface SeedLead {
  fullName: string;
  phone: string;
  interestedCourse: string;
  location: string;
  preferredContactTime: string;
  note: string;
  sourcePage: string;
  status: string;
  adminNote?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  daysAgo: number;
}

const seedLeads: SeedLead[] = [
  {
    fullName: 'Nguyễn Văn An',
    phone: '0912340001',
    interestedCourse: 'hang-b-so-tu-dong',
    location: 'TP. Thủ Đức',
    preferredContactTime: 'toi',
    note: 'Em chưa từng lái xe, muốn học số tự động để chạy xe gia đình.',
    sourcePage: '/',
    status: 'NEW',
    daysAgo: 0,
  },
  {
    fullName: 'Trần Thị Bình',
    phone: '0912340002',
    interestedCourse: 'hang-b-so-san',
    location: 'Quận Bình Thạnh',
    preferredContactTime: 'sang',
    note: 'Em muốn học số sàn vì công việc có thể phải lái xe tải nhẹ.',
    sourcePage: '/khoa-hoc/hang-b-so-san',
    status: 'CONTACTED',
    adminNote: 'Đã gọi lúc 9h, hẹn gọi lại cuối tuần để chốt lịch.',
    utmSource: 'facebook',
    utmMedium: 'social',
    utmCampaign: 'khai-giang-thang-9',
    daysAgo: 1,
  },
  {
    fullName: 'Lê Minh Cường',
    phone: '0912340003',
    interestedCourse: 'bo-tuc-tay-lai',
    location: 'Quận 9 cũ',
    preferredContactTime: 'chieu',
    note: 'Em có bằng 3 năm rồi nhưng chưa dám tự chạy, cần bổ túc tuyến đi làm.',
    sourcePage: '/kien-thuc/co-bang-nhung-khong-dam-lai-xe-phai-lam-sao',
    status: 'CONSIDERING',
    adminNote: 'Đã tư vấn 4 buổi bổ túc, học viên đang sắp xếp thời gian.',
    utmSource: 'google',
    utmMedium: 'organic',
    daysAgo: 3,
  },
  {
    fullName: 'Phạm Thu Dung',
    phone: '0912340004',
    interestedCourse: 'luyen-sa-hinh',
    location: 'TP. Thủ Đức',
    preferredContactTime: 'bat-ky',
    note: 'Em trượt bài ghép ngang, muốn luyện thêm trước kỳ thi tháng sau.',
    sourcePage: '/khoa-hoc/luyen-sa-hinh',
    status: 'ENROLLED',
    adminNote: 'Đã xếp 3 buổi luyện sa hình vào các tối thứ 3, 5, 7.',
    daysAgo: 6,
  },
  {
    fullName: 'Hoàng Quốc Đạt',
    phone: '0912340005',
    interestedCourse: 'hang-c1',
    location: 'Quận 12',
    preferredContactTime: 'trua',
    note: 'Em cần bằng để chạy xe tải nhẹ giao hàng, muốn hỏi điều kiện dự học.',
    sourcePage: '/khoa-hoc/hang-c1',
    status: 'CONTACTED',
    adminNote: 'Đã hướng dẫn kiểm tra điều kiện dự học, chờ học viên phản hồi.',
    utmSource: 'zalo',
    utmMedium: 'message',
    daysAgo: 9,
  },
  {
    fullName: 'Vũ Thị Én',
    phone: '0912340006',
    interestedCourse: 'chua-xac-dinh',
    location: 'Quận Gò Vấp',
    preferredContactTime: 'toi',
    note: 'Em chưa biết nên học số sàn hay số tự động, mong thầy tư vấn giúp.',
    sourcePage: '/kien-thuc/nguoi-moi-nen-hoc-lai-xe-so-san-hay-so-tu-dong',
    status: 'NEW',
    daysAgo: 12,
  },
  {
    fullName: 'Đỗ Hải Phong',
    phone: '0912340007',
    interestedCourse: 'hang-b-so-tu-dong',
    location: 'Quận 7',
    preferredContactTime: 'sang',
    note: 'Số này em nhập nhầm, xin lỗi thầy.',
    sourcePage: '/lien-he',
    status: 'INVALID',
    adminNote: 'Số không liên lạc được sau 3 lần gọi.',
    daysAgo: 20,
  },
  {
    fullName: 'Ngô Thanh Giang',
    phone: '0912340008',
    interestedCourse: 'bo-tuc-tay-lai',
    location: 'TP. Thủ Đức',
    preferredContactTime: 'chieu',
    note: 'Em muốn tập đỗ xe trong hầm chung cư.',
    sourcePage: '/khoa-hoc/bo-tuc-tay-lai',
    status: 'NOT_INTERESTED',
    adminNote: 'Học viên đã tự tập được với người nhà, tạm thời chưa cần.',
    daysAgo: 28,
  },
];

async function seedLeadData(): Promise<void> {
  const existing = await prisma.lead.count();
  if (existing > 0) {
    console.log(
      `  - Bo qua seed lead: database da co ${existing} ban ghi. Chay "npm run db:reset" neu muon lam moi.`,
    );
    return;
  }

  for (const lead of seedLeads) {
    const createdAt = new Date(Date.now() - lead.daysAgo * 24 * 60 * 60 * 1000);
    await prisma.lead.create({
      data: {
        fullName: lead.fullName,
        phone: lead.phone,
        normalizedPhone: lead.phone,
        interestedCourse: lead.interestedCourse,
        location: lead.location,
        preferredContactTime: lead.preferredContactTime,
        note: lead.note,
        sourcePage: lead.sourcePage,
        utmSource: lead.utmSource ?? null,
        utmMedium: lead.utmMedium ?? null,
        utmCampaign: lead.utmCampaign ?? null,
        status: lead.status,
        adminNote: lead.adminNote
          ? `${lead.adminNote}\n\n${SEED_MARKER}`
          : SEED_MARKER,
        createdAt,
        updatedAt: createdAt,
      },
    });
  }

  console.log(`  - Da tao ${seedLeads.length} lead mau (danh dau la DEV SEED).`);
}

async function main(): Promise<void> {
  console.log('Bat dau seed du lieu development...');
  await seedAdminUser();
  await seedLeadData();
  console.log('Seed hoan tat.');
}

main()
  .catch((error: unknown) => {
    console.error(
      'Seed that bai:',
      error instanceof Error ? error.message : error,
    );
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
