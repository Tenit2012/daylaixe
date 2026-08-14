/**
 * check-production-placeholders.ts
 * ---------------------------------------------------------------------------
 * Kiem tra cac PLACEHOLDER / GIA TRI MAU nguy hiem con sot lai truoc khi
 * deploy production. Duoc thiet ke cho codebase nay - noi placeholder la CO
 * CHU DICH o vai file ha tang (env schema, config helper). Vi vay script chi
 * bao dong o nhung noi co the di production, va bo qua cac vi tri placeholder
 * hop le (allowlist).
 *
 * Chay: npm run check:placeholders
 *
 * Thoat 1 (that bai) khi phat hien van de muc "error"; in canh bao (khong
 * fail) cho muc "warn". Khong bao gio in gia tri secret day du.
 *
 * Logic loi duoc tach thanh cac ham thuan (evaluateEnv, scanSourceText) de
 * co the unit-test: xem tests/unit/check-placeholders.test.ts
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

// ---------------------------------------------------------------------------
// Kieu du lieu
// ---------------------------------------------------------------------------

export type Severity = 'error' | 'warn';

export interface Finding {
  severity: Severity;
  code: string;
  message: string;
  file?: string;
  line?: number;
}

// ---------------------------------------------------------------------------
// 1) Danh gia bien moi truong hieu luc (.env / process.env)
// ---------------------------------------------------------------------------

/** Che gia tri de khong in secret ra log. */
export function mask(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length <= 4) return '***';
  return `${trimmed.slice(0, 3)}***`;
}

/** Mot gia tri co con la placeholder dang `[...]` khong. */
export function isBracketPlaceholder(value: string): boolean {
  return /^\[.*\]$/.test(value.trim());
}

/**
 * Cac bien BAT BUOC phai co gia tri that truoc production, kem gia tri "mau"
 * bi cam.
 */
interface EnvRule {
  key: string;
  /** Muc do khi CHUA nham production. `error` chi duoc ap khi strict=true. */
  productionBlocker: boolean;
  forbidden?: RegExp;
  forbiddenMessage?: string;
  minLength?: number;
  requiredNonPlaceholder?: boolean;
}

const ENV_RULES: EnvRule[] = [
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    productionBlocker: true,
    forbidden: /localhost|127\.0\.0\.1/i,
    forbiddenMessage: 'van tro toi localhost',
  },
  {
    key: 'NEXT_PUBLIC_TEACHER_NAME',
    productionBlocker: false,
    requiredNonPlaceholder: true,
  },
  {
    key: 'NEXT_PUBLIC_PHONE_NUMBER',
    productionBlocker: false,
    requiredNonPlaceholder: true,
  },
  {
    key: 'NEXT_PUBLIC_ZALO_URL',
    productionBlocker: false,
    requiredNonPlaceholder: true,
  },
  {
    key: 'NEXT_PUBLIC_TEACHER_TITLE',
    productionBlocker: false,
    requiredNonPlaceholder: true,
  },
  {
    key: 'NEXT_PUBLIC_ADDRESS',
    productionBlocker: false,
    requiredNonPlaceholder: true,
  },
  {
    key: 'NEXT_PUBLIC_TRAINING_AREA',
    productionBlocker: false,
    requiredNonPlaceholder: true,
  },
  {
    key: 'NEXT_PUBLIC_CENTER_NAME',
    productionBlocker: false,
    requiredNonPlaceholder: true,
  },
  {
    key: 'NEXT_PUBLIC_CONTACT_EMAIL',
    productionBlocker: false,
    requiredNonPlaceholder: true,
  },
];

/**
 * Danh gia mot ban ghi env (thuan, de test).
 *
 * `strict = true` (khi nham production): moi van de production-blocker la
 * `error`. `strict = false` (chay o dev): ha xuong `warn` de dev van pass —
 * localhost/sqlite la binh thuong o local.
 */
