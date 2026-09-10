import type { PopupType } from "@/types/popup.types";

import type { Variants } from "framer-motion";

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.95, y: -10 },
};

const fullVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const bottomSheetVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
  exit: { y: "100%" },
};

const confirmVariants = modalVariants;

// bg-white 하드코딩이 다크 모드에서 흰 패널 + near-white 글자(1.12:1)를 만들었다.
// Skills 아이콘을 누르면 열리는 팝업이 이 경로다. 팔레트 토큰으로 바꾼다.
const getPopupContainerClass = (type: PopupType) => {
  const base = "relative bg-surface text-primary";
  switch (type) {
    case "full":
      return `${base} h-full w-full overflow-y-auto`;
    case "bottomSheet":
      return `${base} w-full max-w-md rounded-t-2xl border border-border p-6`;
    default:
      return `${base} w-[90%] max-w-md rounded-2xl border border-border p-6 shadow-2xl`;
  }
};

const getVariantsByType = (type: PopupType): Variants => {
  switch (type) {
    case "full":
      return fullVariants;
    case "bottomSheet":
      return bottomSheetVariants;
    case "confirm":
      return confirmVariants;
    case "modal":
    default:
      return modalVariants;
  }
};

export {
  backdropVariants,
  modalVariants,
  fullVariants,
  bottomSheetVariants,
  confirmVariants,
  getPopupContainerClass,
  getVariantsByType,
};
