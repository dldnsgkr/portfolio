export type PopupType = "full" | "modal" | "confirm" | "bottomSheet";

export type PopupProps = {
  // 팝업 활성화 여부
  open: boolean;
  onClose: () => void;
  type?: PopupType;
  title?: string;
  children?: React.ReactNode;

  // confirm용
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;

  // 옵션
  closeOnBackdrop?: boolean;
};
