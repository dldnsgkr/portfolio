import { btnSize } from "@/data/sizeSetup";
import type { ButtonHTMLAttributes } from "react";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "none";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "icon";
};

const CustomButton = ({
  variant = "none",
  size = "full",
  className,
  ...props
}: CustomButtonProps) => {
  const btnVariant = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    tertiary: "bg-tertiary text-white hover:bg-tertiary-dark",
    none: "bg-transparent text-inherit hover:opacity-80",
  };

  // 포커스 링은 사이트 전체 규칙(accent 2px)을 따른다 — 없으면 브라우저 기본 파란 링이 뜬다
  const focus =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  return (
    <button
      className={`${btnVariant[variant]} ${btnSize[size]} ${focus} ${className ?? ""}`}
      {...props}
    ></button>
  );
};

export default CustomButton;
