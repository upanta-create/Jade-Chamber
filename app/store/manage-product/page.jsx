'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { assets, categoriesData } from '@/assets/assets';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Sparkles,
  AlertTriangle,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  Package,
} from 'lucide-react';

export default function StoreManageProducts() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Selected product for edit/delete
  const [activeProduct, setActiveProduct] = useState(null);

  // Form states for create/edit
  const initialForm = {
    name: '',
    description: '',
    category: 'Computing',
    mrp: '',
    price: '',
    imageUrl: '',
    inStock: true,
  };
  const [formData, setFormData] = useState(initialForm);
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      toast.error('Failed to load products from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle Image File Upload -> Convert to base64 Data URL (stored in DB, no local files)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size exceeds 2MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      toast.success('Image loaded into memory');
    };
    reader.onerror = () => {
      toast.error('Failed to process image file');
    };
    reader.readAsDataURL(file);
  };

  // Open Create Modal
  const openCreateModal = () => {
    setFormData(initialForm);
    setImageMode('url');
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setActiveProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || 'Adepti Relics',
      mrp: product.mrp ? String(product.mrp) : '',
      price: product.price ? String(product.price) : '',
      imageUrl: product.images?.[0] || '',
      inStock: product.inStock !== undefined ? product.inStock : true,
    });
    setImageMode(product.images?.[0]?.startsWith('data:') ? 'upload' : 'url');
    setIsEditOpen(true);
  };

  // Open Delete Modal
  const openDeleteModal = (product) => {
    setActiveProduct(product);
    setIsDeleteOpen(true);
  };

  // CREATE Product Handler
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      toast.error('Name and offer price are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        mrp: parseFloat(formData.mrp) || parseFloat(formData.price),
        price: parseFloat(formData.price),
        images: formData.imageUrl ? [formData.imageUrl] : ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800'],
        inStock: formData.inStock,
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.success) {
        toast.success(`"${payload.name}" registered to Jade Chamber ledger!`);
        setIsCreateOpen(false);
        setProducts((prev) => [resData.data, ...prev]);
      } else {
        toast.error(resData.error || 'Failed to create product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error while creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // EDIT Product Handler
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!activeProduct) return;

    try {
      setIsSubmitting(true);
      const payload = {
        id: activeProduct.id,
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        mrp: parseFloat(formData.mrp) || parseFloat(formData.price),
        price: parseFloat(formData.price),
        images: formData.imageUrl ? [formData.imageUrl] : activeProduct.images,
        inStock: formData.inStock,
      };

      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.success) {
        toast.success(`Artifact "${payload.name}" updated!`);
        setIsEditOpen(false);
        setProducts((prev) =>
          prev.map((p) => (p.id === activeProduct.id ? { ...p, ...payload } : p))
        );
      } else {
        toast.error(resData.error || 'Failed to update product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error while updating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE Product Handler
  const handleDeleteConfirm = async () => {
    if (!activeProduct) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/products?id=${activeProduct.id}`, {
        method: 'DELETE',
      });

      const resData = await res.json();
      if (resData.success) {
        toast.success(`"${activeProduct.name}" banished from registry.`);
        setProducts((prev) => prev.filter((p) => p.id !== activeProduct.id));
        setIsDeleteOpen(false);
      } else {
        toast.error(resData.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error while deleting product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // TOGGLE Stock Handler
  const handleToggleStock = async (product) => {
    const updatedStatus = !product.inStock;
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, inStock: updatedStatus }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: updatedStatus } : p))
        );
        toast.success(
          `${product.name} is now ${updatedStatus ? 'Available in Stall' : 'Out of Stock'}`
        );
      }
    } catch (err) {
      toast.error('Failed to toggle stock status');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-4 px-2 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Vendor Products <span className="text-emerald-600">Inventory</span>
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold font-mono">
              {products.length} Products
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage, edit, and publish products across the multi-vendor marketplace. Real-time PostgreSQL and Redis cache synchronization.
          </p>
        </div>

        {/* Action Button: Create Product */}
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer text-sm"
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <Package size={48} className="mx-auto text-slate-400 mb-3" />
          <p className="text-slate-600 font-medium">No relics found in this ledger</p>
          <button
            onClick={openCreateModal}
            className="mt-4 text-xs font-semibold text-amber-600 hover:text-amber-700 underline"
          >
            Commission the first artifact
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-4">Artifact / Product</th>
                <th className="px-4 py-4 hidden sm:table-cell">Category</th>
                <th className="px-4 py-4 hidden md:table-cell">Original (MRP)</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4 text-center">In Stock</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Thumbnail & Title */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        <Image
                          src={product.images?.[0] || assets.jade_chamber_logo}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-sm">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate max-w-xs">
                          {product.description || 'No description entered.'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                      {product.category || 'General'}
                    </span>
                  </td>

                  {/* MRP */}
                  <td className="px-4 py-3.5 hidden md:table-cell text-slate-400 line-through font-mono">
                    {currency} {Number(product.mrp || product.price).toLocaleString()}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3.5 font-bold text-amber-600 font-mono">
                    {currency} {Number(product.price).toLocaleString()}
                  </td>

                  {/* Stock Toggle */}
                  <td className="px-4 py-3.5 text-center">
                    <button
                      onClick={() => handleToggleStock(product)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                        product.inStock
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>

                  {/* Action Buttons: Edit / Delete */}
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Artifact"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(product)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Artifact"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. CREATE PRODUCT MODAL                                   */}
      {/* ========================================================= */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Commission New Artifact</h3>
                  <p className="text-xs text-slate-500">Save product metadata directly to PostgreSQL</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Artifact Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Celestial Glaze Lily Brooch"
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              {/* Category & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 outline-none bg-white"
                  >
                    {categoriesData.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">In Stall Stock</span>
                  </label>
                </div>
              </div>

              {/* Price & MRP */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Offer Price (✦) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="2400"
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Original Price (✦)
                  </label>
                  <input
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    placeholder="3000"
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the provenance, artisan origins, or elemental power..."
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 outline-none resize-none"
                />
              </div>

              {/* Product Image Source (URL vs Base64 upload) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Product Image (Saved in DB)
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`px-2 py-0.5 rounded font-mono ${
                        imageMode === 'url' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-500'
                      }`}
                    >
                      Web URL
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={() => setImageMode('upload')}
                      className={`px-2 py-0.5 rounded font-mono ${
                        imageMode === 'upload' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-500'
                      }`}
                    >
                      File Upload
                    </button>
                  </div>
                </div>

                {imageMode === 'url' ? (
                  <div className="flex gap-2">
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-lg p-4 cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100/60">
                      <Upload size={22} className="text-slate-400 mb-1" />
                      <span className="text-xs text-slate-600 font-medium">Choose file to encode into database</span>
                      <span className="text-[10px] text-slate-400">PNG, JPG, WebP up to 2MB</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                )}

                {/* Image Live Preview */}
                {formData.imageUrl && (
                  <div className="mt-3 flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="relative w-14 h-14 rounded-md overflow-hidden bg-slate-200 shrink-0">
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        Image Attached
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{formData.imageUrl}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit / Cancel Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving to Ledger...' : 'Create Artifact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. EDIT PRODUCT MODAL                                     */}
      {/* ========================================================= */}
      {isEditOpen && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-700 flex items-center justify-center">
                  <Pencil size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Reforge Artifact / Edit Product</h3>
                  <p className="text-xs text-slate-500">Update specifications in PostgreSQL ledger</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Artifact Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-emerald-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-emerald-500 outline-none bg-white"
                  >
                    {categoriesData.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">In Stall Stock</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Offer Price (✦) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Original Price (✦)
                  </label>
                  <input
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-emerald-500 outline-none resize-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Product Image (Saved in DB)
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`px-2 py-0.5 rounded font-mono ${
                        imageMode === 'url' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-500'
                      }`}
                    >
                      Web URL
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={() => setImageMode('upload')}
                      className={`px-2 py-0.5 rounded font-mono ${
                        imageMode === 'upload' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-500'
                      }`}
                    >
                      File Upload
                    </button>
                  </div>
                </div>

                {imageMode === 'url' ? (
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:border-emerald-500 outline-none"
                  />
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-lg p-4 cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100/60">
                    <Upload size={22} className="text-slate-400 mb-1" />
                    <span className="text-xs text-slate-600 font-medium">Replace with new encoded image</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                )}

                {formData.imageUrl && (
                  <div className="mt-3 flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="relative w-14 h-14 rounded-md overflow-hidden bg-slate-200 shrink-0">
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        Live Preview
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{formData.imageUrl}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Updating...' : 'Save Modifications'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. DELETE CONFIRMATION MODAL                              */}
      {/* ========================================================= */}
      {isDeleteOpen && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center">Banish from Jade Chamber?</h3>
            <p className="text-sm text-slate-500 text-center mt-2 leading-relaxed">
              Are you sure you wish to banish{' '}
              <strong className="text-slate-800">"{activeProduct.name}"</strong> from the registry? This
              action permanently removes it from the Golden House ledger.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Retain Artifact
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDeleteConfirm}
                className="px-5 py-2 text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Confirm Banishment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}