export function evaluateEnv(
  env: Record<string, string | undefined>,
  strict = false,
): Finding[] {
  const findings: Finding[] = [];
  const blockerSeverity: Severity = strict ? 'error' : 'warn';

  for (const rule of ENV_RULES) {
    const value = env[rule.key]?.trim() ?? '';

    if (value.length === 0) {
      findings.push({
        severity: 'warn',
        code: 'ENV_EMPTY',
        message: `${rule.key} chua duoc dat`,
        file: '.env',
      });
      continue;
    }

    if (rule.requiredNonPlaceholder && isBracketPlaceholder(value)) {
      findings.push({
        severity: rule.productionBlocker ? blockerSeverity : 'warn',
        code: 'ENV_PLACEHOLDER',
        message: `${rule.key} con la placeholder ${value}`,
        file: '.env',
      });
      continue;
    }

    if (rule.forbidden && rule.forbidden.test(value)) {
      findings.push({
        severity: rule.productionBlocker ? blockerSeverity : 'warn',
        code: 'ENV_FORBIDDEN',
        message: `${rule.key} ${rule.forbiddenMessage} (gia tri: ${mask(value)})`,
        file: '.env',
      });
      continue;
    }

    if (rule.minLength !== undefined && value.length < rule.minLength) {
      findings.push({
        severity: rule.productionBlocker ? blockerSeverity : 'warn',
        code: 'ENV_TOO_SHORT',
        message: `${rule.key} ngan hon ${rule.minLength} ky tu`,
        file: '.env',
      });
    }
  }

  return findings;
}

/** Doc file .env dang KEY="value" / KEY=value (khong phu thuoc thu vien). */
export function parseEnvFile(content: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

// ---------------------------------------------------------------------------
// 2) Quet source tim literal nguy hiem (ngoai allowlist)
// ---------------------------------------------------------------------------

/**
 * Cac pattern KHONG duoc xuat hien trong source di production. Placeholder
 * `[...]` hop le chi ton tai o file ha tang (allowlist ben duoi).
 */
const DANGEROUS_SOURCE_PATTERNS: Array<{
  code: string;
  regex: RegExp;
  message: string;
}> = [
  {
    code: 'PHONE_0900',
    regex: /0900000000/,
    message: 'so dien thoai mau 0900000000',
  },
  {
    code: 'PHONE_0123',
    regex: /0123456789/,
    message: 'so dien thoai mau 0123456789',
  },
  {
    code: 'EMAIL_EXAMPLE',
    regex: /example@example\.com/i,
    message: 'email mau example@example.com',
  },
  {
    code: 'CHANGE_ME',
    regex: /change-?me|changeme/i,
    message: 'chuoi "change-me"',
  },
  {
    code: 'BRACKET_TEACHER',
    regex: /\[Tên thầy\]/,
    message: 'placeholder [Tên thầy]',
  },
  {
    code: 'BRACKET_PHONE',
    regex: /\[Số điện thoại\]/,
    message: 'placeholder [Số điện thoại]',
  },
  {
    code: 'BRACKET_ZALO',
    regex: /\[Zalo URL\]/,
    message: 'placeholder [Zalo URL]',
  },
  {
    code: 'BRACKET_ADDRESS',
    regex: /\[Địa chỉ\]/,
    message: 'placeholder [Địa chỉ]',
  },
  {
    code: 'EXAMPLE_DOMAIN',
    regex: /https?:\/\/[^\s"']*example\.com/i,
    message: 'domain example.com',
  },
];

/**
 * Duong dan (tinh tu goc repo, dung dau '/') duoc phep chua placeholder hop
 * le - vi day la ha tang xu ly placeholder, KHONG phai du lieu di production.
 */
const SOURCE_ALLOWLIST = [
  'src/lib/env/public.ts', // default `[...]` co chu dich cho dev
  'src/config/site.ts', // isPlaceholderValue helper + nhan
];

/** Quet mot doan text (thuan, de test). */
export function scanSourceText(text: string, filePath: string): Finding[] {
  const findings: Finding[] = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const pattern of DANGEROUS_SOURCE_PATTERNS) {
      if (pattern.regex.test(line)) {
        findings.push({
          severity: 'error',
          code: pattern.code,
          message: `${pattern.message} trong source production`,
          file: filePath,
          line: index + 1,
        });
      }
    }
  });

  return findings;
}

