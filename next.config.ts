import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        qualities: [75, 90, 100],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            }
        ],
    },
};

export default nextConfig;
