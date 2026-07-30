export type NavItem = {
  label: string;
  id: string;
  /** Two-digit index rendered as a technical marker in the menus. */
  index: string;
};

export const navigation: NavItem[] = [
  { label: "Úvod", id: "uvod", index: "01" },
  { label: "Služby", id: "sluzby", index: "02" },
  { label: "Ako pracujeme", id: "proces", index: "03" },
  { label: "Technika", id: "technika", index: "04" },
  { label: "Výstupy", id: "vystupy", index: "05" },
  { label: "Kontakt", id: "kontakt", index: "06" },
];

export const sectionIds = navigation.map((item) => item.id);
