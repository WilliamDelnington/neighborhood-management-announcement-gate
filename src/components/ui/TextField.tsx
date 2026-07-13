import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import styles from "./FormField.module.css";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, id, className, ...props }: TextFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input id={id} className={cn(styles.control, className)} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
