import { redirect } from 'next/navigation';

/** `/admin` luon dua ve danh sach lead. */
export default function AdminIndexPage() {
  redirect('/admin/leads');
}
