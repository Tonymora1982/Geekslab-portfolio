"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  return (
    <div className="group">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        
        {/* Quick Add - appears on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="w-full py-3 bg-white/95 backdrop-blur-sm text-xs tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors duration-300"
          >
            Quick Add
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 text-center">
        {/* Category */}
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
          {product.category}
        </span>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 text-sm hover:underline underline-offset-4 transition-all">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-sm">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