// ---------------------------------------------------------------------------
// 3) Duyet file (chi phan I/O; logic o tren de test rieng)
// ---------------------------------------------------------------------------

const SCAN_DIRS = ['src'];
const SCAN_EXT = new Set(['.ts', '.tsx']);
const IGNORE_DIRS = new Set([
  'node_modules',
  '.next',
  'dist',
  'build',
  'coverage',
]);

function toPosix(p: string): string {
  return p.split(sep).join('/');
}

function isAllowlisted(relPosix: string): boolean {
  return SOURCE_ALLOWLIST.includes(relPosix);
}

function walk(root: string, dir: string, acc: string[]): void {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (IGNORE_DIRS.has(entry)) continue;
      // Bo qua thu muc test - fixture co the chua du lieu mau hop le.
      if (toPosix(relative(root, full)).includes('/tests/')) continue;
      walk(root, full, acc);
    } else {
      const ext = entry.slice(entry.lastIndexOf('.'));
      if (SCAN_EXT.has(ext)) acc.push(full);
    }
  }
}

export function scanRepo(root: string, strictEnv = false): Finding[] {
  const findings: Finding[] = [];

  // Env
  const envPath = join(root, '.env');
  if (existsSync(envPath)) {
    const env = parseEnvFile(readFileSync(envPath, 'utf8'));
    findings.push(...evaluateEnv(env, strictEnv));
  } else {
    findings.push({
      severity: 'warn',
      code: 'ENV_MISSING',
      message: '.env khong ton tai - bo qua kiem tra bien moi truong',
    });
  }

  // Source
  const files: string[] = [];
  for (const d of SCAN_DIRS) {
    const dir = join(root, d);
    if (existsSync(dir)) walk(root, dir, files);
  }
  for (const file of files) {
    const relPosix = toPosix(relative(root, file));
    if (isAllowlisted(relPosix)) continue;
    findings.push(...scanSourceText(readFileSync(file, 'utf8'), relPosix));
  }

  return findings;
}

// ---------------------------------------------------------------------------
// 4) Entrypoint
// ---------------------------------------------------------------------------

function isMainModule(): boolean {
  const invoked = process.argv[1] ?? '';
  return invoked.includes('check-production-placeholders');
}

if (isMainModule()) {
  const root = process.cwd();
  // Strict (env forbidden -> error) khi nham production: dat NODE_ENV=production
  // hoac truyen co --production. O dev, localhost/sqlite chi la canh bao.
  const strictEnv =
    process.env.NODE_ENV === 'production' ||
    process.argv.includes('--production');
  const findings = scanRepo(root, strictEnv);
  const errors = findings.filter((f) => f.severity === 'error');
  const warnings = findings.filter((f) => f.severity === 'warn');

  for (const f of warnings) {
    const loc = f.file ? ` (${f.file}${f.line ? `:${f.line}` : ''})` : '';
    console.warn(`  [warn]  ${f.code}: ${f.message}${loc}`);
  }
  for (const f of errors) {
    const loc = f.file ? ` (${f.file}${f.line ? `:${f.line}` : ''})` : '';
    console.error(`  [ERROR] ${f.code}: ${f.message}${loc}`);
  }

  console.log(
    `\ncheck:placeholders -> ${errors.length} loi, ${warnings.length} canh bao.`,
  );

  if (errors.length > 0) {
    console.error(
      'Con placeholder/gia tri mau muc chan deploy. Xem docs/MOCK_AND_SAMPLE_DATA_AUDIT.md',
    );
    process.exit(1);
  }
  process.exit(0);
}
