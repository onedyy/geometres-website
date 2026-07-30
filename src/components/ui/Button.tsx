import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "text";
type Size = "md" | "sm";

type Common = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Trailing arrow glyph — off by default for text-only actions. */
  arrow?: boolean;
  className?: string;
};

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const Arrow = () => (
  <svg
    className={styles.arrow}
    viewBox="0 0 16 12"
    width="16"
    height="12"
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
);

export function Button(props: AsButton | AsLink) {
  const {
    variant = "primary",
    size = "md",
    arrow = variant !== "secondary",
    children,
    className,
    ...rest
  } = props as Common & Record<string, unknown>;

  const cls = [styles.base, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  );

  if (typeof rest.href === "string") {
    const anchor = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={cls} {...anchor}>
        {inner}
      </a>
    );
  }

  const button = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} type={button.type ?? "button"} {...button}>
      {inner}
    </button>
  );
}
