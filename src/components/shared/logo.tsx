import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  // Benzersiz ID kullanımı önemli (sayfada başka gradientlerle çakışmaması için)
  const gradientId = "weCAN-flow-gradient";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="WeCAN Marka Logosu"
    >
      <path
        d="M7 31.5C7 31.5 13 11 25 17C37 23 35 4 35 4"
        stroke={`url(#${gradientId})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="35" cy="4" r="3" fill="#FB923C" />

      <defs>
        <linearGradient
          id={gradientId}
          x1="7"
          y1="31.5"
          x2="35"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4F46E5" />
          <stop offset="0.8" stopColor="#FB923C" />
        </linearGradient>
      </defs>
    </svg>
  );
};
