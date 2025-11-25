import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | NexaStore",
  description: "Browse our complete collection of premium tech products.",
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category;
  const searchQuery = params.q?.toLowerCase();

  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.tags.some((t) => t.includes(searchQuery))
    );
  }

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <>
      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section className="border-b border-white/10 bg-gradient-to-b from-purple-900/10 to-transparent">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <h1 className="text-4xl font-bold text-white">
              {currentCategory ? currentCategory.name : "All Products"}
            </h1>
            <p className="mt-4 text-gray-400">
              {currentCategory
                ? `Browse our ${currentCategory.name.toLowerCase()} collection`
                : "Discover our complete collection of premium tech products"}
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="font-semibold text-white mb-4">Categories</h3>
                  <div className="space-y-2">
                    <a
                      href="/products"
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        !selectedCategory
                          ? "bg-purple-500/20 text-purple-400"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      All Products
                    </a>
                    {categories.map((category) => (
                      <a
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          selectedCategory === category.id
                            ? "bg-purple-500/20 text-purple-400"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{category.icon}</span>
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Price Range (Visual only for demo) */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="font-semibold text-white mb-4">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="price-1"
                        className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                      />
                      <label htmlFor="price-1" className="text-sm text-gray-400">
                        Under $100
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="price-2"
                        className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                      />
                      <label htmlFor="price-2" className="text-sm text-gray-400">
                        $100 - $500
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="price-3"
                        className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                      />
                      <label htmlFor="price-3" className="text-sm text-gray-400">
                        $500 - $1000
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="price-4"
                        className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                      />
                      <label htmlFor="price-4" className="text-sm text-gray-400">
                        Over $1000
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400">
                  Showing{" "}
                  <span className="text-white font-medium">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>
                <select className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-purple-500 focus:outline-none">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg">No products found</p>
                  <a
                    href="/products"
                    className="mt-4 inline-flex text-purple-400 hover:text-purple-300"
                  >
                    View all products
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
