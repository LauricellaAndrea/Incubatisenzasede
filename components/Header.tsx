import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Brand Text */}
          <div className="flex-shrink-0 flex items-center">
             <a href="/" className="text-geeks-blue font-black text-xl tracking-tight uppercase hover:text-blue-900 transition-colors">
               incubati senza sede
             </a>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
             <button className="p-2 text-gray-500 hover:text-geeks-blue bg-gray-100 rounded-lg transition-colors">
                <Search size={20} />
             </button>
             <button className="bg-geeks-red hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-0.5">
                Accedi
             </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-geeks-blue p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="mt-4 px-3">
               <button className="w-full bg-geeks-red text-white px-4 py-3 rounded-lg font-bold">
                Accedi
               </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};