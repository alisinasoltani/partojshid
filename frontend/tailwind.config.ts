// tailwind.config.ts

import type { Config } from "tailwindcss"

const config = {
  // ... (darkMode, content, etc.)
  theme: {
    // ... (container, etc.)
    extend: {
      // ... (colors, etc.)
      
      // Make sure these keyframes are here
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      // Make sure these animations are here
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}', // <-- Is this present?
    './app/**/*.{ts,tsx}',       // <-- Is this present?
    './src/**/*.{ts,tsx}',     // <-- Is this present (if you use a /src dir)?
  ],
  
  // --- 🚨 THIS IS THE MOST IMPORTANT PART ---
  plugins: [require("tailwindcss-animate")],
  // --- 🚨 ---

} satisfies Config

export default config