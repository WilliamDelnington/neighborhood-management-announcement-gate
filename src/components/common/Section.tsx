import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import styles from "./Section.module.css";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
};

export function Section({ id, children, className, labelledBy }: SectionProps) {
  return (
    <section id={id} className={cn("wrap", styles.section, className)} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
