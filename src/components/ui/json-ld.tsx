interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Nhung JSON-LD vao trang.
 *
 * Du lieu duoc sinh tu content noi bo (khong phai input nguoi dung), va
 * `<` duoc escape de khong the dong the <script> som.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
