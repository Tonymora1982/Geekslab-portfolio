"use client";

import { useCartStore } from "@/store/cart";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <>
      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section className="border-b border-white/10 bg-gradient-to-b from-purple-900/10 to-transparent">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
            <p className="mt-4 text-gray-400">
              {items.length === 0
                ? "Your cart is empty"
                : `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-24 w-24 text-gray-700 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8 max-w-md">
                Looks like you haven&apos;t added anything to your cart yet.
                Start shopping and find something you love!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-medium text-white transition-all hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-6 rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    {/* Image */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-white/5"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="text-lg font-semibold text-white hover:text-purple-400 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.product.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="rounded-full bg-white/10 p-2 text-gray-400 transition-colors hover:bg-white/20 hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="rounded-full bg-white/10 p-2 text-gray-400 transition-colors hover:bg-white/20 hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-6">
                          <span className="text-lg font-bold text-white">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-500/20 hover:text-red-400"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-white">
                        ${getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax</span>
                      <span className="text-white">
                        ${Math.round(getTotalPrice() * 0.08).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-white">
                        $
                        {(
                          getTotalPrice() + Math.round(getTotalPrice() * 0.08)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                      />
                      <button className="rounded-lg bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Security Note */}
                  <p className="mt-4 text-center text-xs text-gray-500">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
