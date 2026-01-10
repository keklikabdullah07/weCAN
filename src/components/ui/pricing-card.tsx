"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Veritabanından gelen veri tipini tanımlıyoruz
type PricingPackage = {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
};

export function PricingCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 hover:shadow-2xl ${
        pkg.isPopular
          ? "bg-indigo-900 text-white border-indigo-900 shadow-xl scale-105 z-10"
          : "bg-white text-gray-900 border-gray-100 hover:border-indigo-100"
      }`}
    >
      {pkg.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
          En Popüler
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-xl font-bold mb-2 ${pkg.isPopular ? "text-white" : "text-gray-900"}`}>
          {pkg.title}
        </h3>
        <p className={`text-sm ${pkg.isPopular ? "text-indigo-200" : "text-gray-500"}`}>
          {pkg.description}
        </p>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold">{pkg.price}₺</span>
        <span className={`text-sm ${pkg.isPopular ? "text-indigo-200" : "text-gray-500"}`}>
          {pkg.unit}
        </span>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <div className={`mt-0.5 rounded-full p-1 ${pkg.isPopular ? "bg-indigo-800 text-orange-400" : "bg-indigo-50 text-indigo-600"}`}>
              <Check size={14} strokeWidth={3} />
            </div>
            <span className={pkg.isPopular ? "text-indigo-100" : "text-gray-600"}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        className={`w-full h-12 rounded-xl font-bold transition-all ${
          pkg.isPopular
            ? "bg-white text-indigo-900 hover:bg-orange-400 hover:text-white"
            : "bg-indigo-50 text-indigo-900 hover:bg-indigo-600 hover:text-white"
        }`}
      >
        <Link href="#contact">{pkg.buttonText}</Link>
      </Button>
    </motion.div>
  );
}