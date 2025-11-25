"use client";

import { useCartStore } from "@/store/cart";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg tracking-[0.1em]">Shopping Bag</h2>
            <p className="text-xs text-gray-500 mt-1">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:opacity-60 transition-opacity"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6" style={{ maxHeight: "calc(100vh - 260px)" }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-gray-500 mb-6">Your shopping bag is empty</p>
              <button
                onClick={closeCart}
                className="px-8 py-3 bg-black text-white text-xs tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4"
                >
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={closeCart}
                    className="relative h-28 w-24 flex-shrink-0 overflow-hidden bg-gray-50"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-sm hover:underline underline-offset-4"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        ${item.product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-gray-400 hover:text-black underline underline-offset-4 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-6">
            {/* Total */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm">Subtotal</span>
              <span className="text-lg">
                ${getTotalPrice().toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-4 bg-black text-white text-center text-xs tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </Link>

            <p className="mt-4 text-center text-xs text-gray-400">
              Complimentary shipping on all orders
            </p>
          </div>
        )}
      </div>
    </>
  );
}
