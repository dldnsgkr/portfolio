/** @type {import('tailwindcss').Config} */

// 색은 CSS 변수(src/assets/css/index.css)를 참조한다.
// 채널값을 받아 rgb(... / <alpha-value>) 로 감싸야 bg-surface/80 같은 alpha 수식이 동작한다.
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "1023px" },
        pc: "1024px",
      },
      colors: {
        background: withAlpha("--bg"),
        surface: withAlpha("--surface"),
        border: withAlpha("--line"),
        primary: withAlpha("--text"),
        muted: withAlpha("--muted"),
        accent: withAlpha("--accent"),
      },
      fontFamily: {
        // 본문·UI — 한글이 대부분이라 Pretendard 가 기준
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "system-ui",
          "-apple-system",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "sans-serif",
        ],
        // 디스플레이 — 라틴 헤드라인 전용. font-serif 도 같은 곳을 보게 해 기존 사용처를 흡수한다.
        display: ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
        serif: ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
      },
      fontSize: {
        display: [
          "clamp(2.75rem, 8vw, 5.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
        h2: [
          "clamp(1.75rem, 4vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        h3: ["1.375rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        body: ["1rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
      },
      maxWidth: {
        content: "1120px", // 섹션 공통 콘텐츠 폭
        prose: "68ch", // 본문 줄 길이 상한
      },
      spacing: {
        "section-mobile": "72px",
        "section-pc": "140px",
      },
      transitionDuration: {
        theme: "180ms",
      },
    },
  },
  plugins: [],
};
