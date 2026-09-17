'use client';
import { usePathname } from 'next/navigation';
import { HomeIcon, LayoutListIcon, SquarePenIcon, SquarePlusIcon, Store } from 'lucide-react';
import Link from 'next/link';

const StoreSidebar = ({ storeInfo }) => {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: 'Dashboard', href: '/store', icon: HomeIcon },
    { name: 'Add Product', href: '/store/add-product', icon: SquarePlusIcon },
    { name: 'Manage Product', href: '/store/manage-product', icon: SquarePenIcon },
    { name: 'Orders', href: '/store/orders', icon: LayoutListIcon },
  ];

  return (
    <div className="inline-flex h-full flex-col gap-5 border-r border-slate-200 sm:min-w-60 bg-white">
      {/* Store Text Badge Header (No store image required) */}
      <div className="flex flex-col gap-2 justify-center items-center pt-8 px-4 max-sm:hidden">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
          <Store size={22} />
        </div>
        <p className="text-slate-900 font-bold text-center text-sm">{storeInfo?.name || 'Apex Electronics Hub'}</p>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Verified Vendor
        </span>
      </div>

      <div className="max-sm:mt-6">
        {sidebarLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`relative flex items-center gap-3 text-slate-600 hover:bg-slate-50 p-2.5 transition text-xs font-semibold ${
              pathname === link.href && 'bg-emerald-50 text-emerald-800'
            }`}
          >
            <link.icon size={18} className="sm:ml-5 text-slate-500" />
            <p className="max-sm:hidden">{link.name}</p>
            {pathname === link.href && (
              <span className="absolute bg-emerald-600 right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoreSidebar;