"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/lib/products";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-medium text-white">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3 px-6 font-medium text-white transition-all ${
          added
            ? "bg-green-500"
            : product.inStock
            ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25"
            : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </>
        )}
      </button>
    </div>
  );
}
