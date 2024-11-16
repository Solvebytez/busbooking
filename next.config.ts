import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',       
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',       
      },
      {
        protocol: 'https',
        hostname: 'dq1niho2427i9.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'busbooking.one67.in',
      },
      {
        protocol: 'https',
        hostname: 'crs-cargo-proof.s3-ap-southeast-1.amazonaws.com',
      },
    ]
  }
};

export default nextConfig;
