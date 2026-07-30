"use client";

import { useEffect, useRef } from "react";
import { navigation } from "@/data/navigation";
import { contact, geoReadout, links } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import styles from "./MobileNavigation.module.css";

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
  active: string;
};

export function MobileNavigation({
  open,
  onClose,
  active,
}: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useBodyScrollLock(open);

  /* Escape closes, Tab is trapped inside the panel while it is open. */
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="mobile-navigation"
      className={styles.root}
      data-open={open}
      aria-hidden={!open}
      // Keeps the closed panel out of the tab order in every browser.
      {...(open ? {} : { inert: "" as unknown as boolean })}
    >
      <div
        className={styles.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigácia"
      >
        <nav className={styles.nav}>
          <ul>
            {navigation.map((item, i) => (
              <li key={item.id} style={{ ["--i" as string]: i }}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  className={styles.link}
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={onClose}
                >
                  <span className={styles.index} aria-hidden="true">
                    {item.index}
                  </span>
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.rule} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.foot}>
          <Button href={links.mailtoConsultation} onClick={onClose}>
            Nezáväzná konzultácia
          </Button>
          <a className={styles.mail} href={links.mailto} onClick={onClose}>
            {contact.email}
          </a>
          <p className={`u-mono ${styles.coords}`}>
            {geoReadout.lat} &nbsp;/&nbsp; {geoReadout.lng}
          </p>
        </div>
      </div>
    </div>
  );
}
