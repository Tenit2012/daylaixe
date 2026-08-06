import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Bien moi truong toi thieu de site config va auth khong throw khi chay test.
process.env.NEXT_PUBLIC_SITE_URL ??= 'http://localhost:3000';
process.env.AUTH_SECRET ??= 'test-secret-value-at-least-32-characters-long';
process.env.ADMIN_EMAIL ??= 'admin@example.com';
process.env.ADMIN_PASSWORD ??= 'test-password';

afterEach(() => {
  cleanup();
});
