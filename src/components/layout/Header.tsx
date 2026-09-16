import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "@/constants/navLinks";
import { cn } from "@/utils/cn";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.facade}>
      <div className="wrap">
        <nav className={styles.topnav}>
          <Link to="/" className={styles.brandMark} onClick={() => setOpen(false)}>
            <div className={styles.seal}>
              PHƯỜNG
              <br />
              DƯƠNG NỘI
            </div>
            <div className={styles.brandText}>
              <div className={styles.eyebrow}>Thành phố Hà Nội</div>
              <h1>Phường Dương Nội</h1>
            </div>
          </Link>
          <ul className={cn(styles.navlinks, open && styles.open)}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.navtoggle}
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen(prev => !prev)}
          >
            ☰
          </button>
        </nav>
      </div>
      <div className={styles.molding} />
    </header>
  );
}
