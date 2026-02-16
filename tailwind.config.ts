import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // Scans your app folder
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scans components if moved outside
    "./src/**/*.{js,ts,jsx,tsx,mdx}",        // Backup for src folder
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;