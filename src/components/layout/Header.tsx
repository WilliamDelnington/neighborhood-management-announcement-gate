import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { authorizedLoginHref, residentAppHref } from "@/constants/env";
import { navLinks } from "@/constants/navLinks";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
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
  const [authOpen, setAuthOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const authMenuRef = useRef<HTMLDivElement>(null);
  const authToggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { ward, city, logoUrl } = useSiteIdentity();

  // Dong menu dien thoai va menu dang nhap moi khi dieu huong.
  useEffect(() => {
    setOpen(false);
    setAuthOpen(false);
  }, [location.key]);

  // Menu dang nhap (man hinh hep): dong khi bam ra ngoai hoac nhan Escape.
  useEffect(() => {
    if (!authOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!authMenuRef.current?.contains(event.target as Node)) setAuthOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAuthOpen(false);
        authToggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [authOpen]);

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
  // Dang nhap cu dan = mo trang dang nhap cua ung dung cu dan (cung tab).
  const signInOptions = [
    { label: "Đăng nhập cư dân", icon: "user" as const, href: residentAppHref("/login") },
    { label: "Đăng nhập ủy quyền", icon: "shield" as const, href: authorizedLoginHref() },
  ];

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

          <div className={styles.authActions} role="group" aria-label="Đăng nhập tài khoản">
            {signInOptions.map(option => option.href ? (
              <a key={option.label} className={styles.loginButton} href={option.href}>
                <Icon name={option.icon} size={18} />
                {option.label}
              </a>
            ) : (
              <button key={option.label} type="button" className={styles.loginButton} disabled title="Đăng nhập hiện chưa khả dụng">
                <Icon name={option.icon} size={18} />
                {option.label}
              </button>
            ))}
          </div>

          {/* Man hinh hep: gop hai nut dang nhap vao mot menu tha xuong. */}
          <div ref={authMenuRef} className={styles.authMenu}>
            <button
              ref={authToggleRef}
              type="button"
              className={styles.loginButton}
              aria-expanded={authOpen}
              aria-controls="menu-dang-nhap"
              onClick={() => setAuthOpen(prev => !prev)}
            >
              <Icon name="user" size={18} />
              Đăng nhập
              <Icon name="chevron" size={14} className={cn(styles.authChevron, authOpen && styles.authChevronOpen)} />
            </button>
            {authOpen && (
              <ul id="menu-dang-nhap" className={styles.authDropdown} aria-label="Đăng nhập tài khoản">
                {signInOptions.map(option => (
                  <li key={option.label}>
                    {option.href ? (
                      <a className={styles.authItem} href={option.href}>
                        <Icon name={option.icon} size={18} />
                        {option.label}
                      </a>
                    ) : (
                      <span className={cn(styles.authItem, styles.authItemDisabled)} title="Đăng nhập hiện chưa khả dụng">
                        <Icon name={option.icon} size={18} />
                        {option.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
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
      </nav>
    </header>
  );
}
