"use client";

import { useCallback, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileNavigation } from "@/components/MobileNavigation";
import { navigation, sectionIds } from "@/data/navigation";
import { links } from "@/data/company";
import { useScrolled } from "@/hooks/useScrolled";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "./Header.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(24);
  const active = useScrollSpy(sectionIds, 140);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={styles.header}
        data-scrolled={scrolled ? "true" : "false"}
      >
        <Container className={styles.bar}>
          <a
            href="#uvod"
            className={styles.brand}
            aria-label="GEOMETRES — na začiatok stránky"
          >
            <Wordmark />
          </a>

          <nav className={styles.nav} aria-label="Hlavná navigácia">
            <ul className={styles.navList}>
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={styles.navLink}
                    aria-current={active === item.id ? "true" : undefined}
                  >
                    <span className={styles.navIndex} aria-hidden="true">
                      {item.index}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a className={styles.cta} href={links.mailtoConsultation}>
              <span>Nezáväzná konzultácia</span>
              <svg
                viewBox="0 0 16 12"
                width="14"
                height="11"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M0 6h13.2M9.4 1.6 14 6l-4.6 4.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                />
              </svg>
            </a>

            <button
              type="button"
              className={styles.burger}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="u-visually-hidden">
                {menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
              </span>
              <span className={styles.burgerLines} data-open={menuOpen}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </Container>
        <span className={styles.rule} aria-hidden="true" />
      </header>

      <MobileNavigation open={menuOpen} onClose={closeMenu} active={active} />
    </>
  );
}
