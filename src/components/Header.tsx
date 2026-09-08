import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import clsx from "clsx";
import Container from "./Container";

const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  // 초기 모드 상태를 LocalStorage에서 가져오기
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      // default: prefers-color-scheme
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // 페이지 로드 전 document에 dark 클래스 적용
  useLayoutEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  // 스크롤 이벤트
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastY && latest > 100) setHidden(true);
    else setHidden(false);
    setLastY(latest);
  });

  // 다크/라이트 모드 토글
  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", next ? "dark" : "light"); // ✅ LocalStorage 저장
      return next;
    });
  };

  return (
    <motion.header
      initial={false}
      animate={{
        y: hidden ? "-100%" : "0%",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className={clsx(
        "fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-border bg-surface/80 shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
      )}
    >
      <Container className="py-4 flex items-center justify-between">
        {/* 로고 — h1 은 Hero 의 이름 하나뿐이어야 하므로 여기서는 내렸다.
            클릭하면 최상단으로 간다. */}
        <a
          href="#hero"
          className="font-display text-xl font-semibold tracking-wide text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Jace <span className="text-accent">of </span>Spades
        </a>

        {/* 네비게이션 */}
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
          {["Hero", "About", "Cover", "History", "Skills", "Projects"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-muted hover:text-primary transition-colors duration-200 group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* 다크모드 토글 — div+onClick 이 아니라 role="switch" 버튼이어야
              키보드(Space/Enter)와 스크린리더에서 상태가 읽힌다. */}
          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="다크 모드"
            onClick={toggleDarkMode}
            className="ml-4 w-14 h-7 flex items-center rounded-full p-1 bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <span
              className={clsx(
                "w-5 h-5 rounded-full shadow-md bg-surface transition-transform duration-200 ease-out",
                isDark ? "translate-x-7" : "translate-x-0",
              )}
            />
          </button>
        </nav>
      </Container>
    </motion.header>
  );
};

export default Header;
