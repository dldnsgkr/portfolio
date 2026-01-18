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

const getPopupContainerClass = (type: PopupType) => {
  switch (type) {
    case "full":
      return "relative w-full h-full bg-white overflow-y-auto";
    case "bottomSheet":
      return "relative w-full max-w-md bg-white rounded-t-2xl p-6";
    default:
      return "relative w-[90%] max-w-md bg-white rounded-2xl p-6";
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
