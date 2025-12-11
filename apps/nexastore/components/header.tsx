"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Search, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

// Navigation menu items - links to product categories and collections
const navigation = [
  { name: "New Arrivals", href: "/products?new=true" },
  { name: "Collections", href: "/products" }, // Redirects to all products (no dedicated collections page)
  { name: "For Him", href: "/products?category=laptops" },
  { name: "For Her", href: "/products?category=wearables" },
  { name: "Gifts", href: "/products?featured=true" },
];

export function Header() {
  const { getTotalItems, openCart } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2.5 text-xs tracking-[0.2em] uppercase">
        Complimentary Shipping on All Orders
      </div>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
          }`}
      >
        {/* Main Navigation */}
        <nav className="border-b border-gray-100">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            {/* Top row - Logo and Actions */}
            <div className="flex items-center justify-between py-4 lg:py-5">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 -ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* Logo - Centered */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                <h1 className="text-2xl lg:text-3xl tracking-[0.3em] font-normal">
                  NEXASTORE
                </h1>
              </Link>

              {/* Actions */}
              <div className="flex items-center gap-5">
                <button
                  className="hidden lg:block p-2 hover:opacity-60 transition-opacity"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  className="hidden lg:block p-2 hover:opacity-60 transition-opacity"
                  aria-label="Account"
                >
                  <User className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  onClick={openCart}
                  className="relative p-2 hover:opacity-60 transition-opacity"
                  aria-label="Shopping bag"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center text-[10px] font-medium bg-black text-white rounded-full">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center gap-10 pb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs tracking-[0.15em] uppercase text-gray-800 hover:text-black underline-hover transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 top-[89px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <nav className="p-6 space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-lg tracking-[0.1em] text-gray-800 hover:text-black transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-gray-200" />
            <Link
              href="/account"
              className="block text-sm tracking-[0.1em] text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Account
            </Link>
            <Link
              href="/stores"
              className="block text-sm tracking-[0.1em] text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Store Locator
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
