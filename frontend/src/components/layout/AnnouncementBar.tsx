import React from 'react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-plum text-white text-xs sm:text-sm font-medium py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
      <span>Freshly baked with love in Rangpur ❤️</span>
      <span className="hidden sm:inline opacity-75">•</span>
      <Link to="/shop" className="underline hover:opacity-90 transition-opacity hidden sm:inline">
        Explore Today's Menu
      </Link>
    </div>
  );
};
