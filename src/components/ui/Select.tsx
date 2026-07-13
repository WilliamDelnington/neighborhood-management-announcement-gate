import type { SelectHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import styles from "./FormField.module.css";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
};

export function Select({ label, error, id, className, options, ...props }: SelectProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select id={id} className={cn(styles.control, className)} {...props}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
