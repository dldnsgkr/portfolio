import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import clsx from "clsx";

const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  // 초기 모드 상태를 LocalStorage에서 가져오기
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      console.log(saved);
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
        "fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-border dark:border-border-dark bg-surface/80 dark:bg-surface-dark/80 shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-colors duration-500 ease-in-out"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 로고 */}
        <h1 className="text-xl font-semibold tracking-wide text-primary dark:text-primary-dark font-serif transition-colors duration-500 ease-in-out">
          Jace{" "}
          <span className="text-accent dark:text-accent-dark transition-colors duration-500 ease-in-out">
            of{" "}
          </span>
          Spades
        </h1>

        {/* 네비게이션 */}
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
          {["Hero", "About", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-muted dark:text-muted-dark hover:text-primary hover:dark:text-primary-dark transition-colors duration-200 group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent dark:bg-accent-dark transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* 다크모드 토글 스위치 */}
          <div
            onClick={toggleDarkMode}
            className={clsx(
              "ml-4 w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 ease-in-out",
              isDark ? "bg-accent-dark" : "bg-accent"
            )}
          >
            {/* 내부 원 */}
            <div
              className={clsx(
                "w-5 h-5 rounded-full shadow-md bg-background dark:bg-surface transition-transform duration-500 ease-in-out transform",
                isDark ? "translate-x-7" : "translate-x-0"
              )}
            ></div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
