/**
 * Trich xuat thong tin ngu canh request phia server:
 *  - Dia chi IP (de rate limiting).
 *  - Tham so UTM (de biet lead den tu chien dich nao).
 *
 * Cac ham o day thuan tuy (pure) nen test duoc doc lap voi Next.js.
 */

const IP_HEADER_ORDER = [
  'x-forwarded-for',
  'x-real-ip',
  'cf-connecting-ip',
  'x-vercel-forwarded-for',
] as const;

export interface HeaderLike {
  get(name: string): string | null;
}

/**
 * Lay IP client tu header proxy. Tra ve `'unknown'` neu khong xac dinh duoc -
 * khi do rate limit se gom chung, van an toan hon la bo qua.
 */
export function getClientIp(headers: HeaderLike): string {
  for (const header of IP_HEADER_ORDER) {
    const raw = headers.get(header);
    if (!raw) continue;
    // x-forwarded-for co the la danh sach: "client, proxy1, proxy2"
    const first = raw.split(',')[0]?.trim();
    if (first && first.length > 0) return first;
  }
  return 'unknown';
}

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

const UTM_MAX_LENGTH = 120;

function cleanUtmValue(value: string | null | undefined): string | undefined {
  if (typeof value !== 'string') return undefined;
  const cleaned = value.trim().slice(0, UTM_MAX_LENGTH);
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Doc tham so UTM tu query string hoac URLSearchParams.
 * Chap nhan chuoi ('?utm_source=facebook&...'), URL day du, hoac
 * doi tuong URLSearchParams.
 */
export function extractUtmParams(
  input: string | URLSearchParams | null | undefined,
): UtmParams {
  if (!input) return {};

  let params: URLSearchParams;
  if (typeof input === 'string') {
    const queryIndex = input.indexOf('?');
    const queryString = queryIndex >= 0 ? input.slice(queryIndex + 1) : input;
    params = new URLSearchParams(queryString);
  } else {
    params = input;
  }

  const result: UtmParams = {};
  const source = cleanUtmValue(params.get('utm_source'));
  const medium = cleanUtmValue(params.get('utm_medium'));
  const campaign = cleanUtmValue(params.get('utm_campaign'));
  const content = cleanUtmValue(params.get('utm_content'));
  const term = cleanUtmValue(params.get('utm_term'));

  if (source) result.utmSource = source;
  if (medium) result.utmMedium = medium;
  if (campaign) result.utmCampaign = campaign;
  if (content) result.utmContent = content;
  if (term) result.utmTerm = term;

  return result;
}

/** Kiem tra co bat ky tham so UTM nao khong. */
export function hasUtmParams(utm: UtmParams): boolean {
  return Object.values(utm).some(
    (value) => typeof value === 'string' && value.length > 0,
  );
}
