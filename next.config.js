/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // rejectUnauthorized: false,
  images: {
    domains: ["links.papareact.com"],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoiZG9jb3NpbyIsImEiOiJjbDRsaGx1bDAwd3dhM2txZmIybThnemp0In0.64O-Tw2igIN_76gGTnNrOg",
  },
};

module.exports = nextConfig;
