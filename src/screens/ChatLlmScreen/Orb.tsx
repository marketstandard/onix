import React from 'react';

export default function Orb({ className, viewBox = '0 0 500 500' }: React.SVGProps<SVGElement>) {
  return (
    <svg className={className} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_2048_751)">
        <circle cx="250" cy="250" r="50" fill="#00FDC8" />
      </g>
      <defs>
        <filter
          id="filter0_f_2048_751"
          x="0"
          y="0"
          width="500"
          height="500"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_2048_751" />
        </filter>
      </defs>
    </svg>
  );
}
