import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function ProjectModal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  // aria-labelledby 로 연결할 제목 요소의 id
  labelledBy: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  // 열기 직전 포커스를 갖고 있던 요소 — 닫을 때 여기로 되돌린다
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    triggerRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () => {
      const panel = panelRef.current;
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
        // 숨겨진 요소는 제외
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    };

    // 열릴 때 첫 포커스 가능한 요소로. 없으면 패널 자체로.
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

      // 포커스 트랩 — Tab 이 패널 밖으로 나가지 않게 순환시킨다
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
      // 닫힐 때 트리거로 복귀
      triggerRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-0 pc:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className="flex h-full w-full flex-col bg-surface p-5 text-primary shadow-2xl outline-none pc:max-h-[80vh] pc:max-w-2xl pc:rounded-2xl pc:p-8"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
