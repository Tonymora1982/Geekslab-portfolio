import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts, categories } from "@/lib/products";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "The Innovation Edit",
    subtitle: "Cutting-edge technology",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&h=800&fit=crop",
    href: "/products?category=laptops",
  },
  {
    title: "Sound Excellence",
    subtitle: "Premium audio experience",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop",
    href: "/products?category=audio",
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Header />
      <CartDrawer />

      <main>
        {/* Hero Section - Full Screen */}
        <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1920&h=1080&fit=crop"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <span className="text-xs tracking-[0.3em] uppercase mb-6 fade-in-up">
              The New Collection
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
              Innovation Meets
              <br />
              Elegance
            </h2>
            <p className="text-sm md:text-base max-w-md mb-10 opacity-90 fade-in-up" style={{ animationDelay: "0.2s" }}>
              Discover our curated selection of premium technology
            </p>
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-500 fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white">
            <div className="w-[1px] h-16 bg-white/50 mx-auto mb-3" />
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-16 lg:py-24 border-b border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 text-center">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <span className="text-xs tracking-[0.15em] uppercase text-gray-600 group-hover:text-black transition-colors">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Dual Collection Showcase */}
        <section className="py-16 lg:py-0">
          <div className="grid lg:grid-cols-2">
            {collections.map((collection, index) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group relative h-[70vh] min-h-[500px] overflow-hidden"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                  <span className="text-xs tracking-[0.3em] uppercase mb-4 opacity-80">
                    {collection.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6">
                    {collection.title}
                  </h3>
                  <span className="text-xs tracking-[0.2em] uppercase border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                    Discover
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                Curated Selection
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl">
                Featured Products
              </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-16">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
              >
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Editorial Banner */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1920&h=1080&fit=crop"
            alt="Editorial"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <span className="text-xs tracking-[0.3em] uppercase mb-6">
              The Art of Innovation
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal mb-8 max-w-3xl">
              Technology That Inspires
            </h2>
            <Link
              href="/about"
              className="text-xs tracking-[0.2em] uppercase border-b border-white/50 pb-1 hover:border-white transition-colors"
            >
              Our Story
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 lg:py-24 border-t border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-12 lg:gap-16 text-center">
              <div>
                <h3 className="text-lg mb-3">Complimentary Shipping</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Enjoy free shipping on all orders. Express delivery available.
                </p>
              </div>
              <div>
                <h3 className="text-lg mb-3">Expert Support</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Our specialists are available to assist you with any questions.
                </p>
              </div>
              <div>
                <h3 className="text-lg mb-3">Easy Returns</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  30-day returns for a seamless shopping experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 lg:py-24 bg-gray-50">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl mb-4">Stay Informed</h2>
            <p className="text-sm text-gray-500 mb-8">
              Subscribe to receive updates on new arrivals, exclusive offers,
              and the latest in tech innovation.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-6 py-4 border border-gray-200 bg-white text-sm tracking-wide focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="px-10 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 lg:py-20 border-t border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              {/* Brand */}
              <div>
                <h3 className="text-xl tracking-[0.2em] mb-6">NEXASTORE</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Where innovation meets elegance. Premium technology for the discerning.
                </p>
              </div>

              {/* Shop */}
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase mb-6">Shop</h4>
                <ul className="space-y-3">
                  {categories.slice(0, 4).map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/products?category=${cat.id}`}
                        className="text-sm text-gray-500 hover:text-black transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help */}
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase mb-6">Help</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/contact" className="text-sm text-gray-500 hover:text-black transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-sm text-gray-500 hover:text-black transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="text-sm text-gray-500 hover:text-black transition-colors">
                      Shipping & Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/stores" className="text-sm text-gray-500 hover:text-black transition-colors">
                      Store Locator
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase mb-6">Connect</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} NEXASTORE. All rights reserved.
              </p>
              <p className="text-xs text-gray-400">
                Built with passion by{" "}
                <a
                  href="https://geekslab.tech"
                  className="hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GeeksLab
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
