import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const baseUrl = "https://xn--2n1b19ndwjhoj6sb.com";

  const staticURLs = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      priority: "1.0",
    },
    {
      loc: `${baseUrl}/login`,
      lastmod: new Date().toISOString(),
      priority: "0.5",
    },
  ];

  const categoryURLs = [1, 2, 3, 4, 5, 6, 7, 8].map((categoryId) => ({
    loc: `${baseUrl}/category/${categoryId}`,
    lastmod: new Date().toISOString(),
    priority: 0.9,
  }));

  const { data: articles } = await supabase
    .from("articles")
    .select("id, created_at");

  const articleURLs = articles.map((article) => ({
    loc: `${baseUrl}/article/${article.id}`,
    lastmod: new Date(article.created_at).toISOString(),
    changefreq: "yearly",
    priority: "0.6",
  }));

  const urls = [...staticURLs, ...categoryURLs, ...articleURLs]
    .map((url) => {
      return `
     <url>
       <loc>${url.loc}</loc>
       <lastmod>${url.lastmod}</lastmod>
        ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
        <priority>${url.priority}</priority>
     </url>
   `;
    })
    .join("");

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
