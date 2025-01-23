/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'cdn.dribbble.com', 
      'pngimg.com',       
      'vecteezy.com',     
      'icon-icons.com',   
      'static.vecteezy.com', // Added static.vecteezy.com
      'logolook.net',      // Added logolook.net to fix the error
    ],
  },
};

export default nextConfig;
