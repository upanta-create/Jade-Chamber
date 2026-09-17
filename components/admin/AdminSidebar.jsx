'use client';

import { usePathname } from 'next/navigation';
import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon, Shield } from 'lucide-react';
import Link from 'next/link';

const AdminSidebar = () => {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
    { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
    { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon },
  ];

  return (
    <div className="inline-flex h-full flex-col gap-5 border-r border-slate-200 sm:min-w-60 bg-white">
      <div className="flex flex-col gap-2 justify-center items-center pt-8 px-4 max-sm:hidden">
        <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-xs">
          <Shield size={22} />
        </div>
        <p className="text-slate-900 font-bold text-sm">Platform Admin</p>
        <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
          Superuser Access
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

export default AdminSidebar;