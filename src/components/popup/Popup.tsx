import type { PopupProps } from "@/types/popup.types";
import { createPortal } from "react-dom";
import {
  backdropVariants,
  getPopupContainerClass,
  getVariantsByType,
} from "./PopupUtils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import CustomButton from "../button/CustomButton";
import CloseIcon from "../icon/CloseIcon";

const Popup = ({
  open,
  onClose,
  type = "modal",
  title,
  children,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
  closeOnBackdrop = true,
}: PopupProps) => {
  const portalRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  /* ===========================
   * 1. 배경 스크롤 차단
   * =========================== */
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  /* ===============================
   * 2. Focus 완전 차단 + inert 처리
   * =============================== */
  useEffect(() => {
    if (!open || !portalRef.current) return;

    lastFocusedRef.current = document.activeElement as HTMLElement;

    const popupEl = portalRef.current;
    const bodyChildren = Array.from(document.body.children);

    bodyChildren.forEach((el) => {
      if (el !== popupEl) {
        el.setAttribute("inert", "");
      }
    });

    // popup 내부 첫 포커스
    const firstFocusable = popupEl.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    return () => {
      bodyChildren.forEach((el) => el.removeAttribute("inert"));
      lastFocusedRef.current?.focus();
    };
  }, [open]);

  /* ===========================
   * 3. ESC로 닫기
   * =========================== */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          ref={portalRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Content */}
          <motion.div
            className={getPopupContainerClass(type)}
            variants={getVariantsByType(type)}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
          >
            {title && (
              <div className="flex justify-between items-center w-full mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                {/* 팝업이 열리면 여기로 첫 포커스가 온다. 접근 가능한 이름이 없었고
                    브라우저 기본 파란 아웃라인이 그려졌다 — 둘 다 맞춘다. */}
                <CustomButton
                  onClick={onClose}
                  size="icon"
                  aria-label="닫기"
                  className="rounded-sm p-1 text-muted hover:text-primary"
                >
                  <CloseIcon />
                </CustomButton>
              </div>
            )}
            <div className="mb-6">{children}</div>

            {type === "confirm" && (
              <div className="flex justify-end gap-2">
                {/* bg-primary + text-white 는 다크에서 --text 가 near-white 라
                    흰 배경에 흰 글자가 된다. ProjectCard 와 같은 규칙으로 맞춘다. */}
                <button
                  onClick={onClose}
                  className="rounded-md border border-muted/40 px-4 py-2 text-primary transition-colors hover:bg-muted/10"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="rounded-md bg-accent px-4 py-2 text-background transition-opacity hover:opacity-90"
                >
                  {confirmText}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Popup;
