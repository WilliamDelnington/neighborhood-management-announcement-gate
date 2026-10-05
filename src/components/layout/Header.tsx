import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { navLinks } from "@/constants/navLinks";
import { useEmergencyContacts } from "@/features/emergency/useEmergencyContacts";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import { telHref } from "@/utils/formatPhone";
import styles from "./Header.module.css";

function Seal({ ward }: { ward: string }) {
  const [first, ...rest] = ward.toUpperCase().split(/\s+/);
  return (
    <span className={styles.seal} aria-hidden="true">
      {first}
      {rest.length > 0 && (
        <>
          <br />
          {rest.join(" ")}
        </>
      )}
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { ward, city, logoUrl } = useSiteIdentity();
  const { contacts } = useEmergencyContacts();

  // Dong menu dien thoai moi khi dieu huong.
  useEffect(() => {
    setOpen(false);
  }, [location.key]);

  useEffect(() => {
    setLogoFailed(false);
  }, [logoUrl]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const showLogo = !!logoUrl && !logoFailed;

  return (
    <header className={styles.header}>
      <div className={styles.accentBar} />
      <div className={styles.brandBar}>
        <div className={cn("wrap", styles.brandRow)}>
          <Link to="/" className={styles.brand}>
            {showLogo ? (
              <img
                className={styles.logo}
                src={logoUrl}
                alt=""
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <Seal ward={ward} />
            )}
            <span className={styles.brandText}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowLong}>Ủy ban nhân dân</span>
                <span className={styles.eyebrowShort}>UBND</span>
              </span>
              <span className={styles.name}>{ward}</span>
              <span className={styles.sub}>Cổng thông tin điện tử · {city}</span>
            </span>
          </Link>

          <div className={styles.hotlines}>
            <span className={styles.hotlinesLabel}>Đường dây khẩn cấp:</span>
            {contacts.map(contact => (
              <a
                key={`${contact.label}-${contact.phone}`}
                className={styles.hotlineChip}
                href={telHref(contact.phone)}
              >
                {contact.phone} {contact.shortLabel}
              </a>
            ))}
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="dieu-huong-chinh"
            onClick={() => setOpen(prev => !prev)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        id="dieu-huong-chinh"
        aria-label="Điều hướng chính"
        className={cn(styles.nav, open && styles.open)}
      >
        <ul className={cn("wrap", styles.navList)}>
          {navLinks.map(link => (
            <li key={link.to}>
              {link.route ? (
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
                >
                  {link.label}
                </NavLink>
              ) : (
                <Link to={link.to} className={styles.navLink}>
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.navHotlines}>
          {contacts.map(contact => (
            <a
              key={`${contact.label}-${contact.phone}`}
              className={styles.navHotline}
              href={telHref(contact.phone)}
              aria-label={`Gọi ${contact.shortLabel}: ${contact.phone}`}
            >
              {contact.phone}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
