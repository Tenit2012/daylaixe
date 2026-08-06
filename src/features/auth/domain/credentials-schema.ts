import { z } from 'zod';

/** Schema form dang nhap trang quan tri. */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Vui lòng nhập email' })
    .trim()
    .min(1, 'Vui lòng nhập email')
    .max(160, 'Email quá dài')
    .email('Email không hợp lệ')
    .transform((value) => value.toLowerCase()),
  password: z
    .string({ required_error: 'Vui lòng nhập mật khẩu' })
    .min(1, 'Vui lòng nhập mật khẩu')
    .max(200, 'Mật khẩu quá dài'),
});

export type LoginInput = z.input<typeof loginSchema>;
export type LoginValues = z.output<typeof loginSchema>;
