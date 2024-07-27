import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    testProxy: process.env.APP_ENV === "automated_tests",
  },
};

export default nextConfig;
