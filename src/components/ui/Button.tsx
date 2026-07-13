import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import styles from "./Button.module.css";

type Variant = "primary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={cn(styles.button, styles[variant], className)} {...props} />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

export function LinkButton({
  variant = "outline",
  className,
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(styles.button, styles[variant], className)} {...props} />
  );
}
