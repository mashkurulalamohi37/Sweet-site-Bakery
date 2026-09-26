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
  BarChart3,
  PieChart,
  Award,
  ArrowUpRight,
  Download,
  Calendar,
  Layers,
  Percent,
} from 'lucide-react';
import { formatBDT } from '../../utils/formatters';
import { productsApi } from '../../services/api';
import { Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'products' | 'inventory' | 'cms'>('analytics');
  const [timeRange, setTimeRange] = useState<'all' | 'month' | 'week' | 'today'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  const [orders, setOrders] = useState<any[]>([
    {
      id: 101,
      order_number: 'SSB-994821',
      customer_name: 'Mahmuda Begum',
      customer_phone: '01711223344',
      zone: 'Dhap / Medical Mor',
      items: 'Chocolate Over Loaded Cake (2 Lb)',
      item_name: 'Chocolate Over Loaded Cake',
      quantity: 2,
      total: 3998,
      cogs: 1519,
      profit: 2479,
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
      item_name: 'Bento Box Lunch Cake',
      quantity: 1,
      total: 760,
      cogs: 274,
      profit: 486,
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
      item_name: 'Basque Burnt Cheesecake',
      quantity: 1,
      total: 1050,
      cogs: 367,
      profit: 683,
      status: 'out_for_delivery',
      created_at: '2026-09-25 13:00',
    },
    {
      id: 104,
      order_number: 'SSB-994824',
      customer_name: 'Dr. Shariful Islam',
      customer_phone: '01712334455',
      zone: 'Dhap / Medical Mor',
      items: 'Roshmalai Fusion Cake (2 Lb)',
      item_name: 'Roshmalai Fusion Cake',
      quantity: 2,
      total: 3800,
      cogs: 1444,
      profit: 2356,
      status: 'delivered',
      created_at: '2026-09-24 18:20',
    },
    {
      id: 105,
      order_number: 'SSB-994825',
      customer_name: 'Anika Tabassum',
      customer_phone: '01678990011',
      zone: 'Modern Mor',
      items: 'Red Velvet Cream Cheese (1.5 Lb)',
      item_name: 'Red Velvet Cream Cheese',
      quantity: 1,
      total: 2450,
      cogs: 906,
      profit: 1544,
      status: 'delivered',
      created_at: '2026-09-24 11:45',
    },
    {
      id: 106,
      order_number: 'SSB-994826',
      customer_name: 'Kawsar Ahmed',
      customer_phone: '01899112233',
      zone: 'Jahaj Company Mor',
      items: 'Vanilla Salted Caramel Cake (1 Lb)',
      item_name: 'Vanilla Salted Caramel',
      quantity: 1,
      total: 950,
      cogs: 370,
      profit: 580,
      status: 'delivered',
      created_at: '2026-09-23 16:15',
    },
  ]);

  // All-time best selling cakes data aggregation
  const allTimeBestSellers = [
    {
      rank: 1,
      name: 'Chocolate Over Loaded Cake',
      category: 'Signature Chocolate',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
      totalSold: 142,
      revenue: 283858,
      profit: 175990,
      margin: 62.0,
      rating: 4.9,
      reviews: 128,
      growth: '+28%',
    },
    {
      rank: 2,
      name: 'Basque Burnt Cheesecake',
      category: 'Artisanal Cheesecake',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80',
      totalSold: 98,
      revenue: 102900,
      profit: 66885,
      margin: 65.0,
      rating: 4.8,
      reviews: 94,
      growth: '+19%',
    },
    {
      rank: 3,
      name: 'Roshmalai Fusion Cake',
      category: 'Bengali Fusion',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80',
      totalSold: 84,
      revenue: 79800,
      profit: 47880,
      margin: 60.0,
      rating: 5.0,
      reviews: 86,
      growth: '+34%',
    },
    {
      rank: 4,
      name: 'Bento Box Lunch Cake',
      category: 'Trendy Bento Mini',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop&q=80',
      totalSold: 76,
      revenue: 57760,
      profit: 36966,
      margin: 64.0,
      rating: 4.7,
      reviews: 62,
      growth: '+15%',
    },
    {
      rank: 5,
      name: 'Red Velvet Cream Cheese',
      category: 'Velvet Specials',
      image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&auto=format&fit=crop&q=80',
      totalSold: 62,
      revenue: 74400,
      profit: 46872,
      margin: 63.0,
      rating: 4.8,
      reviews: 58,
      growth: '+12%',
    },
    {
      rank: 6,
      name: 'Vanilla Salted Caramel Cake',
      category: 'Classic Bakes',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80',
      totalSold: 49,
      revenue: 44100,
      profit: 26901,
      margin: 61.0,
      rating: 4.6,
      reviews: 44,
      growth: '+8%',
    },
  ];

  // Dynamic analytics multipliers based on timeRange
  const multiplier = timeRange === 'all' ? 1.0 : timeRange === 'month' ? 0.42 : timeRange === 'week' ? 0.14 : 0.03;

  const totalRevenue = Math.round(642818 * multiplier);
  const rawMaterialCOGS = Math.round(totalRevenue * 0.38); // 38% ingredient cost
  const grossProfit = totalRevenue - rawMaterialCOGS; // 62% gross profit
  const packagingAndDelivery = Math.round(totalRevenue * 0.12);
  const netProfit = grossProfit - packagingAndDelivery; // ~50% net profit
  const netProfitMargin = ((netProfit / (totalRevenue || 1)) * 100).toFixed(1);
  const totalOrdersCount = Math.round(511 * multiplier);
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 1258;

  const [inventory, setInventory] = useState([
    { name: 'Pure Homemade Churned Butter', quantity: 24.5, unit: 'kg', min: 10, status: 'In Stock' },
    { name: 'White Chocolate Blocks (Imported)', quantity: 18.0, unit: 'kg', min: 8, status: 'In Stock' },
    { name: 'Ever-Whipped Stabilized Cream', quantity: 35.0, unit: 'Liters', min: 12, status: 'In Stock' },
    { name: 'Belgian 70% Dark Cocoa', quantity: 14.0, unit: 'kg', min: 5, status: 'In Stock' },
    { name: 'Cardamom & Roshmalai Essence', quantity: 4.2, unit: 'Liters', min: 2, status: 'In Stock' },
    { name: '24K Edible Gold Leaf Sheets', quantity: 45, unit: 'sheets', min: 15, status: 'In Stock' },
  ]);

  useEffect(() => {
    productsApi.getAll().then((data) => setProducts(data)).catch(() => {});
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

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.status.toLowerCase() === orderStatusFilter.toLowerCase();
  });

  return (
    <div className="bg-brand-cream/30 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
                Rangpur Central Executive Portal
              </span>
              <span className="bg-green-100 text-green-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                ● Live Bakery Sync
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-brand-brown mt-0.5">
              Sweet Site Admin & Financial Analytics
            </h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-brand-brown/10 shadow-sm">
            {[
              { id: 'analytics', label: 'Profit & Best Sellers', icon: TrendingUp },
              { id: 'orders', label: 'Order History & Kitchen', icon: ShoppingBag },
              { id: 'products', label: 'Cake Catalog', icon: CakeIcon },
              { id: 'inventory', label: 'Raw Materials', icon: Package },
              { id: 'cms', label: 'Store CMS', icon: Settings },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t.id
                    ? 'bg-brand-brown text-white shadow-sm'
                    : 'text-brand-brown hover:bg-brand-cream'
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: PROFIT INTELLIGENCE & ALL-TIME BEST ORDER CAKES                    */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Filter Timeframe Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-3xl border border-brand-brown/10 shadow-sm gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-accent" />
                <span className="text-xs font-bold text-brand-brown">Analytics Timeframe:</span>
              </div>

              <div className="flex items-center gap-1.5 bg-brand-cream/60 p-1 rounded-2xl border border-brand-brown/10">
                {[
                  { id: 'all', label: 'All Time' },
                  { id: 'month', label: 'This Month' },
                  { id: 'week', label: 'Last 7 Days' },
                  { id: 'today', label: 'Today' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTimeRange(item.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      timeRange === item.id
                        ? 'bg-white text-brand-brown shadow-xs font-extrabold'
                        : 'text-brand-muted hover:text-brand-brown'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Financial KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Gross Revenue */}
              <div className="bg-white p-6 rounded-3xl border border-brand-brown/10 shadow-sm space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-brand-muted text-xs font-semibold">
                  <span>Gross Order Revenue</span>
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-3xl font-bold text-brand-brown">
                  {formatBDT(totalRevenue)}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-green-700 font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+24.8% vs previous period</span>
                </div>
              </div>

              {/* Net Profit */}
              <div className="bg-gradient-to-br from-brand-brown to-brand-brown-light text-white p-6 rounded-3xl shadow-md space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-white/80 text-xs font-semibold">
                  <span>Pure Net Profit ({netProfitMargin}%)</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-accent">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-3xl font-bold text-white">
                  {formatBDT(netProfit)}
                </p>
                <p className="text-[11px] text-white/80">
                  After ingredient COGS & delivery costs
                </p>
              </div>

              {/* Raw Material COGS */}
              <div className="bg-white p-6 rounded-3xl border border-brand-brown/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-brand-muted text-xs font-semibold">
                  <span>Ingredient COGS (38%)</span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-3xl font-bold text-amber-800">
                  {formatBDT(rawMaterialCOGS)}
                </p>
                <p className="text-[11px] text-brand-muted">
                  Butter, cocoa, dairy cream & boxes
                </p>
              </div>

              {/* Total Orders & AOV */}
              <div className="bg-white p-6 rounded-3xl border border-brand-brown/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-brand-muted text-xs font-semibold">
                  <span>Total Orders / Avg Value</span>
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif text-3xl font-bold text-brand-brown">
                  {totalOrdersCount} <span className="text-sm font-sans text-brand-muted font-normal">orders</span>
                </p>
                <p className="text-[11px] text-purple-700 font-semibold">
                  Avg Order: {formatBDT(avgOrderValue)}
                </p>
              </div>
            </div>

            {/* Profit Margin Breakdown Visual Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-brown">
                    Financial Structure & Margins
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Breakdown of every ৳100 received from Sweet Site cake orders.
                  </p>
                </div>
                <span className="text-xs font-extrabold bg-brand-accent/30 text-brand-brown px-3 py-1 rounded-full">
                  Net Profit Margin: 50.0%
                </span>
              </div>

              {/* Progress Distribution Bar */}
              <div className="space-y-2">
                <div className="h-6 w-full rounded-2xl overflow-hidden flex shadow-inner bg-brand-cream/50 p-0.5">
                  <div
                    style={{ width: '50%' }}
                    className="bg-green-600 h-full rounded-l-xl flex items-center justify-center text-[10px] text-white font-bold"
                    title="Net Profit: 50%"
                  >
                    Net Profit 50%
                  </div>
                  <div
                    style={{ width: '38%' }}
                    className="bg-amber-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                    title="Ingredient COGS: 38%"
                  >
                    Raw Materials 38%
                  </div>
                  <div
                    style={{ width: '12%' }}
                    className="bg-purple-500 h-full rounded-r-xl flex items-center justify-center text-[10px] text-white font-bold"
                    title="Packaging & Delivery: 12%"
                  >
                    Ops 12%
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-brand-muted pt-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />
                    <span><strong>Net Profit:</strong> {formatBDT(netProfit)} (50%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span><strong>Ingredient Cost (COGS):</strong> {formatBDT(rawMaterialCOGS)} (38%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                    <span><strong>Delivery & Packaging:</strong> {formatBDT(packagingAndDelivery)} (12%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* ALL-TIME BEST SELLING CAKES LEADERBOARD                                    */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h3 className="font-serif text-2xl font-bold text-brand-brown">
                      All-Time Best Selling Cakes Leaderboard
                    </h3>
                  </div>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Ranked by total quantity sold, revenue generated, and pure profit contribution.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-brand-muted">
                    Showing Top 6 Signature Flavours
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-brand-brown">
                  <thead className="bg-brand-cream/50 text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                    <tr>
                      <th className="p-3.5 rounded-l-2xl text-center w-16">Rank</th>
                      <th className="p-3.5">Flavour & Cake Name</th>
                      <th className="p-3.5 text-center">Total Sold</th>
                      <th className="p-3.5 text-right">Total Revenue</th>
                      <th className="p-3.5 text-right">Net Profit Earned</th>
                      <th className="p-3.5 text-center">Profit Margin</th>
                      <th className="p-3.5 rounded-r-2xl text-right">Market Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-brown/10">
                    {allTimeBestSellers.map((cake) => {
                      const shareOfTotal = ((cake.revenue / 642818) * 100).toFixed(1);
                      return (
                        <tr key={cake.rank} className="hover:bg-brand-cream/20 transition-colors">
                          
                          {/* Rank Medal */}
                          <td className="p-3.5 text-center">
                            {cake.rank === 1 ? (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-brand-brown font-extrabold shadow-sm">
                                🥇 1
                              </span>
                            ) : cake.rank === 2 ? (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-800 font-extrabold">
                                🥈 2
                              </span>
                            ) : cake.rank === 3 ? (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600/30 text-amber-900 font-extrabold">
                                🥉 3
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-cream text-brand-brown font-bold text-xs">
                                #{cake.rank}
                              </span>
                            )}
                          </td>

                          {/* Cake Name & Thumbnail */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={cake.image}
                                alt={cake.name}
                                className="w-12 h-12 rounded-xl object-cover border border-brand-brown/10 shadow-xs"
                              />
                              <div>
                                <p className="font-serif font-bold text-sm text-brand-brown flex items-center gap-2">
                                  {cake.name}
                                  {cake.rank === 1 && (
                                    <span className="bg-brand-accent text-brand-brown text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">
                                      #1 Crown
                                    </span>
                                  )}
                                </p>
                                <span className="text-[11px] text-brand-muted">
                                  {cake.category} • ★ {cake.rating} ({cake.reviews})
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Total Sold */}
                          <td className="p-3.5 text-center">
                            <span className="font-bold text-sm bg-brand-cream/60 px-2.5 py-1 rounded-xl text-brand-brown inline-block">
                              {Math.round(cake.totalSold * multiplier)} Lb
                            </span>
                            <p className="text-[10px] text-green-700 font-semibold mt-0.5">{cake.growth}</p>
                          </td>

                          {/* Total Revenue */}
                          <td className="p-3.5 text-right font-serif font-bold text-sm text-brand-brown">
                            {formatBDT(Math.round(cake.revenue * multiplier))}
                          </td>

                          {/* Profit Earned */}
                          <td className="p-3.5 text-right font-serif font-bold text-sm text-green-700">
                            {formatBDT(Math.round(cake.profit * multiplier))}
                          </td>

                          {/* Margin */}
                          <td className="p-3.5 text-center font-bold text-xs text-brand-brown">
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md font-bold">
                              {cake.margin}%
                            </span>
                          </td>

                          {/* Market Share Progress */}
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-20 bg-brand-cream h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-brand-brown h-full rounded-full"
                                  style={{ width: `${shareOfTotal}%` }}
                                />
                              </div>
                              <span className="text-[11px] font-bold text-brand-muted">
                                {shareOfTotal}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Geographical Revenue & Zone Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Delivery Zone Performance */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-brand-brown">
                    Rangpur Delivery Zones Share
                  </h3>
                  <Truck className="w-4 h-4 text-brand-accent" />
                </div>

                <div className="space-y-3">
                  {[
                    { zone: 'Dhap / Medical Mor', percent: 42, revenue: 270000 },
                    { zone: 'Jahaj Company Mor & City Center', percent: 28, revenue: 180000 },
                    { zone: 'RK Road / Carmichael Area', percent: 18, revenue: 115000 },
                    { zone: 'Modern Mor & Outside City', percent: 12, revenue: 77000 },
                  ].map((z, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-brand-brown">
                        <span>{z.zone}</span>
                        <span>{formatBDT(Math.round(z.revenue * multiplier))} ({z.percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-brand-cream rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-accent-hover rounded-full"
                          style={{ width: `${z.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Status Distribution */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-brand-brown">
                    Kitchen & Delivery Status Breakdown
                  </h3>
                  <PieChart className="w-4 h-4 text-purple-600" />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-green-50 rounded-2xl border border-green-200">
                    <p className="text-[11px] font-bold text-green-800 uppercase">Delivered Safely</p>
                    <p className="font-serif text-2xl font-bold text-green-900 mt-1">94.8%</p>
                    <p className="text-[10px] text-green-700">485 total orders</p>
                  </div>

                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
                    <p className="text-[11px] font-bold text-amber-800 uppercase">In Oven / Frosting</p>
                    <p className="font-serif text-2xl font-bold text-amber-900 mt-1">3.5%</p>
                    <p className="text-[10px] text-amber-700">Active in kitchen</p>
                  </div>

                  <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200">
                    <p className="text-[11px] font-bold text-purple-800 uppercase">Dispatched on Bike</p>
                    <p className="font-serif text-2xl font-bold text-purple-900 mt-1">1.2%</p>
                    <p className="text-[10px] text-purple-700">Real-time rider tracking</p>
                  </div>

                  <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200">
                    <p className="text-[11px] font-bold text-rose-800 uppercase">Cancellations</p>
                    <p className="font-serif text-2xl font-bold text-rose-900 mt-1">0.5%</p>
                    <p className="text-[10px] text-rose-700">Industry-low return rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LIVE ORDERS & ORDER HISTORY                                        */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-brown">
                  Order History & Real-Time Kitchen Dispatch
                </h3>
                <p className="text-xs text-brand-muted">
                  Advance baking stages, track item costs, and inspect customer details.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-muted" />
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="text-xs font-bold bg-brand-cream/60 border border-brand-brown/15 rounded-xl px-3 py-2 text-brand-brown focus:outline-none"
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="baking">Baking</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-brand-brown/10">
              {filteredOrders.map((ord) => (
                <div key={ord.id} className="py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-brand-brown">
                        {ord.order_number}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-cream text-brand-brown px-2 py-0.5 rounded-md">
                        {ord.zone}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-md">
                        Profit: +{formatBDT(ord.profit)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-brand-brown">
                      {ord.customer_name} • {ord.customer_phone}
                    </p>
                    <p className="text-xs text-brand-muted">{ord.items}</p>
                    <p className="text-[11px] text-brand-muted/70">
                      Received: {ord.created_at} • COGS: {formatBDT(ord.cogs)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                    <span className="font-serif font-bold text-lg text-brand-brown mr-2">
                      {formatBDT(ord.total)}
                    </span>

                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                      className="text-xs font-bold bg-brand-cream/60 border border-brand-brown/15 rounded-xl px-3 py-2 text-brand-brown focus:outline-none cursor-pointer"
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

        {/* ========================================================================= */}
        {/* TAB 3: PRODUCT CATALOG & PRICING                                          */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-brown">
                  Bakery Catalog & BDT Pricing Matrix
                </h3>
                <p className="text-xs text-brand-muted">
                  Update pound cake rates, modify descriptions, and inspect bestselling badges.
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

        {/* ========================================================================= */}
        {/* TAB 4: RAW MATERIALS & INGREDIENTS INVENTORY                              */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6 animate-fadeIn">
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

        {/* ========================================================================= */}
        {/* TAB 5: STORE CMS                                                          */}
        {/* ========================================================================= */}
        {activeTab === 'cms' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-brown/10 shadow-sm space-y-6 max-w-2xl animate-fadeIn">
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
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2.5-2 4 2 2.5-2 4 2 2-1 2-1" />
    <path d="M2 21h20" />
    <path d="M7 8v2" />
    <path d="M12 8v2" />
    <path d="M17 8v2" />
    <path d="M7 4h.01" />
    <path d="M12 4h.01" />
    <path d="M17 4h.01" />
  </svg>
);
