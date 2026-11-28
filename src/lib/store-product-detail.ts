import {
  BRAND_COMPANIES,
  GALLERY_EXTRA_IMAGES,
  GALLERY_LABELS,
  PRODUCT_COPY,
  PRODUCT_RAIL_SIZE,
  PRODUCT_SITE_URL,
  PRODUCT_SPEC_DEFAULTS,
  PRODUCT_WHATSAPP_NUMBER,
  RATING_DISTRIBUTION,
  RECENT_PRODUCT_IDS,
  RELATED_PRODUCT_IDS,
} from "@/config/store-product-detail";
import { STORE_PRODUCTS } from "@/config/store-products";
import { generateSlug } from "@/lib/slug";
import { discountPercent } from "@/lib/store-product";
import { formatTaka } from "@/lib/utils";
import type { StoreProduct } from "@/types/store-product";
import type { ProductDetail, ProductDetailCopy } from "@/types/store-product-detail";

export const findStoreProduct = (slug: string) => STORE_PRODUCTS.find((product) => product.slug === slug);

const codeOf = (value = "") =>
  value
    .normalize("NFKD")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 3)
    .toUpperCase();

const productSku = ({ id, brand, name }: StoreProduct) => {
  const brandWords = brand.toLowerCase().split(" ");
  const line = name.split(" ").find((word) => !brandWords.includes(word.toLowerCase()));
  return `${codeOf(brand)}-${codeOf(line)}-${String(id).padStart(3, "0")}`;
};

const piecesOf = (size: string, copy: ProductDetailCopy) => {
  if (copy.pieces) return copy.pieces;
  const match = size.match(/(\d+) pcs/) ?? size.match(/^(\d+) ×/);
  return match ? Number(match[1]) : undefined;
};

const netWeightOf = (size: string, copy: ProductDetailCopy) =>
  copy.pieces && !size.includes("pcs") ? `${size} · ${copy.pieces} pcs` : size;

const pickProducts = (ids: number[], current: StoreProduct) => {
  const listed = ids
    .map((id) => STORE_PRODUCTS.find((product) => product.id === id))
    .filter((product): product is StoreProduct => Boolean(product) && product?.id !== current.id);
  const extras = STORE_PRODUCTS.filter(
    (product) => product.id !== current.id && product.category === current.category && !listed.includes(product),
  );
  return [...listed, ...extras].slice(0, PRODUCT_RAIL_SIZE);
};

const ratingBars = (reviewCount: number) => {
  const total = RATING_DISTRIBUTION.reduce((sum, bar) => sum + bar.count, 0);
  return RATING_DISTRIBUTION.map((bar) => ({ ...bar, count: Math.round((bar.count * reviewCount) / total) }));
};

export function buildProductDetail(product: StoreProduct): ProductDetail {
  const copy = PRODUCT_COPY[product.slug] ?? {};
  const netWeight = netWeightOf(product.size, copy);
  const pieces = piecesOf(product.size, copy);
  const pieceUnit = copy.pieceUnit ?? (product.size.includes("×") ? "pack" : "piece");
  const categoryHref = `/category/${generateSlug(product.category)}`;
  const sku = copy.sku ?? productSku(product);

  return {
    product,
    title: copy.title ?? product.name,
    brandLine: `${product.brand} · ${product.origin}`,
    description:
      copy.description ??
      `${product.name} by ${product.brand}, imported directly from ${product.origin} and stored in our temperature-controlled Dhaka warehouse. Every pack is batch-tracked and sold as an original import — perfect for sharing, gifting, or keeping a secret stash.`,
    highlights: copy.highlights ?? [
      `Net weight — ${netWeight}`,
      `Imported directly from ${product.origin}, batch-tracked`,
      "Stored at 16–18 °C in our Dhaka warehouse",
    ],
    netWeight,
    variantLabel: `${product.type}, ${netWeight}`,
    sku,
    discount: discountPercent(product),
    savings: product.oldPrice ? product.oldPrice - product.price : 0,
    unitPriceNote: pieces ? `${formatTaka(product.price / pieces)} per ${pieceUnit}` : undefined,
    categoryHref,
    brandHref: `${categoryHref}?filter=${generateSlug(product.brand)}`,
    shareUrl: `${PRODUCT_SITE_URL}/${product.slug}`,
    gallery: GALLERY_LABELS.map((label, index) => ({
      label,
      image: index === 0 ? product.image : GALLERY_EXTRA_IMAGES[index - 1],
    })),
    specs: [
      { label: "Brand", value: BRAND_COMPANIES[product.brand] ?? product.brand },
      { label: "Country of origin", value: product.origin },
      { label: "Net weight", value: netWeight },
      { label: "Type", value: `${product.type} chocolate` },
      { label: "Shelf life", value: PRODUCT_SPEC_DEFAULTS.shelfLife },
      { label: "Storage", value: PRODUCT_SPEC_DEFAULTS.storage },
      { label: "Importer", value: PRODUCT_SPEC_DEFAULTS.importer },
      { label: "SKU", value: sku },
    ],
    ratingBars: ratingBars(product.reviewCount),
    related: pickProducts(RELATED_PRODUCT_IDS, product),
    recent: pickProducts(RECENT_PRODUCT_IDS, product),
  };
}

export const cartLine = (detail: ProductDetail, quantity: number) =>
  `${quantity} × ${detail.variantLabel} · ${formatTaka(detail.product.price * quantity)}`;

export const whatsappOrderHref = (detail: ProductDetail, quantity: number) => {
  const message = [
    "Hello! ChocoFest BD, I'm interested in:",
    `Product: ${detail.product.name} (${detail.variantLabel})`,
    `Quantity: ${quantity}`,
    `Price: ${formatTaka(detail.product.price * quantity)}`,
    `SKU: ${detail.sku}`,
    `Product URL: ${detail.shareUrl}`,
  ].join("\n");
  return `https://wa.me/${PRODUCT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
