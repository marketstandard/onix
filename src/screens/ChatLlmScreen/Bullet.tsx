import React from 'react';

export default function Bullet({ className, viewBox = '0 0 32 32' }: React.SVGProps<SVGElement>) {
  return (
    <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g opacity="0.4" filter="url(#filter0_f_2001_206)">
        <rect x="9" y="9" width="14" height="14" rx="7" fill="#00FDC8" />
      </g>
      <g filter="url(#filter1_d_2001_206)">
        <rect x="12" y="12" width="8" height="8" rx="4" fill="url(#paint0_radial_2001_206)" />
        <rect x="12.5" y="12.5" width="7" height="7" rx="3.5" stroke="#131415" />
      </g>
      <defs>
        <filter
          id="filter0_f_2001_206"
          x="0"
          y="0"
          width="32"
          height="32"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="4.5" result="effect1_foregroundBlur_2001_206" />
        </filter>
        <filter
          id="filter1_d_2001_206"
          x="8"
          y="9"
          width="16"
          height="16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2001_206" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2001_206"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_2001_206"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(14.48 15.04) scale(5.52)"
        >
          <stop offset="0.31" stopColor="#00FDC8" />
          <stop offset="0.86" stopColor="#1A5A5E" />
        </radialGradient>
      </defs>
    </svg>
  );
}
