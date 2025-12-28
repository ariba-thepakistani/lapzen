"use client";

import React, { useState } from "react";

const WarrantyTabs = () => {
  const [activeTab, setActiveTab] = useState<"warranty" | "returns" | "shipping">("warranty");

  const tabs = [
    { id: "warranty", label: "Warranty" },
    { id: "returns", label: "Returns" },
    { id: "shipping", label: "Shipping" },
  ] as const;

  return (
    <section className="bg-[#001226] py-20 px-6 font-sans antialiased">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <div className="text-[#cccccc] text-lg font-normal tracking-tight">
            Everything you need to know about our policies
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-[8px] text-[15px] font-semibold uppercase tracking-wide transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#001a33] text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10"
                  : "bg-[#000a14] text-[#cccccc] hover:text-white border border-transparent"
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-[900px] mx-auto">
          <div className="bg-[#001a33] p-8 md:p-12 rounded-[15px] shadow-2xl border border-white/5 min-h-[500px] transition-all duration-300">
            {activeTab === "warranty" && (
              <div role="tabpanel" className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-semibold text-white mb-6">Product Warranty</h3>
                <p className="text-[#cccccc] mb-8">
                  All our products come with a comprehensive warranty to ensure your peace of mind.
                </p>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">Coverage Period</h4>
                <ul className="mb-6 pl-5 space-y-2 list-disc marker:text-[#cccccc]">
                  <li className="text-[#cccccc]">Standard warranty: 1 year from date of purchase</li>
                  <li className="text-[#cccccc]">Extended warranty available for purchase</li>
                  <li className="text-[#cccccc]">Covers manufacturing defects and workmanship issues</li>
                </ul>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">What's Covered</h4>
                <ul className="mb-6 pl-5 space-y-2 list-disc marker:text-[#cccccc]">
                  <li className="text-[#cccccc]">Manufacturing defects</li>
                  <li className="text-[#cccccc]">Material defects</li>
                  <li className="text-[#cccccc]">Workmanship issues</li>
                </ul>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">What's Not Covered</h4>
                <ul className="mb-6 pl-5 space-y-2 list-disc marker:text-[#cccccc]">
                  <li className="text-[#cccccc]">Normal wear and tear</li>
                  <li className="text-[#cccccc]">Accidental damage</li>
                  <li className="text-[#cccccc]">Misuse or abuse</li>
                  <li className="text-[#cccccc]">Unauthorized repairs</li>
                </ul>

                <p className="text-[#cccccc] mt-10">
                  <strong className="text-white">To claim your warranty:</strong> Contact our customer service team with your order number and proof of purchase.
                </p>
              </div>
            )}

            {activeTab === "returns" && (
              <div role="tabpanel" className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-semibold text-white mb-6">Return Policy</h3>
                <p className="text-[#cccccc] mb-8">
                  We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
                </p>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">Return Window</h4>
                <ul className="mb-6 pl-5 space-y-2 list-disc marker:text-[#cccccc]">
                  <li className="text-[#cccccc]">30-day return period from delivery date</li>
                  <li className="text-[#cccccc]">Items must be unused and in original packaging</li>
                  <li className="text-[#cccccc]">All tags and labels must be attached</li>
                </ul>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">Return Process</h4>
                <ol className="mb-6 pl-5 space-y-3 list-decimal marker:text-[#cccccc]">
                  <li className="text-[#cccccc]">Contact our customer service team</li>
                  <li className="text-[#cccccc]">Receive your return authorization number</li>
                  <li className="text-[#cccccc]">Pack the item securely with all original materials</li>
                  <li className="text-[#cccccc]">Ship the item back using our prepaid label</li>
                </ol>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">Refund Timeline</h4>
                <p className="text-[#cccccc] mb-8">
                  Refunds are processed within 2-3 business days after we receive your return. The refund will be issued to your original payment method.
                </p>

                <p className="text-[#cccccc] mt-10">
                  <strong className="text-white">Note:</strong> Return shipping is free for defective items. Customer is responsible for return shipping costs for non-defective returns.
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div role="tabpanel" className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-semibold text-white mb-6">Shipping Information</h3>
                <p className="text-[#cccccc] mb-8">
                  We offer fast and reliable shipping to ensure your order arrives safely and on time.
                </p>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">Shipping Options</h4>
                <ul className="mb-6 pl-5 space-y-2 list-disc marker:text-[#cccccc]">
                  <li className="text-[#cccccc]">Standard Shipping: 5-7 business days</li>
                  <li className="text-[#cccccc]">Express Shipping: 2-3 business days</li>
                  <li className="text-[#cccccc]">Overnight Shipping: 1 business day</li>
                </ul>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">Shipping Costs</h4>
                <ul className="mb-6 pl-5 space-y-2 list-disc marker:text-[#cccccc]">
                  <li className="text-[#cccccc]">Free standard shipping on orders over $50</li>
                  <li className="text-[#cccccc]">Flat rate shipping available for all orders</li>
                  <li className="text-[#cccccc]">Express and overnight rates calculated at checkout</li>
                </ul>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">International Shipping</h4>
                <p className="text-[#cccccc] mb-8">
                  We ship to select international destinations. Delivery times and costs vary by location. Customs fees and import duties are the responsibility of the customer.
                </p>

                <h4 className="text-[18px] font-semibold text-white mt-8 mb-4">Order Tracking</h4>
                <p className="text-[#cccccc]">
                  You'll receive a tracking number via email once your order ships. Track your package anytime through our website or the carrier's tracking portal.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantyTabs;