/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 혹은 'media'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 라이트 모드 기본 색상
        background: "#f9f9f9", // off-white
        surface: "#ffffff", // 카드/섹션 배경
        primary: "#1e293b", // 진한 네이비 (텍스트)
        accent: "#3b82f6", // 포인트 블루
        muted: "#64748b", // 서브 텍스트
        border: "#e2e8f0", // 경계선

        // 다크 모드 색상
        "background-dark": "#121212",
        "surface-dark": "#1e1e1e",
        "primary-dark": "#f8f8f8",
        "accent-dark": "#c6a664",
        "muted-dark": "#9ca3af",
        "border-dark": "#2f2f2f",
      },
    },
  },
  plugins: [],
};
