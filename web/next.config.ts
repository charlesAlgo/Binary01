import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent DNS prefetch leaking request origins
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Force HTTPS for 2 years + preload list eligibility
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Control referrer info sent to external sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down unused browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // CSP — scoped to known origins
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts + Framer Motion require unsafe-inline; unsafe-eval for tsparticles
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cal.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.resend.com https://api.groq.com https://cal.com https://*.cal.com",
      "frame-src https://cal.com https://app.cal.com https://*.cal.com https://*.streamlit.app",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
