import { useEffect, useState } from "react";

/**
 * 현재 다크 모드인지 돌려준다.
 *
 * 테마의 단일 진실은 documentElement 의 `dark` 클래스다 — index.html 의
 * 프리페인트 스크립트와 Header 의 토글이 둘 다 이 클래스를 쓴다.
 * Header 의 로컬 state 를 끌어올리는 대신 클래스를 관찰하면, 누가 바꾸든
 * (프리페인트든 토글이든 devtools 든) 같은 값을 본다.
 */
export function useIsDark() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));

    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
