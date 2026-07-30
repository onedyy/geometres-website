import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { YouTubeIcon } from "@/components/ui/YouTubeIcon";
import { MapPanel } from "@/components/MapPanel";
import { contact, geoReadout, links } from "@/data/company";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className={styles.section}
      aria-labelledby="kontakt-title"
    >
      <Container>
        <SectionHeading
          id="kontakt-title"
          eyebrow="06 / Kontakt"
          layout="split"
          title={
            <>
              Povedzte nám, čo{" "}
              <br className="u-br" />
              treba <em>zamerať</em>.
            </>
          }
          lead={
            <p>
              Napíšte nám predmet zamerania, lokalitu alebo katastrálne územie a
              stručný popis požiadavky. Ozveme sa s návrhom postupu.
            </p>
          }
        />

        <div className={styles.layout}>
          {/* ---------------- primary action ---------------- */}
          <div className={styles.action} data-reveal>
            <p className={`u-mono ${styles.actionLabel}`}>Nezáväzná konzultácia</p>
            <a className={styles.emailLink} href={links.mailto}>
              {contact.email}
            </a>
            <p className={styles.actionNote}>
              Odkaz nižšie otvorí váš e-mailový program s pripravenou
              štruktúrou správy, aby sme mali všetko potrebné hneď na začiatku.
            </p>
            <div className={styles.actionButtons}>
              <Button href={links.mailtoConsultation}>Napísať e-mail</Button>
              <Button
                href={links.map}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Otvoriť v mapách
              </Button>
            </div>
          </div>

          {/* ---------------- details ---------------- */}
          <ul className={styles.details} data-reveal>
            <li className={styles.detail}>
              <span className={`u-mono ${styles.detailLabel}`}>Adresa</span>
              <address className={styles.detailValue}>
                <a
                  href={links.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailAction}
                >
                  {contact.street}
                  <br />
                  {contact.postalCode} {contact.city}
                  <span className={styles.external} aria-hidden="true">
                    ↗
                  </span>
                  <span className="u-visually-hidden">
                    (otvorí sa v novom okne)
                  </span>
                </a>
              </address>
            </li>

            <li className={styles.detail}>
              <span className={`u-mono ${styles.detailLabel}`}>E-mail</span>
              <p className={styles.detailValue}>
                <a href={links.mailto} className={styles.detailAction}>
                  {contact.email}
                </a>
              </p>
            </li>

            <li className={styles.detail}>
              <span className={`u-mono ${styles.detailLabel}`}>
                Pracovná doba
              </span>
              <p className={styles.detailValue}>
                {contact.hours.label}
                <br />
                <span className={styles.detailMono}>{contact.hours.time}</span>
              </p>
            </li>

            <li className={styles.detail}>
              <span className={`u-mono ${styles.detailLabel}`}>
                Ukážky prác
              </span>
              <p className={styles.detailValue}>
                <a
                  href={contact.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.youtubeLink}
                  aria-label={`YouTube ${contact.youtube.handle} (otvorí sa v novom okne)`}
                >
                  <YouTubeIcon size={30} />
                </a>
              </p>
            </li>

            <li className={styles.detail}>
              <span className={`u-mono ${styles.detailLabel}`}>Poloha</span>
              <p className={`u-mono ${styles.detailCoords}`}>
                {geoReadout.lat}
                <br />
                {geoReadout.lng}
              </p>
            </li>
          </ul>

          {/* ---------------- map ---------------- */}
          <div className={styles.map} data-reveal>
            <MapPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
