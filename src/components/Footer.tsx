import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { YouTubeIcon } from "@/components/ui/YouTubeIcon";
import { ContourField } from "@/components/graphics/ContourField";
import { navigation } from "@/data/navigation";
import { company, contact, geoReadout, links } from "@/data/company";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.terrain} aria-hidden="true">
        <ContourField lines={9} seed={57} amplitude={18} />
      </div>

      <Container className={styles.inner}>
        <div className={styles.brand}>
          <Wordmark size="lg" />
          <p className={`u-mono ${styles.legalName}`}>{company.legalName}</p>
          <p className={styles.positioning}>{company.positioning}</p>
          <p className={`u-mono ${styles.motto}`}>{company.tagline}</p>
        </div>

        <nav className={styles.nav} aria-label="Navigácia v pate stránky">
          <h2 className={`u-mono ${styles.colTitle}`}>Obsah</h2>
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={`u-mono ${styles.colTitle}`}>Kontakt</h2>
          <address className={styles.address}>
            <a
              href={links.map}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {contact.street}, {contact.postalCode} {contact.city}
            </a>
            <a href={links.mailto} className={styles.link}>
              {contact.email}
            </a>
            <span className={styles.hours}>
              {contact.hours.label} · {contact.hours.time}
            </span>
          </address>
        </div>

        <div className={styles.col}>
          <h2 className={`u-mono ${styles.colTitle}`}>Ukážky</h2>
          <ul>
            <li>
              <a
                href={contact.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.youtubeLink}
                aria-label={`YouTube ${contact.youtube.handle} (otvorí sa v novom okne)`}
              >
                <YouTubeIcon size={26} />
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className={styles.baseline}>
        <p className={`u-mono ${styles.copy}`}>
          © {year} {company.legalName}
        </p>
        <p className={`u-mono ${styles.coords}`}>
          <span className={styles.point} aria-hidden="true" />
          {geoReadout.lat} / {geoReadout.lng} · {geoReadout.label}
        </p>
        {/* Legal pages are not published yet — the slots are ready for them. */}
        <p className={`u-mono ${styles.legal}`}>
          Ochrana osobných údajov · Právne informácie
          <span className={styles.legalNote}>(pripravuje sa)</span>
        </p>
      </Container>
    </footer>
  );
}
