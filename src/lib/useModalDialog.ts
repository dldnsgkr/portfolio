import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * 모달성 오버레이(프로젝트 모달, 모바일 네비 시트)가 공유하는 동작.
 * ProjectModal 에 인라인으로 있던 것을 꺼내 두 곳에서 같이 쓴다.
 *
 * - body 스크롤 잠금 (닫을 때 원래 값으로 복원)
 * - Esc 로 닫기
 * - 포커스 트랩: Tab / Shift+Tab 이 패널 밖으로 나가지 않게 순환
 * - 열릴 때 첫 포커스 가능한 요소로 이동 (없으면 패널 자체)
 * - 닫힐 때 열기 직전에 포커스를 갖고 있던 요소로 복귀
 */
export function useModalDialog(
  open: boolean,
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    const trigger = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () => {
      const panel = panelRef.current;
      if (!panel) return [] as HTMLElement[];
      return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        // 숨겨진 요소는 제외
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
    };

    const raf = requestAnimationFrame(() => {
      const [first] = focusables();
      (first ?? panelRef.current)?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const list = focusables();
      if (list.length === 0) {
        e.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = originalOverflow;
      trigger?.focus?.();
    };
  }, [open, onClose, panelRef]);
}
