import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/account/register$",
        "/personality/test$",
        "/career/test$",
      ],
      disallow: [
        "/account/",
        "/dev/",
        "/payment/",
        "/personality/test",
        "/personality/result/",
        "/personality/report/",
        "/personality/preview/",
        "/career/test",
        "/career/result/",
        "/career/report/",
        "/kids/test",
        "/kids/result/",
        "/kids/report/",
        "/zodiac/test",
        "/zodiac/result/",
        "/zodiac/report/",
      ],
    },
    sitemap: "https://innergeo.app/sitemap.xml",
  };
}
