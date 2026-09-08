import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import Container from "./Container";
import { useModalDialog } from "@/lib/useModalDialog";
import { useScrollSpy } from "@/lib/useScrollSpy";

// Hero 항목은 뺐다 — 최상단으로 가는 길은 로고 클릭이 맡는다.
const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "cover", label: "Cover" },
  { id: "history", label: "History" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

const ThemeSwitch = ({
  isDark,
  onToggle,
  className,
}: {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}) => (
  // div+onClick 이 아니라 role="switch" 버튼이어야 키보드(Space/Enter)와
  // 스크린리더에서 상태가 읽힌다.
  <button
    type="button"
    role="switch"
    aria-checked={isDark}
    aria-label="다크 모드"
    onClick={onToggle}
    className={clsx(
      "flex h-7 w-14 shrink-0 items-center rounded-full bg-accent p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
      className,
    )}
  >
    <span
      className={clsx(
        "h-5 w-5 rounded-full bg-surface shadow-md transition-transform duration-200 ease-out",
        isDark ? "translate-x-7" : "translate-x-0",
      )}
    />
  </button>
);

const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // hero 를 관찰 대상에만 넣는다(네비 항목은 아니다). 스파이는 섹션 사이 빈 구간에서
  // 마지막 값을 유지하므로, hero 가 없으면 최상단에서도 About 이 활성으로 남는다.
  const activeId = useScrollSpy(["hero", ...NAV_ITEMS.map((item) => item.id)]);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useLayoutEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // 최상단에서는 헤더 배경을 투명하게 둔다. 배경을 깔면 Hero 와의 경계에
    // 색 띠가 생긴다(헤더 surface / Hero bg).
    setScrolled(latest > 8);
    if (menuOpen) return;
    setHidden(latest > lastY.current && latest > 100);
    lastY.current = latest;
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useModalDialog(menuOpen, closeMenu, sheetRef);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: hidden ? "-100%" : "0%",
          // 명시적 duration 은 MotionConfig 기본값을 덮으므로 직접 가드한다
          transition: reduceMotion
            ? { duration: 0 }
            : { duration: 0.3, ease: "easeInOut" },
        }}
        className={clsx(
          "fixed left-0 top-0 z-50 w-full",
          scrolled
            ? "border-b border-border bg-surface/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex items-center justify-between py-4">
          <a
            href="#hero"
            className="font-display text-xl font-semibold tracking-wide text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Jace <span className="text-accent">of </span>Spades
          </a>

          <nav className="hidden items-center gap-8 text-small font-medium md:flex">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={clsx(
                    "group relative transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted hover:text-primary",
                  )}
                >
                  {label}
                  {/* 현재 섹션이면 밑줄을 유지, 아니면 hover 에서만 펼친다 */}
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              );
            })}
            <ThemeSwitch
              isDark={isDark}
              onToggle={toggleDarkMode}
              className="ml-4"
            />
          </nav>

          {/* 모바일: 기존에는 nav 전체가 hidden md:flex 라 다크 토글조차 없었다 */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="메뉴 열기"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:hidden"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span className="absolute left-0 top-0 h-[1.5px] w-6 bg-current" />
              <span className="absolute left-0 top-[7px] h-[1.5px] w-6 bg-current" />
              <span className="absolute bottom-0 left-0 h-[1.5px] w-6 bg-current" />
            </span>
          </button>
        </Container>
      </motion.header>

      {/* 전체화면 시트. 시트 자체가 화면을 덮으므로 별도 백드롭이 없어
          "빈 영역 클릭 = 닫기" 로 백드롭 클릭을 대신한다. */}
      {menuOpen && (
        <div
          ref={sheetRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="사이트 메뉴"
          tabIndex={-1}
          onClick={closeMenu}
          className="fixed inset-0 z-[60] flex flex-col bg-background outline-none md:hidden"
        >
          <Container className="flex shrink-0 items-center justify-between py-4">
            <span className="font-display text-xl font-semibold tracking-wide text-primary">
              Jace <span className="text-accent">of </span>Spades
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="메뉴 닫기"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden="true" className="relative block h-6 w-6">
                <span className="absolute left-0 top-1/2 h-[1.5px] w-6 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-6 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </Container>

          <Container className="flex flex-1 flex-col justify-center">
            <nav
              onClick={(e) => e.stopPropagation()}
              className="flex w-fit flex-col gap-1"
            >
              {NAV_ITEMS.map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={closeMenu}
                    aria-current={isActive ? "true" : undefined}
                    className={clsx(
                      "rounded-md py-2 font-display text-[2rem] leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive ? "text-primary" : "text-muted",
                    )}
                  >
                    {label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="ml-3 inline-block h-[6px] w-[6px] align-middle rounded-full bg-accent"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-10 flex w-fit items-center gap-3"
            >
              <span className="text-small text-muted">다크 모드</span>
              <ThemeSwitch isDark={isDark} onToggle={toggleDarkMode} />
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Header;
