"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Package, ShoppingBag, Users as UsersIcon, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
      const { count: orderCount, data: orders } = await supabase.from('orders').select('total_amount', { count: 'exact' });
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

      const totalRevenue = orders?.reduce((acc, order) => acc + (Number(order.total_amount) || 0), 0) || 0;

      setStats({
        products: productCount || 0,
        orders: orderCount || 0,
        users: userCount || 0,
        revenue: totalRevenue,
      });
    }

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.products} icon={<Package className="w-6 h-6" />} color="bg-blue-50 text-blue-600" />
        <StatCard title="Total Orders" value={stats.orders} icon={<ShoppingBag className="w-6 h-6" />} color="bg-purple-50 text-purple-600" />
        <StatCard title="Total Users" value={stats.users} icon={<UsersIcon className="w-6 h-6" />} color="bg-green-50 text-green-600" />
        <StatCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={<TrendingUp className="w-6 h-6" />} color="bg-orange-50 text-orange-600" />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-navy mb-4">Quick Stats</h2>
        <div className="p-12 border-2 border-dashed border-slate-100 rounded-3xl flex items-center justify-center text-slate-400">
          More detailed analytics coming soon...
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: any; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-navy">{value}</p>
    </div>
  );
}
