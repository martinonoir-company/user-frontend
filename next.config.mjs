/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // AWS S3 virtual-hosted style (bucket.s3.region.amazonaws.com)
      { protocol: "https", hostname: "*.s3.*.amazonaws.com" },
      // AWS S3 path-style / legacy
      { protocol: "https", hostname: "s3.*.amazonaws.com" },
      // CloudFront distributions sitting in front of the bucket
      { protocol: "https", hostname: "*.cloudfront.net" },
    ],
  },
};

export default nextConfig;
