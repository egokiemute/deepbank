import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000E5",
        secondary: "#316879",
        blue: {
          50: "#e7e9ff",
          100: "#b3bcff",
          200: "#8e9bff",
          300: "#5b6eff",
          400: "#3b51ff",
          500: "#0a26ff",
          600: "#0923e8",
          700: "#071bb5",
          800: "#06158c",
          900: "#04106b",
        },
        text: {
          accent: "#E0752D",
          weak: "#000000A3",
          strong: "#000000E5",
          weakInverse: "#FFFFFFCC",
          strongInverse: "#FFFFFFF5",
          error: "#CC3B31",
          warning: "#A3761A",
          success: "#027A48",
          blue: "#0A26FF",
          negative: "#CC1818",
          positive: "#008F00",
        },
        fill: {
          weakAccent: "#E0752D0A",
          weak: "#0000000D",
          weaker: "#00000005",
          weakInverse: "#FFFFFF0F",
          weakerInverse: "#FFFFFF05",
          weakError: "#CC3B310A",
          weakWarning: "#A3761A0A",
          weakSuccess: "#027A480D",
          purpleStrong:"#9327DB3D",
          blueWeak: "#0A26FF0F",
          blueStrong: "#0A26FF",
          strong: "#000000E5",
        },
        background: {
          base: "#FFFFFF",
          sunken: "#FAFAFA",
          inverseOverlay: "#3D3D3D",
          inverseRaise: "#292929",
          inverse: "#000000",
        },
        stroke: {
          accent: "#E0752DB8",
          weakAccent: "#E0752D33",
          weak: "#0000001A",
          strong: "#00000066",
          weakInverse: "#FFFFFF1F",
          strongInverse: "#FFFFFF8F",
          weakError: "#CC3B3129",
          strongError: "#CC3B31B8",
          weakWarning: "#A3761A33",
          strongWarning: "#A3761AB8",
          weakSuccess: "#027A4833",
          strongSuccess: "#027A48B8",
          selected: "#000",
          blueWeak: "#0A26FF3D",
        },
        icon: {
          neutral: "#00000066",
          "strong-inverse": "#FFFFFFFA",
        },
      },
      backgroundImage: {
        "gradient-gray-90": "linear-gradient(90deg, #000000 0%, #666666 100%)",
        "gradient-gray-45": "linear-gradient(45deg, #000000 0%, #666666 100%)",
        "gradient-accent-90":
          "linear-gradient(90deg, #E0752D 0%, #E89A65 100%)",
        "gradient-accent-45":
          "linear-gradient(45deg, #E0752D 0%, #E89A65 100%)",
      },
    },
    fontFamily: {
      aeonik: ["var(--font-aeonik)", "sans-serif"],
    },
    fontSize: {
      "paragraph-sm": "12px",
      "paragraph-md": "14px",
      "paragraph-lg": "16px",
      "title-xs": "12px",
      "title-sm": "14px",
      "title-md": "16px",
      "title-lg": "20px",
      "heading-sm": "24px",
      "heading-lg": "32px",
      "display-sm": "40px",
      "display-lg": "56px",
    },
    boxShadow: {
      sunken: "0 1px 4px 0 #00000014 inset",
      raised: "0 2px 4px -2px #00000014, 0 4px 8px -2px #0000000A",
      overlay: "0 20px 24px -4px #00000014, 0px 8px 8px -4px #0000000A",
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1536px",
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;


