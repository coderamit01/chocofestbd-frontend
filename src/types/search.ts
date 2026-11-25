export type SearchResultKind = "Order" | "Product" | "Customer";

export type SearchResult = {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  href: string;
};
