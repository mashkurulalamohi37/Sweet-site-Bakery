import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Settings,
  ChefHat,
  Filter,
} from 'lucide-react';
import { formatBDT } from '../../utils/formatters';
import { productsApi } from '../../services/api';
import { Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'inventory' | 'cms'>('orders');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([
    {
      id: 101,
      order_number: 'SSB-994821',
      customer_name: 'Mahmuda Begum',
      customer_phone: '01711223344',
      zone: 'Dhap / Medical Mor',
      items: 'Chocolate Over Loaded Cake (2 Lb)',
      total: 3998,
      status: 'baking',
      created_at: '2026-09-25 14:30',
    },
    {
      id: 102,
      order_number: 'SSB-994822',
      customer_name: 'Tanvir Hossain',
      customer_phone: '01855667788',
      zone: 'Jahaj Company Mor',
      items: 'Bento Box Lunch Cake (Vanilla & White Choc)',
      total: 760,
      status: 'confirmed',
      created_at: '2026-09-25 15:10',
    },
    {
      id: 103,
      order_number: 'SSB-994823',
      customer_name: 'Rehana Parveen',
      customer_phone: '01911445566',
      zone: 'RK Road',
      items: 'Basque Cheesecake (1 Lb)',
      total: 1050,
      status: 'out_for_delivery',
      created_at: '2026-09-25 13:00',
    },
  ]);

  const [inventory, setInventory] = useState([
    { name: 'Pure Homemade Churned Butter', quantity: 24.5, unit: 'kg', min: 10, status: 'In Stock' },
    { name: 'White Chocolate Blocks (Imported)', quantity: 18.0, unit: 'kg', min: 8, status: 'In Stock' },
    { name: 'Ever-Whipped Stabilized Cream', quantity: 35.0, unit: 'Liters', min: 12, status: 'In Stock' },
    { name: 'Belgian 70% Dark Cocoa', quantity: 14.0, unit: 'kg', min: 5, status: 'In Stock' },
    { name: 'Cardamom & Roshmalai Essence', quantity: 4.2, unit: 'Liters', min: 2, status: 'In Stock' },
    { name: '24K Edible Gold Leaf Sheets', quantity: 45, unit: 'sheets', min: 15, status: 'In Stock' },
  ]);

  useEffect(() => {
    productsApi.getAll().then((data) => setProducts(data));
  }, []);

  const handleUpdateOrderStatus = (orderId: number, nextStatus: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handlePriceUpdate = (productId: number, newPrice: number) => {
    setProducts(
      products.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  return (
    <div className="bg-brand-cream/30 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
              Rangpur Central Store Management
            </span>
            <h1 className="font-serif text-3xl font-bold text-brand-brown">
              Sweet Site Bakery Admin
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-brand-brown/10 shadow-sm">
            {[
              { id: 'orders', label: 'Live Orders', icon: ShoppingBag },
              { id: 'products', label: 'Cake Catalog', icon: CakeIcon },
              { id: 'inventory', label: 'Bakery Inventory', icon: Package },
              { id: 'cms', label: 'Store CMS', icon: Settings },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t.id
                    ? 'bg-brand-brown text-white shadow-sm'
                    : 'text-brand-brown hover:bg-brand-cream'
                }`}
              >
                <t.icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-brand-brown/10 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-muted text-xs font-medium">
              <span>Today's Revenue</span>
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-brand-brown">৳18,450</p>
            <p className="text-[11px] text-green-600 font-semibold">+18.5% from yesterday</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-brand-brown/10 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-muted text-xs font-medium">
              <span>Active Bakery Orders</span>
              <ChefHat className="w-4 h-4 text-brand-accent" />
            </div>
            <p className="font-serif text-2xl font-bold text-brand-brown">{orders.length} in Kitchen</p>
            <p className="text-[11px] text-amber-600 font-semibold">2 urgent delivery slots</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-brand-brown/10 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-muted text-xs font-medium">
              <span>Total Flavours Online</span>
              <Package className="w-4 h-4 text-brand-brown" />
            </div>
            <p className="font-serif text-2xl font-bold text-brand-brown">{products.length} Products</p>
            <p className="text-[11px] text-brand-muted font-medium">28 Pound Cakes + 17 Bakery Items</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-brand-brown/10 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-muted text-xs font-medium">
              <span>Butter & Cream Stock</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-green-700">Healthy (96%)</p>
            <p className="text-[11px] text-brand-muted font-medium">No raw material shortages</p>
          </div>
        </div>

        {/* Tab 1: Live Kitchen & Order Management */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-brown">
                  Active Cake Orders & Dispatch Queue
                </h3>
                <p className="text-xs text-brand-muted">
                  Advance baking state machine stages in real-time.
                </p>
              </div>
            </div>

            <div className="divide-y divide-brand-brown/10">
              {orders.map((ord) => (
                <div key={ord.id} className="py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-brand-brown">
                        {ord.order_number}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-cream text-brand-brown px-2 py-0.5 rounded-md">
                        {ord.zone}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-brand-brown">{ord.customer_name} • {ord.customer_phone}</p>
                    <p className="text-xs text-brand-muted">{ord.items}</p>
                    <p className="text-[11px] text-brand-muted/70">Received: {ord.created_at}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                    <span className="font-serif font-bold text-lg text-brand-brown mr-2">
                      {formatBDT(ord.total)}
                    </span>

                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                      className="text-xs font-bold bg-brand-cream/60 border border-brand-brown/15 rounded-xl px-3 py-2 text-brand-brown focus:outline-none"
                    >
                      <option value="pending">Pending Receipt</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="baking">Baking in Oven</option>
                      <option value="frosting">Piping & Frosting</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered ✓</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Product Catalog & Price Management */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-brown">
                  Bakery Catalog & BDT Pricing Matrix
                </h3>
                <p className="text-xs text-brand-muted">
                  Update pound cake rates, modify descriptions, and toggle bestsellers.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-brand-brown">
                <thead className="bg-brand-cream/50 text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                  <tr>
                    <th className="p-3 rounded-l-xl">Cake Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Base Price</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3 rounded-r-xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-brown/10">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-brand-cream/20">
                      <td className="p-3 font-medium flex items-center gap-3">
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold">{p.name}</p>
                          {p.is_bestseller && (
                            <span className="text-[9px] bg-brand-accent/30 text-brand-brown px-1.5 py-0.5 rounded font-bold uppercase">
                              Bestseller
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 capitalize text-brand-muted">
                        {typeof p.category === 'object' ? p.category.name : String(p.category || '').replace(/_/g, ' ')}
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={p.price || p.base_price || 0}
                          onChange={(e) => handlePriceUpdate(Number(p.id), Number(e.target.value))}
                          className="w-24 px-2 py-1 bg-brand-cream/50 border border-brand-brown/15 rounded-lg text-xs font-bold"
                        />
                      </td>
                      <td className="p-3 font-semibold text-amber-500">
                        {p.rating} ★ ({p.reviews_count})
                      </td>
                      <td className="p-3 text-right">
                        <button className="p-1.5 hover:bg-brand-cream rounded-lg text-brand-brown transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Raw Materials Inventory */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-brown">
                Baking Ingredients & Quality Stock
              </h3>
              <p className="text-xs text-brand-muted">
                Monitor homemade butter, white chocolate, and pure extracts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventory.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-brand-brown/10 bg-brand-cream/20 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif font-bold text-sm text-brand-brown">{item.name}</h4>
                    <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                  <p className="font-serif text-2xl font-bold text-brand-brown">
                    {item.quantity} <span className="text-xs font-sans text-brand-muted">{item.unit}</span>
                  </p>
                  <p className="text-[11px] text-brand-muted">Safety threshold: {item.min} {item.unit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Store CMS */}
        {activeTab === 'cms' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6 max-w-2xl">
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-brown">
                Store CMS & Announcement Banner
              </h3>
              <p className="text-xs text-brand-muted">
                Update top marquee notices, delivery discounts, and festival greetings.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-brand-brown mb-1">Top Announcement Marquee</label>
                <input
                  type="text"
                  defaultValue="✨ 100% Homemade Butter & Ever Whipped Frosting • Fresh Delivery Across Rangpur • Use Code SWEET10 for 10% OFF ✨"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-brown mb-1">Bakery Hotline / WhatsApp</label>
                <input
                  type="text"
                  defaultValue="+880 1852-668468"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none"
                />
              </div>

              <button className="px-6 py-2.5 rounded-xl bg-brand-brown hover:bg-brand-brown-light text-white font-semibold shadow-sm transition-all">
                Save CMS Configuration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CakeIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
    <path d="M2 21h20" />
    <path d="M7 8v2" />
    <path d="M12 8v2" />
    <path d="M17 8v2" />
    <path d="M7 4h.01" />
    <path d="M12 4h.01" />
    <path d="M17 4h.01" />
  </svg>
);
