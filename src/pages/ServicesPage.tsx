/**
 * @file ServicesPage.tsx
 * RoseDsigns Atelier Services Showcase
 * Styled in the existing signature warm ivory (#F7F3EC) aesthetic.
 * Renders ONLY the interactive Services Arc carousel.
 */

import React from 'react';
import { ServicesArc } from '../components/ServicesArc';

export const ServicesPage: React.FC = () => {
  return (
    <div className="bg-[#F7F3EC] min-h-screen text-[#171514] bg-grain pt-28 sm:pt-36 pb-16 flex flex-col justify-center">
      <ServicesArc />
    </div>
  );
};

export default ServicesPage;
