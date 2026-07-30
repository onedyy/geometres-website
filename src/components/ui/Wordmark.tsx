import { company } from "@/data/company";
import styles from "./Wordmark.module.css";

type WordmarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Typographic wordmark with an integrated survey marker.
 * Replace `SurveyMarker` with the official logo asset if one is supplied.
 */
export function SurveyMarker({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="10"
        cy="10"
        r="6.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.55"
      />
      <path
        d="M10 0v4.2M10 15.8V20M0 10h4.2M15.8 10H20"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.8"
      />
      <circle cx="10" cy="10" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ size = "md", className }: WordmarkProps) {
  return (
    <span
      className={[styles.mark, styles[size], className].filter(Boolean).join(" ")}
    >
      <SurveyMarker className={styles.glyph} />
      <span className={styles.name}>{company.name}</span>
    </span>
  );
}
