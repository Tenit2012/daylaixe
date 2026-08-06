import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

/**
 * Kiem tra trang thai dang nhap.
 * Chi tra ve du lieu toi thieu - khong tra ve token, khong tra ve role
 * chi tiet cho nguoi chua dang nhap.
 */
export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: { name: session.name, email: session.email, role: session.role },
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  );
}
