import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        qualities: [75, 90, 100],
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "lh3.googleusercontent.com" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "bi.ua" },
            { protocol: "https", hostname: "content.rozetka.com.ua" },
            { protocol: "https", hostname: "content1.rozetka.com.ua" },
            { protocol: "https", hostname: "s1.itc.ua" },
            { protocol: "https", hostname: "cdn.27.ua" },
            { protocol: "https", hostname: "u.makeup.com.ua" },
            { protocol: "https", hostname: "content.silpo.ua" },
        ],
    },
};

export default nextConfig;
