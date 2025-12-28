import React from "react";
import Header from "@/components/sections/header";
import { Sidebar } from "@/components/admin-sidebar"; // I'll create this or use a simple nav here

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <div className="flex flex-1 container py-8 gap-8">
        <aside className="w-64 hidden md:block">
          <nav className="flex flex-col gap-2 sticky top-24">
            <a href="/admin" className="p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all font-medium text-navy">Dashboard</a>
            <a href="/admin/inventory" className="p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all font-medium text-navy">Inventory</a>
            <a href="/admin/orders" className="p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all font-medium text-navy">Sales Orders</a>
            <a href="/admin/users" className="p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all font-medium text-navy">Users</a>
          </nav>
        </aside>
        <main className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}
