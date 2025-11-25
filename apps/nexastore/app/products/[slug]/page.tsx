import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { AddToCartButton } from "./add-to-cart-button";
import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Star, Truck, Shield, RefreshCw, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | NexaStore" };
  }

  return {
    title: `${product.name} | NexaStore`,
    description: product.description,
    openGraph: {
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <>
      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-black">
        {/* Breadcrumb */}
        <div className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </div>

        {/* Product Detail */}
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {discount > 0 && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-sm font-bold text-white">
                    -{discount}%
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                      index === 0
                        ? "border-purple-500"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Category */}
              <span className="inline-block rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-400">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white lg:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-600 text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-white">{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-white">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">
                {product.description}
              </p>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    product.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={product.inStock ? "text-green-400" : "text-red-400"}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Add to Cart */}
              <AddToCartButton product={product} />

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Truck className="h-6 w-6 text-purple-400" />
                  <span className="text-sm text-gray-400">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Shield className="h-6 w-6 text-purple-400" />
                  <span className="text-sm text-gray-400">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <RefreshCw className="h-6 w-6 text-purple-400" />
                  <span className="text-sm text-gray-400">30-Day Returns</span>
                </div>
              </div>

              {/* Specs */}
              {product.specs && (
                <div className="pt-6 border-t border-white/10">
                  <h3 className="font-semibold text-white mb-4">Specifications</h3>
                  <dl className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between text-sm border-b border-white/5 pb-3"
                      >
                        <dt className="text-gray-500">{key}</dt>
                        <dd className="text-white font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-white/10 bg-black py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="text-2xl font-bold text-white mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
