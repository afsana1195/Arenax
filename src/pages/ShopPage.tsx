import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { DemoDataBadge } from '../components/common/DemoDataBadge';
import {
  ShoppingBag,
  Star,
  Search,
  Check,
  Filter,
  ShieldCheck,
  X,
  Truck,
  RotateCcw,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { addToCart, setIsDrawerOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailSize, setDetailSize] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filter and sort
  const filteredProducts = MOCK_PRODUCTS.filter((prod) => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return prod.name.toLowerCase().includes(q) || prod.description.toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleAddToCart = (product: Product, size?: string) => {
    addToCart(product, size || (product.sizes ? product.sizes[0] : undefined), 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setDetailSize(product.sizes ? product.sizes[0] : '');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4" />
            Official Stadium Store
          </span>
          <DemoDataBadge tooltip="Merchandise catalog & prices are simulated for preview." />
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Arena X Merchandise &amp; Gear
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
          Engineered athletic kits, limited edition obsidian snapbacks, tournament gaming peripherals, and collector heraldry.
        </p>
      </div>

      {/* Filter, Sort & Search Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#0e131f] p-4 rounded-2xl border border-slate-800">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'jerseys', label: 'Jerseys & Tops' },
            { id: 'headwear', label: 'Caps & Snapbacks' },
            { id: 'gaming', label: 'Esports Peripherals' },
            { id: 'accessories', label: 'Collector Accessories' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none shrink-0"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-xs space-y-2">
          <p>No merchandise matches your current filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg uppercase"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-[#0e131f] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => openProductDetail(prod)}
                  className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-800 cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                      {prod.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-slate-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Quick View
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{prod.rating}</span>
                      <span className="text-slate-500">({prod.reviewCount})</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400">
                      In Stock &amp; Ready to Ship
                    </span>
                  </div>

                  <h3
                    onClick={() => openProductDetail(prod)}
                    className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div>
                  <span className="font-display text-2xl font-black text-white">
                    ${prod.price.toFixed(2)}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-xs text-slate-500 line-through ml-2">
                      ${prod.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(prod)}
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                >
                  {addedId === prod.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Perks Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-xs text-slate-300">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-3">
          <Truck className="w-6 h-6 text-cyan-400 shrink-0" />
          <div>
            <p className="font-bold text-white">Free Global Shipping</p>
            <p className="text-slate-500">Complimentary on all qualifying orders over $75.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-3">
          <RotateCcw className="w-6 h-6 text-cyan-400 shrink-0" />
          <div>
            <p className="font-bold text-white">30-Day Hassle-Free Returns</p>
            <p className="text-slate-500">Unworn apparel can be exchanged or refunded easily.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
          <div>
            <p className="font-bold text-white">100% Authentic Merch</p>
            <p className="text-slate-500">Official tournament jerseys and collector editions.</p>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-[#0c101a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product detail"
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full sm:w-1/2 aspect-square object-cover rounded-xl border border-slate-800"
            />

            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{selectedProduct.rating}</span>
                  <span className="text-slate-500">({selectedProduct.reviewCount} reviews)</span>
                </div>
                <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                  {selectedProduct.name}
                </h3>
                <span className="font-display text-3xl font-black text-cyan-400 block">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {selectedProduct.sizes && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Select Size
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setDetailSize(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            detailSize === s
                              ? 'bg-cyan-500 text-slate-950 shadow-md'
                              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, detailSize);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
