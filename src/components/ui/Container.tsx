import type { ElementType, HTMLAttributes } from "react";
import styles from "./Container.module.css";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** `wide` uses the full 1560px shell, `narrow` keeps editorial measure. */
  width?: "wide" | "narrow";
};

export function Container({
  as: Tag = "div",
  width = "wide",
  className,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={[styles.container, styles[width], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
