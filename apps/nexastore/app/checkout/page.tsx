"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCard,
  Lock,
  ChevronLeft,
  Check,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
  };

  if (isComplete) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center px-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-gray-400 mb-8 max-w-md">
              Thank you for your order. We&apos;ve sent a confirmation email
              with your order details.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Order #NX-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-medium text-white transition-all hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <CartDrawer />
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center px-4">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-700 mb-6" />
            <h1 className="text-2xl font-bold text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-400 mb-8">
              Add some items to your cart before checking out.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-medium text-white transition-all hover:scale-105"
            >
              Browse Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  const tax = Math.round(getTotalPrice() * 0.08);
  const total = getTotalPrice() + tax;

  return (
    <>
      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Checkout Form */}
            <div>
              <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">
                    Contact Information
                  </h2>
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      required
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      required
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      required
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      required
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="ZIP code"
                      required
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-400" />
                    Payment
                  </h2>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <input
                      type="text"
                      placeholder="Card number"
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        required
                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        required
                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <Lock className="h-4 w-4" />
                    Your payment info is secure and encrypted
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ${total.toLocaleString()}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 items-center"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item.product.category}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-white">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-white/10 pt-4 space-y-3">
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
                    <span>Tax (8%)</span>
                    <span className="text-white">${tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-white">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
