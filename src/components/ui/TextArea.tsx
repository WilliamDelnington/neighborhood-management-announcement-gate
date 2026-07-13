import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import styles from "./FormField.module.css";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextArea({ label, error, id, className, ...props }: TextAreaProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={cn(styles.control, styles.textarea, className)}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
