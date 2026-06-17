// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "images.unsplash.com" },
//       { protocol: "https", hostname: "lh3.googleusercontent.com" },
//       { protocol: "https", hostname: "i.ibb.co" },
//       { protocol: "https", hostname: "res.cloudinary.com" },
//       { protocol: "https", hostname: "**.googleusercontent.com" },
//     ],
//   },
// };

// export default nextConfig;





/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any secure website image URL
      },
      {
        protocol: "http",
        hostname: "**", // Allows any standard HTTP website image URL
      },
    ],
  },
};

export default nextConfig;