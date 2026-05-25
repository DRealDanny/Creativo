import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  } as unknown as NonNullable<NextConfig["devIndicators"]>,
};

export default nextConfig;
