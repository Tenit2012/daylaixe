import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Gop class Tailwind, class sau ghi de class truoc khi trung nhom. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
