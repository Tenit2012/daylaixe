'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Search, X } from 'lucide-react';
import { courseOptions } from '@/content/courses';
import { leadStatusOptions } from '@/features/leads/domain/lead-status';
import { Button } from '@/components/ui/button';
import { inputClasses } from '@/components/forms/form-field';
import { cn } from '@/lib/utils/cn';

/**
 * Bo loc danh sach lead. Trang thai loc duoc luu tren URL de co the
 * chia se, bookmark va giu nguyen khi tai lai trang.
 */
export function LeadFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [status, setStatus] = useState(searchParams.get('status') ?? 'all');
  const [course, setCourse] = useState(searchParams.get('course') ?? 'all');
  const [dateFrom, setDateFrom] = useState(searchParams.get('from') ?? '');
  const [dateTo, setDateTo] = useState(searchParams.get('to') ?? '');
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'newest');

  const hasFilters =
    search !== '' ||
    status !== 'all' ||
    course !== 'all' ||
    dateFrom !== '' ||
    dateTo !== '' ||
    sort !== 'newest';

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set('q', search.trim());
    if (status !== 'all') params.set('status', status);
    if (course !== 'all') params.set('course', course);
    if (dateFrom) params.set('from', dateFrom);
    if (dateTo) params.set('to', dateTo);
    if (sort !== 'newest') params.set('sort', sort);

    const query = params.toString();
    router.push(query ? `/admin/leads?${query}` : '/admin/leads');
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setCourse('all');
    setDateFrom('');
    setDateTo('');
    setSort('newest');
    router.push('/admin/leads');
  };

  return (
    <form
      onSubmit={applyFilters}
      className="rounded-card border border-line bg-surface p-4 sm:p-5"
      aria-label="Bộ lọc danh sách học viên tiềm năng"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="flex flex-col gap-1.5 sm:col-span-2 xl:col-span-2">
          <label htmlFor="filter-search" className="text-xs font-semibold text-brand-900">
            Tìm theo tên hoặc số điện thoại
          </label>
          <input
            id="filter-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ví dụ: Nguyễn Văn An hoặc 0912"
            className={cn(inputClasses, 'py-2 text-sm')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-status" className="text-xs font-semibold text-brand-900">
            Trạng thái
          </label>
          <select
            id="filter-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={cn(inputClasses, 'py-2 text-sm')}
          >
            <option value="all">Tất cả</option>
            {leadStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-course" className="text-xs font-semibold text-brand-900">
            Khóa học
          </label>
          <select
            id="filter-course"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            className={cn(inputClasses, 'py-2 text-sm')}
          >
            <option value="all">Tất cả</option>
            {courseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-from" className="text-xs font-semibold text-brand-900">
            Từ ngày
          </label>
          <input
            id="filter-from"
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className={cn(inputClasses, 'py-2 text-sm')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-to" className="text-xs font-semibold text-brand-900">
            Đến ngày
          </label>
          <input
            id="filter-to"
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className={cn(inputClasses, 'py-2 text-sm')}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-sort" className="text-xs font-semibold text-brand-900">
            Sắp xếp
          </label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className={cn(inputClasses, 'py-2 text-sm')}
          >
            <option value="newest">Mới nhất trước</option>
            <option value="oldest">Cũ nhất trước</option>
          </select>
        </div>

        <Button type="submit" size="sm" variant="secondary">
          <Search aria-hidden="true" className="h-4 w-4" />
          Áp dụng bộ lọc
        </Button>

        {hasFilters ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={clearFilters}
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Xóa bộ lọc
          </Button>
        ) : null}
      </div>
    </form>
  );
}
