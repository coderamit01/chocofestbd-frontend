"use client";

import { createContext, use, useState, type ReactNode } from "react";
import { toast } from "sonner";

type ProductDetailState = {
  quantity: number;
  setQuantity: (value: number) => void;
  added: boolean;
  addToCart: () => void;
  wished: boolean;
  toggleWish: () => void;
  compared: boolean;
  toggleCompare: () => void;
};

const ProductDetailContext = createContext<ProductDetailState | null>(null);

export function useProductDetail() {
  const value = use(ProductDetailContext);
  if (!value) throw new Error("useProductDetail must be used inside ProductDetailProvider");
  return value;
}

type ProductDetailProviderProps = {
  productName: string;
  children: ReactNode;
};

export function ProductDetailProvider({ productName, children }: ProductDetailProviderProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [compared, setCompared] = useState(false);

  const addToCart = () => {
    setAdded(true);
    toast.success("Added to cart", { description: `${quantity} × ${productName}` });
  };

  const toggleWish = () => {
    setWished(!wished);
    toast.success(wished ? "Removed from wishlist" : "Saved to wishlist", { description: productName });
  };

  const toggleCompare = () => {
    setCompared(!compared);
    toast.success(compared ? "Removed from compare" : "Added to compare", { description: productName });
  };

  return (
    <ProductDetailContext
      value={{ quantity, setQuantity, added, addToCart, wished, toggleWish, compared, toggleCompare }}
    >
      {children}
    </ProductDetailContext>
  );
}
