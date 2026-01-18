import { btnSize } from "@/data/sizeSetup";
import type { ButtonHTMLAttributes } from "react";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "none";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "icon";
};

const CustomButton = ({
  variant = "none",
  size = "full",
  ...props
}: CustomButtonProps) => {
  const btnVariant = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    tertiary: "bg-tertiary text-white hover:bg-tertiary-dark",
    none: "bg-transparent text-inherit hover:opacity-80",
  };

  return (
    <button
      className={`${btnVariant[variant]} ${btnSize[size]}`}
      {...props}
    ></button>
  );
};

export default CustomButton;
