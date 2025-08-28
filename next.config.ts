import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async redirects() {
  //   return [
  //     {
  //       source:
  //         "/((?!(?:api|_next|static)(?:/|$)|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|.*\\.(?:js|css|map|json|txt|xml|png|jpg|jpeg|gif|svg|ico|webp|avif|mp3|mp4|wasm|webmanifest|woff2|woff|ttf|eot)$).*)",
  //       // only apply when the request expects an HTML document
  //       has: [
  //         {
  //           type: "header",
  //           key: "accept",
  //           value: "text/html",
  //         },
  //       ],
  //       destination: "/en",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
