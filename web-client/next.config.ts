import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// module.exports = {
//     async rewrites() {
//         return [
//             {
//                 source: '/api/:path*',
//                 destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`
//             }
//         ]
//     }
// }