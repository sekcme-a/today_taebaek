import { NextResponse } from "next/server";

export function GET() {
  const content = `
User-agent: *
Disallow: /admin
Disallow: /admin/
Disallow: /admin-login
Disallow: /admin-login/

User-agent: GPTBot
Disallow: /

User-agent: DeepSeekBot
Disallow: /

Allow: /

Sitemap: https://xn--2n1b19ndwjhoj6sb.com/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
