import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useModalDialog } from "@/lib/useModalDialog";

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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // body 스크롤 잠금 / Esc / 포커스 트랩 / 첫 포커스 / 트리거 복귀
  // — 모바일 네비 시트와 같은 훅을 쓴다.
  useModalDialog(open, onClose, panelRef);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-0 pc:p-6"
          // 트럼프 카드 뒷면의 다이아몬드 격자. 모달이 열릴 때 정체성이 한 번 더 나온다.
          // 45°/-45° 반복 그라데이션 두 겹이면 되므로 에셋도 모션도 필요 없다.
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(198,166,100,0.055) 0 1px, transparent 1px 15px),
              repeating-linear-gradient(-45deg, rgba(198,166,100,0.055) 0 1px, transparent 1px 15px)
            `,
          }}
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
            // 여기에 duration 을 명시하면 App 의 MotionConfig 기본값을 덮어써서
            // reduced-motion 에서도 opacity 가 계속 전환된다. 직접 가드한다.
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22 }}
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
